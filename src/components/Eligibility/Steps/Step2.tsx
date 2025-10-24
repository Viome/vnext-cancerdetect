'use client';

import Field from '@/components/Form/Field';

export default function Step2() {
    return (
        <section>
            <div className="sm:max-w-cd-content">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-4">Current Tobacco Use</h1>
                    <p className="mb-5 text-gray-600">
                        Have you been currently doing any of the following four or more times per
                        week for at least six months:
                    </p>
                    <p className="text-gray-600">
                        Smoking, vaping, sucking, chewing, or snuffing tobacco products like the
                        following: cigarettes, cigars, pipe tobacco, bidis, hookah, e-cigarettes,
                        or smokeless tobacco products like chewing tobacco, dip, dissolvables,
                        snuff, and snus?
                    </p>
                </div>
            </div>
            <div className="sm:max-w-cd-form">
                <Field
                    name="tobaccoCurrent"
                    type="radioGroup"
                    values={[
                        { value: 'yes', text: 'Yes' },
                        { value: 'no', text: 'No' },
                    ]}
                    validate={{
                        required: 'Please select an option',
                    }}
                />
            </div>
        </section>
    );
}

