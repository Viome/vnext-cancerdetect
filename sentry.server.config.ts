// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
    dsn:
        SENTRY_DSN ||
        'https://6c08072b8a694f868a6db973956cb17b@o345375.ingest.sentry.io/4504814722940929',
    
    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    
    // Environment
    environment: process.env.NODE_ENV || 'development',
    
    // Release tracking
    release: process.env.SENTRY_RELEASE,
    
    // Debug mode - enable in development to see Sentry logs
    debug: process.env.NODE_ENV === 'development',
    
    // Server-specific configuration
    ignoreErrors: [
        'ResizeObserver loop limit exceeded',
        'Non-Error promise rejection captured',
    ],
    
    // Before sending callback (can filter or modify events)
    beforeSend(event, hint) {
        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
            console.log('[Sentry Server] Captured event:', {
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
if (process.env.NODE_ENV === 'development') {
    console.log('[Sentry Server] Initialized:', {
        dsn: SENTRY_DSN ? '✓ Configured' : '✗ Using fallback',
        environment: process.env.NODE_ENV || 'development',
        debug: process.env.NODE_ENV === 'development',
    });
}

