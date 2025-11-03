'use client';

import Field from '@/components/Form/Field';

export default function Step6() {
    return (
        <section>
            <div className="sm:max-w-cd-content">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-4">Personal and Family History</h1>
                    <p className="text-gray-600">
                        Have you ever been diagnosed with an oral and/or throat cancer?
                    </p>
                </div>
            </div>
            <div className="sm:max-w-cd-form">
                <Field
                    name="familyCancerYou"
                    type="radioGroup"
                    values={[
                        { value: 'yes', text: 'Yes' },
                        { value: 'no', text: 'No' },
                        { value: 'not_sure', text: 'Not Sure' },
                    ]}
                    validate={{
                        required: 'Please select an option',
                    }}
                />
            </div>
        </section>
    );
}

