import { logEvent, Analytics } from 'firebase/analytics';
import { analytics } from '../../firebase';

// Event categories
export const ANALYTICS_CATEGORIES = {
    NAVIGATION: 'navigation',
    INTERACTION: 'interaction',
    DOWNLOAD: 'download',
    CONTACT: 'contact',
    SOCIAL: 'social',
    PROJECTS: 'projects',
    TIMELINE: 'timeline',
    SKILLS: 'skills',
    CONTENT:'content',
    EXTERNAL_LINK:'external_link',
};

/**
 * Track a user event in Google Analytics
 * @param eventName The name of the event
 * @param eventParams Additional parameters to track
 */
export const trackEvent = (eventName: string, eventParams: Record<string, any>) => {
    // Add timestamp to all events
    const params = {
        ...eventParams,
        timestamp: new Date().toISOString(),
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
        console.log(`[Analytics] ${eventName}:`, params);
    }

    // Send to your analytics service
    try {
        // If you're using Google Analytics
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', eventName, params);
        }

        // If you're using Firebase Analytics
        if (analytics) {
            logEvent(analytics, eventName, params);
        }
    } catch (error) {
        console.error('Error tracking event:', error);
    }
};