'use client';

import Script from 'next/script';

export function ForethoughtScript() {
    return (
        <Script
            id="forethought-widget"
            src="https://solve-widget.forethought.ai/embed.js"
            type="application/javascript"
            data-api-key="08bba966-6817-4f0b-ae0f-91f53f9a8272"
            data-ft-workflow-tag="general"
            strategy="afterInteractive"
        />
    );
}

