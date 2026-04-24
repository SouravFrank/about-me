import { logEvent, Analytics, getAnalytics } from 'firebase/analytics';
import { app } from '../../firebase';

// Initialize analytics with a lazy getter to ensure it only runs in browser environment
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
            // Check if the error is due to blocked scripts
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
    CONTENT: 'content',
    EXTERNAL_LINK: 'external_link',
};

/**
 * Track a user event in Google Analytics
 * @param eventName The name of the event
 * @param eventParams Additional parameters to track
 */
export const trackEvent = (eventName: string, eventParams: Record<string, any>) => {
    try {
        // Add timestamp to all events
        const params = {
            ...eventParams,
            timestamp: new Date().toISOString(),
        };

        // Log to console in development
        if (import.meta.env.DEV) {
            console.log(`[Analytics] ${eventName}:`, params);
        }

        // Try Google Analytics (gtag)
        if (typeof window !== 'undefined' && (window as any).gtag) {
            try {
                (window as any).gtag('event', eventName, params);
            } catch (gtagError) {
                if (import.meta.env.DEV) {
                    console.warn('Google Analytics event failed:', gtagError);
                }
            }
        }

        // Try Firebase Analytics
        const analyticsInstance = getAnalyticsInstance();
        if (analyticsInstance) {
            try {
                logEvent(analyticsInstance, eventName, params);
            } catch (firebaseError) {
                if (import.meta.env.DEV) {
                    console.warn('Firebase Analytics event failed:', firebaseError);
                }
            }
        }
    } catch (error) {
        // Silently fail in production, log in development
        if (import.meta.env.DEV) {
            console.error('Error tracking event:', error);
        }
    }
};