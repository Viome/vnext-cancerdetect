'use client';

import Field from '@/components/Form/Field';
import { tobaccoTypes } from '@/app/api/data/eligibilityQuestions';

export default function Step2Types() {
    return (
        <section>
            <div className="sm:max-w-cd-content">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-4">Tobacco Use</h1>
                    <p className="text-gray-600">
                        What type of tobacco product have you used four or more times per week for
                        at least six months?
                    </p>
                </div>
            </div>
            <div className="sm:max-w-cd-form">
                <Field name="tobaccoTypes" type="checkboxGroup" values={tobaccoTypes} />
            </div>
        </section>
    );
}

