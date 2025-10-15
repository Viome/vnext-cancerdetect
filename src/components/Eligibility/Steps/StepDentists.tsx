'use client';

import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Field from '@/components/Form/Field';
import useDentists from '@/hooks/useDentists';

export default function StepDentists() {
    const { register, watch, setValue } = useFormContext();
    const { dentists, loading, error } = useDentists();
    const kitId = watch('kitId');

    return (
        <section>
            <div className="sm:max-w-cd-content">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-4">Dentist Information</h1>
                    <p className="text-gray-600">
                        Please enter your kit ID and select your dentist.
                    </p>
                </div>
            </div>

            <div className="sm:max-w-cd-form">
                <Field
                    name="kitId"
                    label="Kit ID"
                    type="masked-input-kit-id"
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    validate={{
                        required: 'Kit ID is required',
                        pattern: {
                            value: /^\d{4}-\d{4}-\d{4}-\d{4}$/,
                            message: 'Kit ID must be in format XXXX-XXXX-XXXX-XXXX',
                        },
                    }}
                />

                {kitId && (
                    <Field
                        name="dentistId"
                        label="Select Your Dentist"
                        type="select"
                        disabled={loading}
                        data={{
                            values: dentists || [],
                            name: 'name',
                            option: 'id',
                        }}
                        validate={{
                            required: 'Please select your dentist',
                        }}
                    />
                )}

                {error && (
                    <p className="text-red-600 text-sm mt-2">
                        Unable to load dentists. Please try again.
                    </p>
                )}
            </div>
        </section>
    );
}

