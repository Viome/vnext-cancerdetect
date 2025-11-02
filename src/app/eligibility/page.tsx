import { Metadata } from 'next';
import { Suspense } from 'react';
import EligibilityWrapper from '@/components/EligibilityWrapper';
import Spinner from '@/components/Spinner';
import { DEFAULT_OG_IMAGE } from '@/lib/utils/constants';

export const metadata: Metadata = {
    title: 'CD Eligibility',
    description: 'Complete your eligibility screening',
    openGraph: {
        title: 'CD Eligibility',
        description: 'Complete your eligibility screening',
        images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'CD Eligibility',
        description: 'Complete your eligibility screening',
        images: [DEFAULT_OG_IMAGE.url],
    },
};

export default function EligibilityPage() {
    return (
        <div className="flex min-h-[80vh] items-center justify-center bg-[#F5F5F5] py-8 px-4 md:px-0">
            <div className="w-full max-w-2xl">
                <Suspense fallback={
                    <div className="m-auto flex h-screen max-w-4xl flex-col items-center justify-center">
                        <Spinner />
                    </div>
                }>
                    <EligibilityWrapper />
                </Suspense>
            </div>
        </div>
    );
}

