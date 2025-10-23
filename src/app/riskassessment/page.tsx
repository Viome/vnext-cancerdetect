import { Suspense } from 'react';
import RiskAssessmentPageContent from '@/components/RiskAssessmentPageContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Risk Assessment - CancerDetect',
    description: 'Take our comprehensive risk assessment to evaluate your cancer risk factors.',
};

export default function RiskAssessmentPage() {
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
            <RiskAssessmentPageContent />
        </Suspense>
    );
}

