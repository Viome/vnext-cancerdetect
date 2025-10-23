"use client";

import useDentist from '@/hooks/useDentist';
import usePracticeId from '@/hooks/usePracticeId';
import NextUIProviderWrapper from '@/components/NextUIProviderWrapper';
import RiskAssessmentWrapper from '@/components/RiskAssessmentWrapper';

export default function RiskAssessmentPageContentShort() {
    const dentistQuery = useDentist();
    const dentist = dentistQuery.data;
    const practiceId = usePracticeId();

    const message = dentist?.id
        ? `The primary objective of Dr. ${dentist.last_name}'s practice is to maintain your quality of life and to ensure your safety.`
        : practiceId
        ? 'The primary objective of our dental practice is to maintain your quality of life and to ensure your safety.'
        : 'As your dental healthcare provider, our primary objectives are to maintain your quality of life and to ensure your safety.';

    return (
        <NextUIProviderWrapper>
            <RiskAssessmentWrapper>
                <h1
                    id="understanding-and-managing-your-personal-risk-factors-for-oral-and-throat-cancer"
                    className="px-10 pt-16 text-[2.5rem] font-light leading-none"
                >
                    Know your risk for oral and throat cancer
                </h1>

                <div className="px-10 py-8">
                    <p className="text-base font-light text-gray-600">
                    Oral and throat cancer cases are on the rise. By knowing your individual risk level you may decide to take a more precise molecular analysis for early detection, which is key to both survival and minimizing the effects of the disease.
                    </p>
                </div>

                <div className="break-after-page" />
            </RiskAssessmentWrapper>
        </NextUIProviderWrapper>
    );
}
