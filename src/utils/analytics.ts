import { logEvent, Analytics, getAnalytics, setUserProperties } from 'firebase/analytics';
import { app } from '../../firebase';

// Lazy getter to ensure it only runs in browser environment
let analyticsInstance: Analytics | null = null;
let analyticsInitialized = false;
let analyticsBlocked = false;

const getAnalyticsInstance = (): Analytics | null => {
    if (typeof window === 'undefined') return null;
    if (analyticsBlocked) return null;

    if (!analyticsInitialized) {
        analyticsInitialized = true;
        try {
            analyticsInstance = getAnalytics(app);
            console.log('Firebase Analytics initialized successfully');
        } catch (error) {
            if (error instanceof Error && (error.message.includes('analytics') || error.message.includes('blocked'))) {
                analyticsBlocked = true;
                console.warn('Analytics appears to be blocked by browser/extension:', error.message);
            } else {
                console.error('Failed to initialize Firebase Analytics:', error);
            }
            return null;
        }
    }
    return analyticsInstance;
};

// Event categories for backwards compatibility
export const ANALYTICS_CATEGORIES = {
    NAVIGATION: 'navigation',
    INTERACTION: 'interaction',
    DOWNLOAD: 'download',
    CONTACT: 'contact',
    SOCIAL: 'social',
    PROJECTS: 'projects',
    TIMELINE: 'timeline',
    SKILLS: 'skills',
    CONTENT: 'content',
    EXTERNAL_LINK: 'external_link',
};

// Device Intelligence Helper
const getDeviceIntelligence = () => {
    if (typeof window === 'undefined') return {};

    const ua = navigator.userAgent;
    const width = window.screen.width;
    const height = window.screen.height;

    // Detect browser
    let browser = 'unknown';
    if (ua.indexOf('Firefox') > -1) browser = 'Firefox';
    else if (ua.indexOf('SamsungBrowser') > -1) browser = 'Samsung Browser';
    else if (ua.indexOf('Opera') > -1 || ua.indexOf('OPR') > -1) browser = 'Opera';
    else if (ua.indexOf('Trident') > -1) browser = 'Internet Explorer';
    else if (ua.indexOf('Edge') > -1 || ua.indexOf('Edg') > -1) browser = 'Edge';
    else if (ua.indexOf('Chrome') > -1) browser = 'Chrome';
    else if (ua.indexOf('Safari') > -1) browser = 'Safari';

    // Detect OS
    let os = 'unknown';
    if (ua.indexOf('Windows') > -1) os = 'Windows';
    else if (ua.indexOf('Macintosh') > -1 || ua.indexOf('Mac OS') > -1) os = 'macOS';
    else if (ua.indexOf('Android') > -1) os = 'Android';
    else if (ua.indexOf('like Mac') > -1) os = 'iOS';
    else if (ua.indexOf('Linux') > -1) os = 'Linux';

    // Detect Device Type
    let deviceType = 'desktop';
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
        deviceType = 'mobile';
        if (/iPad|tablet/i.test(ua)) {
            deviceType = 'tablet';
        }
    }

    // Touch device detection
    const touchDevice = navigator.maxTouchPoints > 0 || 'ontouchstart' in window;

    // Connection speed
    const conn = (navigator as unknown as { connection?: { effectiveType?: string; downlink?: number } }).connection;
    const networkSpeed = conn ? conn.effectiveType || `${conn.downlink}Mbps` : 'unknown';

    return {
        device_type: deviceType,
        browser,
        os,
        screen_resolution: `${width}x${height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
        network_speed: networkSpeed,
        touch_device: touchDevice,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
};

// Traffic Intelligence Helper
const getTrafficIntelligence = () => {
    if (typeof window === 'undefined') return {};

    // Retrieve from sessionStorage if already stored
    try {
        const storedTraffic = sessionStorage.getItem('portfolio_session_traffic');
        if (storedTraffic) {
            return JSON.parse(storedTraffic) as Record<string, string>;
        }
    } catch { /* ignore */ }

    const urlParams = new URLSearchParams(window.location.search);
    const traffic = {
        utm_source: urlParams.get('utm_source') || 'organic',
        utm_medium: urlParams.get('utm_medium') || 'direct',
        utm_campaign: urlParams.get('utm_campaign') || 'none',
        utm_content: urlParams.get('utm_content') || 'none',
        referrer: document.referrer || 'direct',
        landing_page: window.location.pathname + window.location.hash,
    };

    try {
        sessionStorage.setItem('portfolio_session_traffic', JSON.stringify(traffic));
    } catch { /* ignore */ }

    return traffic;
};

// Geo IP Loader (fetches country and city asynchronously)
let geoDataPromise: Promise<{ country: string; city: string }> | null = null;
const fetchGeoData = (): Promise<{ country: string; city: string }> => {
    if (geoDataPromise) return geoDataPromise;

    if (typeof window === 'undefined') {
        return Promise.resolve({ country: 'unknown', city: 'unknown' });
    }

    // Check session storage
    try {
        const cached = sessionStorage.getItem('portfolio_session_geo');
        if (cached) {
            return Promise.resolve(JSON.parse(cached) as { country: string; city: string });
        }
    } catch { /* ignore */ }

    geoDataPromise = fetch('https://ipapi.co/json/')
        .then((res) => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json() as Promise<{ country_name?: string; country?: string; city?: string }>;
        })
        .then((data) => {
            const geo = {
                country: data.country_name || data.country || 'unknown',
                city: data.city || 'unknown',
            };
            try {
                sessionStorage.setItem('portfolio_session_geo', JSON.stringify(geo));
            } catch { /* ignore */ }
            return geo;
        })
        .catch(() => {
            return { country: 'unknown', city: 'unknown' };
        });

    return geoDataPromise;
};

// Session State Management
const getSessionId = (): string => {
    if (typeof window === 'undefined') return 'server';

    try {
        let sid = sessionStorage.getItem('portfolio_session_id');
        if (!sid) {
            sid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            sessionStorage.setItem('portfolio_session_id', sid);
        }
        return sid;
    } catch {
        return 'fallback-session';
    }
};

const getFirstVisitState = () => {
    if (typeof window === 'undefined') return { first_visit: false, returning_user: false };

    try {
        const visitedBefore = localStorage.getItem('portfolio_visited_before');
        if (!visitedBefore) {
            localStorage.setItem('portfolio_visited_before', 'true');
            return { first_visit: true, returning_user: false };
        }
        return { first_visit: false, returning_user: true };
    } catch {
        return { first_visit: false, returning_user: false };
    }
};

// Get Session Store Helper for specific tracking fields
interface SessionTrackingStore {
    visited_sections: string[];
    articles_clicked: string[];
    products_opened: string[];
    contact_methods: string[];
    resume_downloaded: boolean;
    deepest_scroll: number;
    recruiter_alert_fired: boolean;
}

const getSessionStore = (): SessionTrackingStore => {
    const defaultStore: SessionTrackingStore = {
        visited_sections: [],
        articles_clicked: [],
        products_opened: [],
        contact_methods: [],
        resume_downloaded: false,
        deepest_scroll: 0,
        recruiter_alert_fired: false,
    };

    if (typeof window === 'undefined') return defaultStore;

    try {
        const stored = sessionStorage.getItem('portfolio_session_store');
        if (stored) {
            return JSON.parse(stored) as SessionTrackingStore;
        }
    } catch { /* ignore */ }

    return defaultStore;
};

const saveSessionStore = (store: SessionTrackingStore) => {
    if (typeof window === 'undefined') return;
    try {
        sessionStorage.setItem('portfolio_session_store', JSON.stringify(store));
    } catch { /* ignore */ }
};

// Engagement score management
export const getEngagementScore = (): number => {
    if (typeof window === 'undefined') return 0;
    try {
        const scoreStr = sessionStorage.getItem('portfolio_engagement_score');
        return scoreStr ? parseInt(scoreStr, 10) : 0;
    } catch {
        return 0;
    }
};

export const incrementEngagementScore = (amount: number): number => {
    if (typeof window === 'undefined') return 0;
    try {
        const current = getEngagementScore();
        const next = current + amount;
        sessionStorage.setItem('portfolio_engagement_score', next.toString());
        updateUserProperties();
        return next;
    } catch {
        return 0;
    }
};

// Map engagement score to visitor type
export const getVisitorType = (score: number): 'Cold Visitor' | 'Interested' | 'Recruiter' | 'Highly Interested' => {
    const store = getSessionStore();
    // If they trigger the recruiter intent, classify them as Recruiter
    const isLikelyRecruiter = 
        store.visited_sections.includes('timeline') && 
        store.visited_sections.includes('projects') && 
        store.resume_downloaded && 
        (store.visited_sections.includes('contact') || store.contact_methods.length > 0);

    if (isLikelyRecruiter) {
        return 'Recruiter';
    }

    if (score < 30) return 'Cold Visitor';
    if (score < 80) return 'Interested';
    if (score < 150) return 'Recruiter'; // High activity recruiter
    return 'Highly Interested';
};

// Check for Recruiter Intent Detection
const checkRecruiterIntent = (store: SessionTrackingStore) => {
    const hasExperience = store.visited_sections.includes('timeline');
    const hasProjects = store.visited_sections.includes('projects');
    const hasResume = store.resume_downloaded;
    const hasContact = store.visited_sections.includes('contact');
    const hasLinkedIn = store.contact_methods.includes('linkedin');

    if (hasExperience && hasProjects && hasResume && hasContact && hasLinkedIn && !store.recruiter_alert_fired) {
        store.recruiter_alert_fired = true;
        saveSessionStore(store);
        
        trackEvent('recruiter_intent_detected', {
            visitor_intent_score: 5,
            experience_viewed: true,
            projects_viewed: true,
            resume_downloaded: true,
            contact_viewed: true,
            linkedin_clicked: true,
        });

        updateUserProperties();
    }
};

// Update session tracking lists
export const trackSessionAction = (type: 'section' | 'article' | 'product' | 'contact' | 'resume' | 'scroll', value: string | number | boolean) => {
    const store = getSessionStore();
    let changed = false;

    if (type === 'section') {
        const val = String(value);
        if (!store.visited_sections.includes(val)) {
            store.visited_sections.push(val);
            changed = true;

            if (val === 'intro' || val === 'about') incrementEngagementScore(5);
            else if (val === 'projects') incrementEngagementScore(10);
        }
    } else if (type === 'article') {
        const val = String(value);
        if (!store.articles_clicked.includes(val)) {
            store.articles_clicked.push(val);
            changed = true;
            incrementEngagementScore(15);
        }
    } else if (type === 'product') {
        const val = String(value);
        if (!store.products_opened.includes(val)) {
            store.products_opened.push(val);
            changed = true;
            incrementEngagementScore(30);
        }
    } else if (type === 'contact') {
        const val = String(value);
        if (!store.contact_methods.includes(val)) {
            store.contact_methods.push(val);
            changed = true;
            if (val === 'email') incrementEngagementScore(100);
            else incrementEngagementScore(20);
        }
    } else if (type === 'resume') {
        if (!store.resume_downloaded) {
            store.resume_downloaded = true;
            changed = true;
            incrementEngagementScore(50);
        }
    } else if (type === 'scroll') {
        const val = Number(value);
        if (val > store.deepest_scroll) {
            store.deepest_scroll = val;
            changed = true;
        }
    }

    if (changed) {
        saveSessionStore(store);
        checkRecruiterIntent(store);
        updateUserProperties();
    }
};

// Update user properties in Firebase Analytics
export const updateUserProperties = async () => {
    const analyticsInst = getAnalyticsInstance();
    if (!analyticsInst) return;

    try {
        const score = getEngagementScore();
        const visitorType = getVisitorType(score);
        const deviceInt = getDeviceIntelligence();
        const trafficInt = getTrafficIntelligence() as Record<string, string>;
        const firstVisitState = getFirstVisitState();
        const geo = await fetchGeoData();

        const properties = {
            visitor_type: visitorType,
            engagement_score: score.toString(),
            device: deviceInt.device_type || 'unknown',
            theme: deviceInt.theme || 'light',
            traffic_source: trafficInt.utm_source || 'organic',
            country: geo.country,
            city: geo.city,
            language: deviceInt.language || 'unknown',
            first_visit: firstVisitState.first_visit.toString(),
            returning_user: firstVisitState.returning_user.toString(),
        };

        setUserProperties(analyticsInst, properties);
    } catch {
        // ignore
    }
};

/**
 * Core event tracking function.
 * Enriches events with Device, Traffic, A/B Testing, Session metadata.
 */
export const trackEvent = async (eventName: string, eventParams: Record<string, unknown> = {}) => {
    try {
        const deviceInt = getDeviceIntelligence();
        const trafficInt = getTrafficIntelligence();
        const sessionId = getSessionId();
        const score = getEngagementScore();
        
        // Enrich params
        const enrichedParams = {
            ...eventParams,
            ...deviceInt,
            ...trafficInt,
            session_id: sessionId,
            engagement_score_value: score,
            visitor_segment: getVisitorType(score),
            timestamp: new Date().toISOString(),
            // A/B Testing ready placeholders
            experiment_name: (eventParams.experiment_name as string) || 'none',
            variant: (eventParams.variant as string) || 'control',
            feature_flag: (eventParams.feature_flag as string) || 'none',
        };

        // Dev logs
        if (import.meta.env.DEV) {
            console.log(`%c[Analytics Event] ${eventName}`, 'color:#a855f7; font-weight:bold; font-size:12px;', enrichedParams);
        }

        const isLocalhost = typeof window !== 'undefined' && 
            (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

        // Suppress external network hits on localhost
        if (isLocalhost) {
            return;
        }

        // Send to gtag directly
        const windowWithGtag = window as unknown as { gtag?: (type: string, name: string, params: Record<string, unknown>) => void };
        if (typeof window !== 'undefined' && windowWithGtag.gtag) {
            try {
                windowWithGtag.gtag('event', eventName, enrichedParams);
            } catch { /* ignore */ }
        }

        // Send to Firebase Analytics
        const analyticsInst = getAnalyticsInstance();
        if (analyticsInst) {
            logEvent(analyticsInst, eventName, enrichedParams);
        }
    } catch {
        // ignore
    }
};

/* ======================================================
   Structured SDK Event Families (Architecture Suggestion)
   ====================================================== */

export const trackPage = () => {
    trackEvent('page_view_custom', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname,
    });
    updateUserProperties();
};

export const trackSection = (sectionName: string, state: 'enter' | 'exit', extraParams: Record<string, unknown> = {}) => {
    trackSessionAction('section', sectionName);
    trackEvent('section_view', {
        section_name: sectionName,
        transition_state: state,
        scroll_position: typeof window !== 'undefined' ? window.pageYOffset : 0,
        viewport_height: typeof window !== 'undefined' ? window.innerHeight : 0,
        ...extraParams,
    });
};

export const trackCTA = (ctaName: string, action: string, section?: string, extraParams: Record<string, unknown> = {}) => {
    trackEvent('cta_click', {
        cta_label: ctaName,
        cta_action: action,
        section: section || 'unknown',
        ...extraParams,
    });
};

export const trackJourney = (step: string, sectionName: string, sectionOrder: number, timeToReachSection: number, scrollPercentage: number) => {
    trackEvent('visitor_journey', {
        journey_step: step,
        section_name: sectionName,
        section_order: sectionOrder,
        time_to_reach_section: timeToReachSection,
        scroll_percentage: scrollPercentage,
    });
};

export const trackConversion = (type: string, details: Record<string, unknown> = {}) => {
    if (type === 'resume_download') {
        trackSessionAction('resume', true);
    }
    trackEvent('conversion', {
        conversion_type: type,
        ...details,
    });
};

export const trackPerformance = (metricName: string, value: number, extraParams: Record<string, unknown> = {}) => {
    trackEvent('performance_metric', {
        metric_name: metricName,
        metric_value: value,
        ...extraParams,
    });
};

export const trackError = (errorType: string, message: string, stack?: string, component?: string, action?: string) => {
    trackEvent('error_logged', {
        error_type: errorType,
        error_message: message,
        stack_trace: stack || 'none',
        component: component || 'global',
        user_action: action || 'unknown',
    });
};

export const trackSession = (eventName: string, params: Record<string, unknown> = {}) => {
    trackEvent(eventName, params);
};

export const trackAIProduct = (productName: string, step: string, extraParams: Record<string, unknown> = {}) => {
    if (step === 'modal_open') {
        trackSessionAction('product', productName);
    }
    trackEvent('ai_product_funnel', {
        product_name: productName,
        funnel_step: step,
        ...extraParams,
    });
};

export const trackArticle = (articleTitle: string, step: string, extraParams: Record<string, unknown> = {}) => {
    if (step === 'clicked' || step === 'reading_started') {
        trackSessionAction('article', articleTitle);
    }
    trackEvent('article_funnel', {
        article_title: articleTitle,
        funnel_step: step,
        ...extraParams,
    });
};

// Hook up geo loading on SDK initialization
if (typeof window !== 'undefined') {
    fetchGeoData();
}