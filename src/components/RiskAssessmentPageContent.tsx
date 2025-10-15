"use client";

import useDentist from '@/hooks/useDentist';
import usePracticeId from '@/hooks/usePracticeId';
import NextUIProviderWrapper from '@/components/NextUIProviderWrapper';
import RiskAssessmentWrapper from '@/components/RiskAssessmentWrapper';

export default function RiskAssessmentPageContent() {
    const dentistQuery = useDentist();
    const dentist = dentistQuery.data;
    const practiceId = usePracticeId();
    
    console.log('dentistQuery:', dentistQuery);
    console.log('dentist data:', dentist);
    console.log('practiceId:', practiceId);
    
    const message = dentist?.id
        ? `The primary objective of Dr. ${dentist.last_name}'s practice is to maintain your quality of life and to ensure your safety.`
        : practiceId
        ? 'The primary objective of our dental practice is to maintain your quality of life and to ensure your safety.'
        : 'As your dental healthcare provider, our primary objectives are to maintain your quality of life and to ensure your safety.';
    
    console.log('message:', message);

    return (
        <NextUIProviderWrapper>
            <RiskAssessmentWrapper>
                <h1
                    id="understanding-and-managing-your-personal-risk-factors-for-oral-and-throat-cancer"
                    className="px-10 pt-16 text-[2.5rem] font-light leading-none"
                >
                    Understanding and managing your personal risk factors
                    for oral and throat cancer
                </h1>

                <div className="px-10 py-16">
                    <p className="pb-12 text-[1.75rem] font-light">
                        {message}
                    </p>

                    <ul className="mb-4 ml-5 list-disc text-base text-gray-600">
                        <li>
                            <span className="font-bold">Prevalence:</span>{' '}
                            According to the American Cancer Society, the
                            prevalence of oral cancers is expected to
                            dramatically increase by nearly two-thirds by
                            2035.
                        </li>
                        <li>
                            <span className="font-bold">Risk factors:</span>{' '}
                            Even though age (over 50 years old), tobacco
                            use, alcohol consumption and HPV are major risk
                            factors{' '}
                            <a
                                href="https://www.cancer.org/cancer/types/oral-cavity-and-oropharyngeal-cancer/causes-risks-prevention/risk-factors.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                according to the American Cancer Society
                            </a>{' '}
                            and others, there has been increasing evidence
                            to suggest that some who did not experience
                            these considerations are also affected.
                        </li>
                        <li>
                            <span className="font-bold">
                                Questionnaire:
                            </span>{' '}
                            Based on these risk factors, and understanding
                            the importance of early screening, this website
                            is a first of its kind AI-driven questionnaire
                            (coupled with the best available epidemiological
                            data) to assess your personal risk level as
                            compared to the general population.
                        </li>
                        <li>
                            <span className="font-bold">
                                Recommendation:
                            </span>{' '}
                            From the risk level determined by this
                            questionnaire, we will determine if a more
                            precise molecular analysis with the CancerDetect
                            saliva test is recommended.
                        </li>
                        <li>
                            <span className="font-bold">Education:</span> In
                            addition, please note that the site also serves
                            as an excellent source for patient education,
                            which includes an{' '}
                            <span className="font-bold">AI chatbot</span> to
                            answer your personal questions.
                        </li>
                        <li>
                            <span className="font-bold">
                                Privacy & confidentiality:
                            </span>{' '}
                            No identifiable information about you is
                            collected in this screening assessment and your
                            dentist does not receive any compensation.
                        </li>
                    </ul>

                    <p className="text-base font-light text-gray-600">
                        We view this as a{' '}
                        <span className="font-bold">
                            major public healthcare initiative
                        </span>{' '}
                        and the current data suggests that a few minutes can
                        save your life!
                    </p>
                </div>

                <div className="break-after-page" />
            </RiskAssessmentWrapper>
        </NextUIProviderWrapper>
    );
}

