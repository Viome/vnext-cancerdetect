'use client';

import Field from '@/components/Form/Field';

export default function Step8() {
    return (
        <section>
            <div className="sm:max-w-cd-content">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-4">Personal and Family History</h1>
                    <p className="text-gray-600">
                        Do you have a close family member (such as a parent, sibling, child, aunt
                        or uncle, grandparent) who has ever been diagnosed with an oral and/or
                        throat cancer?
                    </p>
                </div>
            </div>
            <div className="sm:max-w-cd-form">
                <Field
                    name="familyCancerYourFamily"
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

