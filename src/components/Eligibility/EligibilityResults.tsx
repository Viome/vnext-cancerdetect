'use client';

import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import CDButton from '@/components/CDButton';
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
                        Unfortunately, You Are Not Eligible
                    </h1>

                    <div className="mb-8 text-left bg-gray-50 p-6 rounded-lg">
                        <p className="text-gray-700 mb-4">
                            Based on the information you provided, you do not meet the eligibility
                            criteria for CancerDetect at this time.
                        </p>
                        <p className="text-gray-700 mb-4">
                            This may be due to one or more of the following reasons:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                            <li>Age requirements not met for your state</li>
                            <li>Residency in a non-eligible state</li>
                            <li>Other eligibility criteria</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <CDButton
                            variant="Standard"
                            theme="Dark"
                            width="full"
                            href={SUPPORT_PAGE_URL.notEligiblePage}
                            className="cursor-pointer"
                        >
                            Learn More About CancerDetect
                        </CDButton>
                        
                        <CDButton
                            type="button"
                            variant="Transparent"
                            theme="Light"
                            width="full"
                            onClick={handleGoHome}
                            className="cursor-pointer"
                        >
                            Return to Home
                        </CDButton>

                        <button
                            type="button"
                            onClick={handleStartOver}
                            className="block w-full text-gray-600 hover:text-gray-800 underline"
                        >
                            Start Over
                        </button>
                    </div>

                    <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                        <p className="text-sm text-yellow-800">
                            If you believe this is an error, please{' '}
                            <a
                                href="https://support.viome.com"
                                target="_blank"
                                rel="noreferrer"
                                className="underline font-medium"
                            >
                                contact our support team
                            </a>
                            .
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
                    Congratulations! You Are Eligible
                </h1>

                <div className="mb-8 text-left bg-green-50 p-6 rounded-lg">
                    {isDentistOrder ? (
                        <>
                            <p className="text-gray-700 mb-4">
                                Your eligibility has been confirmed! Your dentist will be notified
                                and your kit will be ready for use.
                            </p>
                            <p className="text-gray-700">
                                You will receive further instructions via email on how to proceed
                                with your test.
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="text-gray-700 mb-4">
                                You meet all the eligibility criteria for CancerDetect! You can now
                                proceed to complete your order.
                            </p>
                            <p className="text-gray-700">
                                Click the button below to continue to checkout and complete your
                                purchase.
                            </p>
                        </>
                    )}
                </div>

                <div className="space-y-4">
                    <CDButton
                        type="button"
                        variant="Standard"
                        theme="Dark"
                        width="full"
                        onClick={handleProceed}
                        className="cursor-pointer"
                    >
                        {isDentistOrder ? 'Complete Registration' : 'Proceed to Checkout'}
                    </CDButton>

                    <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
                        <p className="text-sm text-blue-800">
                            <strong>What's Next?</strong>
                            {isDentistOrder
                                ? ' Your dentist will receive your information and guide you through the next steps.'
                                : ' Complete your purchase and we will ship your CancerDetect kit to the address you provided.'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

