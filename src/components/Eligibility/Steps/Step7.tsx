'use client';

import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import Field from '@/components/Form/Field';

export default function Step7() {
    const methods = useFormContext();
    const { setFocus } = methods;

    useEffect(() => {
        setFocus('familyCancerYouAge');
    }, [setFocus]);

    return (
        <section>
            <div className="sm:max-w-cd-content">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-4">Personal and Family History</h1>
                    <p className="text-gray-600">
                        At what age were you diagnosed with that cancer?
                    </p>
                </div>
            </div>
            <div className="sm:max-w-cd-form">
                <Field
                    name="familyCancerYouAge"
                    type="text"
                    className="w-20"
                    autoComplete="off"
                    validate={{
                        required: 'Please enter an age',
                        pattern: {
                            value: /^(0|[1-9]\d*)(\.\d+)?$/,
                            message: 'Invalid age',
                        },
                        maxLength: {
                            value: 4,
                            message: 'Invalid age',
                        },
                        max: {
                            value: 120,
                            message: 'Invalid age',
                        },
                    }}
                />
            </div>
        </section>
    );
}

