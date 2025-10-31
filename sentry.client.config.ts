// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
    dsn:
        SENTRY_DSN,
    
    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    
    // Environment
    environment: process.env.NODE_ENV || 'development',
    
    // Release tracking (set via SENTRY_RELEASE env var or auto-detected)
    release: process.env.SENTRY_RELEASE,
    
    // Debug mode - enable in development to see Sentry logs
    debug: process.env.NODE_ENV === 'development',
    
    // Ignore certain errors
    ignoreErrors: [
        'ResizeObserver loop limit exceeded',
        'Non-Error promise rejection captured',
    ],
    
    // Before sending callback (can filter or modify events)
    beforeSend(event, hint) {
        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
            console.log('[Sentry Client] Captured event:', {
                message: event.message,
                exception: event.exception,
                tags: event.tags,
                level: event.level,
            });
        }
        return event;
    },
});

// Log initialization
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('[Sentry Client] Initialized:', {
        dsn: SENTRY_DSN ? '✓ Configured' : '✗ Using fallback',
        environment: process.env.NODE_ENV || 'development',
        debug: process.env.NODE_ENV === 'development',
    });
}

