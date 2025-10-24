'use client';

import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { SUPPORT_PAGE_URL, ELIGIBILITTY_GA_EVENTS, ELEGIBILITY_STEPS } from '@/lib/utils/constants';

interface EligibilityResultsProps {
    userIsElegible: boolean;
    redirectUrl: string;
    setFormStep: (step: number) => void;
}

export default function EligibilityResults({
    userIsElegible,
    redirectUrl,
    setFormStep,
}: EligibilityResultsProps) {
    const { watch } = useFormContext();
    const router = useRouter();
    const orderType = watch('orderType');

    useEffect(() => {
        // Track Google Analytics event
        if (typeof window !== 'undefined' && (window as any).gtag) {
            const event = userIsElegible
                ? ELIGIBILITTY_GA_EVENTS.RESULT_PRE_APPROVED
                : ELIGIBILITTY_GA_EVENTS.RESULT_NOT_ELIGIBLE;
            
            (window as any).gtag('event', event, {
                event_category: 'Eligibility',
                event_label: userIsElegible ? 'Eligible' : 'Not Eligible',
            });
        }
    }, [userIsElegible]);

    const handleProceed = () => {
        if (redirectUrl) {
            window.location.href = redirectUrl;
        }
    };

    const handleGoHome = () => {
        router.push('/');
    };

    const handleStartOver = () => {
        if (typeof window !== 'undefined') {
            sessionStorage.clear();
        }
        setFormStep(orderType === 'dentist_resell' 
            ? ELEGIBILITY_STEPS.DENTIST_INFO_STEP 
            : ELEGIBILITY_STEPS.PERSONAL_INFO_STEP
        );
    };

    if (!userIsElegible) {
        return (
            <div className="sm:max-w-cd-content">
                <div className="text-center p-8">
                    <div className="mb-6">
                        <svg
                            className="mx-auto h-16 w-16 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Sorry, you are not eligible
                    </h1>

                    <div className="mb-8 text-left bg-gray-50 p-6 rounded-lg">
                        <p className="text-gray-700 mb-4">
                            Based on the information you provided, you are not eligible to purchase the <strong>CancerDetect® Oral & Throat test</strong>. <a href="https://support.viome.com/en_us/cdot-about-BkVlgc59c" target="_blank" rel="noreferrer" className="underline">Learn more</a> about who can purchase the test.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <button
                            type="button"
                            onClick={handleGoHome}
                            className="block w-full bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 font-medium"
                        >
                            Back to home
                        </button>
                    </div>

                    <div className="mt-8">
                        <p className="text-sm text-gray-600">
                            <a
                                href="https://support.viome.com/en_us/cdot-about-BkVlgc59c"
                                target="_blank"
                                rel="noreferrer"
                                className="underline"
                            >
                                Contact Viome Customer Support
                            </a>{' '}
                            for more help.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Eligible Result
    const isDentistOrder = orderType === 'dentist_resell';

    return (
        <div className="sm:max-w-cd-content">
            <div className="text-center p-8">
                <div className="mb-6">
                    <svg
                        className="mx-auto h-16 w-16 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    You are eligible
                </h1>

                <div className="mb-8 text-left bg-green-50 p-6 rounded-lg">
                    <p className="text-gray-700 mb-4">
                        You are eligible to order the <strong>CancerDetect® Oral & Throat test!</strong> Your order is subject to approval by a healthcare provider from Viome's partner, Everly Health.
                    </p>
                </div>

                <div className="space-y-4">
                    <button
                        type="button"
                        onClick={handleProceed}
                        className="block w-full bg-black text-white px-6 py-3 rounded-lg font-medium text-lg"
                    >
                        {isDentistOrder ? 'Complete Registration' : 'Order the test now'}
                    </button>
                </div>
            </div>
        </div>
    );
}

