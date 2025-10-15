'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { GOOGLE_TAG_MANAGER_CONTAINER } from '@/lib/utils/constants';

const handleLoggedUserEvent = async () => {
    if (typeof window === 'undefined') return;

    // TODO: Implement getUserData utility when available
    // const userData = await getUserData();

    // if (!userData || userData.error) return;

    if (!window?.dataLayer) {
        window.dataLayer = [];
    }

    // window.dataLayer.push({
    //     user: userData,
    //     event: 'logged_user',
    // });
};

export function GtmScript() {
    useEffect(() => {
        handleLoggedUserEvent();
    }, []);

    return (
        <Script
            id="google-tag-manager"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GOOGLE_TAG_MANAGER_CONTAINER}');
            `,
            }}
        />
    );
}

