'use client';

import Script from 'next/script';

export function KlaviyoScript() {
    return (
        <Script
            id="klaviyo-script"
            src="https://static.klaviyo.com/onsite/js/klaviyo.js"
            strategy="afterInteractive"
        />
    );
}

