import { Metadata } from 'next';
import { Suspense } from 'react';
import EligibilityWrapper from '@/components/EligibilityWrapper';
import Spinner from '@/components/Spinner';

export const metadata: Metadata = {
    title: 'CD Eligibility',
    description: 'Complete your eligibility screening',
};

export default function EligibilityPage() {
    return (
        <div className="flex min-h-[80vh] items-center justify-center bg-[#F5F5F5] py-8">
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

