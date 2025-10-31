import { Suspense } from 'react';
import RiskAssessmentPageContent from '@/components/RiskAssessmentPageContent';
import type { Metadata } from 'next';
import { DEFAULT_OG_IMAGE } from '@/lib/utils/constants';

export const metadata: Metadata = {
    title: 'Risk Assessment - CancerDetect',
    description: 'Take our comprehensive risk assessment to evaluate your cancer risk factors.',
    openGraph: {
        title: 'Risk Assessment - CancerDetect',
        description: 'Take our comprehensive risk assessment to evaluate your cancer risk factors.',
        images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Risk Assessment - CancerDetect',
        description: 'Take our comprehensive risk assessment to evaluate your cancer risk factors.',
        images: [DEFAULT_OG_IMAGE.url],
    },
};

export default function RiskAssessmentPage() {
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
            <RiskAssessmentPageContent />
        </Suspense>
    );
}

