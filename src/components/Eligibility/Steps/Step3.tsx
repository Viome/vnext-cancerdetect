'use client';

import Field from '@/components/Form/Field';
import { medicalAnswers } from '@/app/api/data/eligibilityQuestions';

export default function Step3() {
    return (
        <section>
            <div className="sm:max-w-cd-content">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-4">Purchasing Reason</h1>
                    <p className="text-gray-600">
                        What is your primary reason for ordering this test?
                    </p>
                </div>
            </div>
            <div className="sm:max-w-cd-form">
                <Field
                    name="reasonForTesting"
                    type="radioGroup"
                    values={medicalAnswers}
                />
            </div>
        </section>
    );
}

