// This file configures the initialization of Sentry on the Edge Runtime.
// The config you add here will be used whenever middleware or an Edge route handles a request.
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
    
    // Debug mode - enable in development
    debug: process.env.NODE_ENV === 'development',
});

