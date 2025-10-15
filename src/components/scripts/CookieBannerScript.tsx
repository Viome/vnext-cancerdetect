'use client';

import Script from 'next/script';

export function CookieBannerScript() {
    const src = `https://global.ketchcdn.com/web/v2/config/viome/`;

    return (
        <Script
            id="cookie-banner"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
                __html: `!function(){window.semaphore=window.semaphore||[],window.ketch=function(){window.semaphore.push(arguments)};var e=new URLSearchParams(document.location.search),o=e.has("property")?e.get("property"):"website_smart_tag",n=document.createElement("script");n.type="text/javascript", n.src="${src}".concat(o,"/boot.js"), n.defer=n.async=!0,document.getElementsByTagName("head")[0].appendChild(n)}();`,
            }}
        />
    );
}

