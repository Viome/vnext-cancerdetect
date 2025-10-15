import { Suspense } from 'react';
import RiskAssessmentPageContent from '@/components/RiskAssessmentPageContent';

export default function RiskAssessmentPage() {
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
            <RiskAssessmentPageContent />
        </Suspense>
    );
}

