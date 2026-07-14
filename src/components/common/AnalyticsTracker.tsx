import React, { useEffect, useRef, useState } from 'react';
import {
  trackPage,
  trackSection,
  trackJourney,
  trackPerformance,
  trackError,
  trackEvent,
  getEngagementScore,
  getVisitorType
} from '../../utils/analytics';

// Define the steps of the visitor journey
const JOURNEY_STEPS = [
  { order: 0, key: 'landing', name: 'Landing' },
  { order: 1, key: 'hero', name: 'Hero Viewed' },
  { order: 2, key: 'about', name: 'About Viewed' },
  { order: 3, key: 'experience', name: 'Experience Viewed' },
  { order: 4, key: 'projects', name: 'Projects Viewed' },
  { order: 5, key: 'ai-products', name: 'AI Products Viewed' },
  { order: 6, key: 'articles', name: 'Articles Viewed' },
  { order: 7, key: 'contact', name: 'Contact Viewed' },
  { order: 8, key: 'resume', name: 'Resume Downloaded' },
];

export const AnalyticsTracker: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const sessionStartTime = useRef<number>(Date.now());
  const lastActivityTime = useRef<number>(Date.now());
  const activeSection = useRef<string>('intro'); // Start at intro/hero
  const sectionEnterTimes = useRef<Record<string, number>>({});
  const sectionActiveDurations = useRef<Record<string, { active: number; inactive: number }>>({});
  const firstViewTracked = useRef<Record<string, boolean>>({});

  // Scroll depth state
  const scrollThresholdsFired = useRef<Record<number, boolean>>({});

  // Track page views and initialize sessions on mount
  useEffect(() => {
    // 1. Initial Page Track
    trackPage();

    // 2. Initial Journey Step (Landing)
    updateJourneyStep(0, 'Landing', 'landing');

    // 3. Setup Session Start Time in storage if not already there
    if (!sessionStorage.getItem('portfolio_session_start_time')) {
      sessionStorage.setItem('portfolio_session_start_time', Date.now().toString());
    } else {
      sessionStartTime.current = parseInt(sessionStorage.getItem('portfolio_session_start_time')!, 10);
    }

    // 4. Setup Performance Tracking (Core Web Vitals)
    setupPerformanceTracking();

    // 5. Setup Global Error Tracking
    setupGlobalErrorTracking();

    // 6. Setup Activity Listeners
    const handleUserActivity = () => {
      lastActivityTime.current = Date.now();
    };

    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
    activityEvents.forEach((event) => {
      window.addEventListener(event, handleUserActivity, { passive: true });
    });

    // 7. Setup Active/Inactive Time Accumulator Interval
    const activeInterval = setInterval(() => {
      const now = Date.now();
      const isTabVisible = document.visibilityState === 'visible';
      const sec = activeSection.current;

      if (!sectionActiveDurations.current[sec]) {
        sectionActiveDurations.current[sec] = { active: 0, inactive: 0 };
      }

      // If active in the last 15 seconds and tab is active
      if (isTabVisible && now - lastActivityTime.current < 15000) {
        sectionActiveDurations.current[sec].active += 1;
      } else {
        sectionActiveDurations.current[sec].inactive += 1;
      }
    }, 1000);

    // 8. Setup Visibility Change (Session Summary Trigger)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // Send section exit for current section
        exitCurrentSection();
        // Send session summary
        sendSessionSummary();
      } else {
        // Resume entering current section
        sectionEnterTimes.current[activeSection.current] = Date.now();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 9. IntersectionObserver for Section Views
    const sectionsToObserve = [
      { id: 'about', name: 'intro' }, // Intro section handles Hero / About
      { id: 'timeline', name: 'timeline' },
      { id: 'skills', name: 'skills' },
      { id: 'projects', name: 'projects' },
      { id: 'articles', name: 'articles' },
      { id: 'ai-arsenal', name: 'ai-arsenal' },
      { id: 'ai-products', name: 'ai-products' },
      { id: 'rewards', name: 'rewards' },
      { id: 'contact', name: 'contact' },
      { id: 'cv', name: 'cv' }
    ];

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px', // Trigger when section occupies substantial viewport
      threshold: [0, 0.1, 0.25, 0.5]
    };

    // Track visible intersection ratios to find the largest visible section
    const visibleRatios: Record<string, number> = {};

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        visibleRatios[id] = entry.intersectionRatio;
      });

      // Find section with highest intersection ratio
      let maxId = activeSection.current;
      let maxRatio = 0;

      Object.entries(visibleRatios).forEach(([id, ratio]) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          maxId = id;
        }
      });

      // If the dominant section changed and has visibility
      if (maxId !== activeSection.current && maxRatio > 0.1) {
        switchSection(maxId);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sectionsToObserve.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    // 10. Scroll Depth Listener
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;

      // Track scroll depth in analytics session
      if (pct > 0) {
        const { trackSessionAction } = require('../../utils/analytics');
        trackSessionAction('scroll', pct);
      }

      // Check thresholds: 25%, 50%, 75%, 90%, 100%
      const thresholds = [25, 50, 75, 90, 100];
      thresholds.forEach((t) => {
        if (pct >= t && !scrollThresholdsFired.current[t]) {
          scrollThresholdsFired.current[t] = true;
          const timeToReach = Math.round((Date.now() - sessionStartTime.current) / 1000);
          
          trackEvent('scroll_depth', {
            scroll_percentage: t,
            time_to_reach: timeToReach,
            landing_page: window.location.pathname + window.location.hash
          });
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial check for current section enter time
    sectionEnterTimes.current[activeSection.current] = Date.now();

    // Clean up
    return () => {
      clearInterval(activeInterval);
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('scroll', handleScroll);
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
      // Try to send summary on unmount
      exitCurrentSection();
      sendSessionSummary();
    };
  }, []);

  // Monitor detailed intro open state in intro section
  useEffect(() => {
    const detailedCheckInterval = setInterval(() => {
      const sec = activeSection.current;
      if (sec === 'about') {
        const isDetailedOpen = document.getElementById('detailed-intro') !== null;
        const currentSubName = isDetailedOpen ? 'About' : 'Hero';
        
        // If we transition within intro section between Hero and About
        const lastTrackedName = sessionStorage.getItem('portfolio_current_sub_section');
        if (currentSubName !== lastTrackedName) {
          sessionStorage.setItem('portfolio_current_sub_section', currentSubName);
          
          // Trigger section views
          trackSubSectionChange(currentSubName);
        }
      }
    }, 500);

    return () => clearInterval(detailedCheckInterval);
  }, []);

  // Exit current section helper
  const exitCurrentSection = () => {
    const sec = activeSection.current;
    const enterTime = sectionEnterTimes.current[sec] || Date.now();
    const duration = Math.round((Date.now() - enterTime) / 1000);

    const accumulated = sectionActiveDurations.current[sec] || { active: 0, inactive: 0 };
    
    // Fire section exit
    trackSection(sec, 'exit', {
      visible_duration: duration,
      active_time: accumulated.active,
      inactive_time: accumulated.inactive
    });

    // Fire section engagement
    if (accumulated.active > 0 || accumulated.inactive > 0) {
      trackEvent('section_engagement', {
        section_name: sec,
        engagement_seconds: accumulated.active + accumulated.inactive,
        active_time: accumulated.active,
        inactive_time: accumulated.inactive
      });
    }

    // Reset accumulated times for this section
    sectionActiveDurations.current[sec] = { active: 0, inactive: 0 };
  };

  // Section Switch Handler
  const switchSection = (newSecId: string) => {
    // 1. Exit current
    exitCurrentSection();

    // 2. Set new section as active
    activeSection.current = newSecId;
    sectionEnterTimes.current[newSecId] = Date.now();
    if (!sectionActiveDurations.current[newSecId]) {
      sectionActiveDurations.current[newSecId] = { active: 0, inactive: 0 };
    }

    // 3. Enter new section
    trackSection(newSecId, 'enter');

    // 4. Track unique section view exactly once per session
    if (!firstViewTracked.current[newSecId]) {
      firstViewTracked.current[newSecId] = true;
      
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      trackEvent('section_view_first', {
        section_name: newSecId,
        scroll_position: scrollTop,
        viewport_height: window.innerHeight,
        first_time: true
      });
    }

    // 5. Update Visitor Journey
    handleSectionJourneyMapping(newSecId);
  };

  // Sub-section (Hero vs About) tracking inside Intro section
  const trackSubSectionChange = (subSectionName: string) => {
    const secNameLower = subSectionName.toLowerCase();
    
    // Track enter event
    trackSection(secNameLower, 'enter');

    if (!firstViewTracked.current[secNameLower]) {
      firstViewTracked.current[secNameLower] = true;
      trackEvent('section_view_first', {
        section_name: subSectionName,
        scroll_position: window.pageYOffset,
        viewport_height: window.innerHeight,
        first_time: true
      });
    }

    // Map journey steps
    if (secNameLower === 'hero') {
      updateJourneyStep(1, 'Hero Viewed', 'hero');
    } else if (secNameLower === 'about') {
      updateJourneyStep(2, 'About Viewed', 'about');
    }
  };

  // Map Section ID to Journey step
  const handleSectionJourneyMapping = (secId: string) => {
    if (secId === 'about') {
      const isDetailed = document.getElementById('detailed-intro') !== null;
      if (isDetailed) {
        updateJourneyStep(2, 'About Viewed', 'about');
      } else {
        updateJourneyStep(1, 'Hero Viewed', 'hero');
      }
    } else if (secId === 'timeline') {
      updateJourneyStep(3, 'Experience Viewed', 'timeline');
    } else if (secId === 'projects') {
      updateJourneyStep(4, 'Projects Viewed', 'projects');
    } else if (secId === 'ai-products') {
      updateJourneyStep(5, 'AI Products Viewed', 'ai-products');
    } else if (secId === 'articles') {
      updateJourneyStep(6, 'Articles Viewed', 'articles');
    } else if (secId === 'contact') {
      updateJourneyStep(7, 'Contact Viewed', 'contact');
    }
  };

  // Journey advancement check
  const updateJourneyStep = (stepOrder: number, stepName: string, sectionName: string) => {
    try {
      const highestStepStr = sessionStorage.getItem('portfolio_highest_journey_step');
      const currentHighest = highestStepStr ? parseInt(highestStepStr, 10) : -1;

      if (stepOrder > currentHighest) {
        sessionStorage.setItem('portfolio_highest_journey_step', stepOrder.toString());
        
        const timeToReach = Math.round((Date.now() - sessionStartTime.current) / 1000);
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;

        trackJourney(stepName, sectionName, stepOrder, timeToReach, scrollPercent);
      }
    } catch (e) { /* ignore */ }
  };

  // Session Summary Sender
  const sendSessionSummary = () => {
    try {
      const sessionSent = sessionStorage.getItem('portfolio_session_summary_sent');
      if (sessionSent) return; // Fire once per session tab life

      const duration = Math.round((Date.now() - sessionStartTime.current) / 1000);
      const score = getEngagementScore();
      
      // Load session store data
      const storedStr = sessionStorage.getItem('portfolio_session_store');
      const store = storedStr ? JSON.parse(storedStr) : {
        visited_sections: [],
        articles_clicked: [],
        products_opened: [],
        contact_methods: [],
        resume_downloaded: false,
        deepest_scroll: 0
      };

      trackEvent('session_summary', {
        session_duration: duration,
        pages: 1,
        sections_viewed: store.visited_sections.length,
        deepest_scroll: store.deepest_scroll,
        resume_downloaded: store.resume_downloaded,
        products_opened: store.products_opened.length,
        articles_clicked: store.articles_clicked.length,
        contact_clicked: store.contact_methods.length,
        engagement_score: score,
        visitor_segment: getVisitorType(score)
      });

      sessionStorage.setItem('portfolio_session_summary_sent', 'true');
    } catch (e) { /* ignore */ }
  };

  // Performance Vitals Listener
  const setupPerformanceTracking = () => {
    if (typeof window === 'undefined') return;

    // Page Load Time
    window.addEventListener('load', () => {
      setTimeout(() => {
        try {
          const [navigationEntry] = performance.getEntriesByType('navigation') as any[];
          if (navigationEntry) {
            const pageLoad = Math.round(navigationEntry.duration);
            const ttfb = Math.round(navigationEntry.responseStart - navigationEntry.requestStart);
            const domContentLoaded = Math.round(navigationEntry.domContentLoadedEventEnd);

            trackPerformance('page_load', pageLoad);
            trackPerformance('TTFB', ttfb);
            trackPerformance('dom_content_loaded', domContentLoaded);
          }
        } catch (e) { /* ignore */ }
      }, 0);
    });

    // Core Web Vitals using PerformanceObserver
    try {
      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            trackPerformance('first_contentful_paint', Math.round(entry.startTime));
          }
        });
      });
      fcpObserver.observe({ type: 'paint', buffered: true });

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          trackPerformance('largest_contentful_paint', Math.round(entry.startTime));
        });
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      // Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            trackPerformance('CLS', clsValue);
          }
        });
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });

      // Interaction to Next Paint
      const inpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          trackPerformance('interaction_to_next_paint', Math.round(entry.duration));
        });
      });
      inpObserver.observe({ type: 'event', buffered: true, durationThreshold: 16 });

      // Image Load Times
      const resourceObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries() as PerformanceResourceTiming[];
        entries.forEach((entry) => {
          if (entry.initiatorType === 'img') {
            trackPerformance('image_load_time', Math.round(entry.duration), {
              resource_url: entry.name.split('/').pop() || 'unknown'
            });
          } else if (entry.initiatorType === 'script') {
            trackPerformance('bundle_download', Math.round(entry.duration), {
              resource_url: entry.name.split('/').pop() || 'unknown'
            });
          }
        });
      });
      resourceObserver.observe({ type: 'resource', buffered: true });

    } catch (e) {
      if (import.meta.env.DEV) {
        console.warn('[Analytics] PerformanceObservers not fully supported in this browser:', e);
      }
    }
  };

  // Global Error Listeners
  const setupGlobalErrorTracking = () => {
    if (typeof window === 'undefined') return;

    const handleGlobalError = (event: ErrorEvent) => {
      trackError(
        'Unhandled JavaScript Error',
        event.message,
        event.error?.stack || 'none',
        'window',
        'runtime_execution'
      );
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const message = reason instanceof Error ? reason.message : String(reason);
      const stack = reason instanceof Error ? reason.stack : undefined;
      trackError(
        'Unhandled Promise Rejection',
        message,
        stack,
        'window',
        'async_execution'
      );
    };

    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
  };

  return <>{children}</>;
};

export default AnalyticsTracker;
