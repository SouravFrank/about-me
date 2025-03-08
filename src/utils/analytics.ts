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
};

/**
 * Track a user event in Google Analytics
 * @param eventName The name of the event
 * @param eventParams Additional parameters to track
 */
export const trackEvent = (
    eventName: string,
    eventParams?: Record<string, any>
) => {
    try {
        if (!analytics) {
            console.warn('Analytics not initialized');
            return;
        }

        logEvent(analytics as Analytics, eventName, {
            timestamp: new Date().toISOString(),
            ...eventParams,
        });

        console.debug(`Analytics event tracked: ${eventName}`, eventParams);
    } catch (error) {
        console.error('Error tracking analytics event:', error);
    }
};