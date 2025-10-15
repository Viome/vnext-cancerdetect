'use client';

import Field from '@/components/Form/Field';

export default function Step2Years() {
    return (
        <section>
            <div className="sm:max-w-cd-content">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-4">Tobacco Use</h1>
                    <p className="text-gray-600">How many years have you used this product?</p>
                </div>
            </div>
            <div className="sm:max-w-cd-form">
                <Field
                    name="tobaccoYears"
                    type="input"
                    validate={{
                        pattern: {
                            value: /^(0|[1-9]\d*)(\.\d+)?$/,
                            message: 'Invalid number',
                        },
                        maxLength: {
                            value: 4,
                            message: 'Invalid number',
                        },
                        max: {
                            value: 100,
                            message: 'Invalid number',
                        },
                    }}
                />
                <span className="text-sm text-gray-500">Please input numbers only</span>
            </div>
        </section>
    );
}

