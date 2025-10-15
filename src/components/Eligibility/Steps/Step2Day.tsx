'use client';

import Field from '@/components/Form/Field';

export default function Step2Day() {
    return (
        <section>
            <div className="sm:max-w-cd-content">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-4">Previous Tobacco Use</h1>
                    <p className="text-gray-600">
                        How much of this product do you consume per day?
                    </p>
                </div>
            </div>
            <div className="sm:max-w-cd-form">
                <Field name="tobaccoDay" type="textarea" />
                <span className="text-sm text-gray-500">e.g. one cigarette per day.</span>
            </div>
        </section>
    );
}

