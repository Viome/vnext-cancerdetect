import { Suspense } from 'react';
import RiskAssessmentPageContentShort from '@/components/RiskAssessmentPageContentShort';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Risk Assessment - CancerDetect',
    description: 'Take our comprehensive risk assessment to evaluate your cancer risk factors.',
};

export default function RiskAssessmentShortPage() {
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
            <RiskAssessmentPageContentShort />
        </Suspense>
    );
}
