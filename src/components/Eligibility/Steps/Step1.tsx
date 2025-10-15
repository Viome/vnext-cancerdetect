'use client';

import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import Field from '@/components/Form/Field';
import PhoneNumberInput from '@/components/Form/PhoneNumberInput';
import { SUPPORT_PAGE_URL } from '@/lib/utils/constants';
import { ageMajorityPerState } from '@/lib/utils/eligibilityFlow';
import { calculateAge } from '@/lib/utils/helpers';
import allStates from '@/data/states';

export default function Step1() {
    const methods = useFormContext();
    const { watch, setValue, setError, clearErrors } = methods;
    
    const watchState = watch('state');
    const watchDob = watch('dob');

    // Filter out NY state and use local states data
    const states = useMemo(() => {
        return allStates.filter((state) => state.abbreviation !== 'NY');
    }, []);

    // Set country to United States on mount
    useEffect(() => {
        setValue('country', 'United States');
    }, [setValue]);

    // Validate age when state changes
    useEffect(() => {
        if (watchState && watchDob) {
            const age = calculateAge(watchDob);
            const requiredAge = ageMajorityPerState('US', watchState);
            
            if (age < requiredAge) {
                setError('dob', {
                    type: 'manual',
                    message: `You must be at least ${requiredAge} years old in ${watchState}`,
                });
            } else {
                clearErrors('dob');
            }
        }
    }, [watchState, watchDob, setError, clearErrors]);

    // Validate ZIP code
    const validateZipCode = async (zipCode: string) => {
        if (!zipCode || !watchState) return true;

        // Check if NY ZIP code
        const zipNum = parseInt(zipCode);
        if (zipNum >= 10000 && zipNum <= 14925) {
            return 'ZIP codes from New York (10000-14925) are not eligible';
        }

        try {
            const response = await fetch('/api/zip-validation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ zipCode, state: watchState }),
            });

            const result = await response.json();
            
            if (!result.valid) {
                return result.message || 'Invalid ZIP code for selected state';
            }
            
            return true;
        } catch (error) {
            return 'Unable to validate ZIP code';
        }
    };

    return (
        <section>
            <div className="sm:max-w-cd-content">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-4">Contact Information</h1>
                    <p className="text-gray-600">
                        Please provide your contact information.{' '}
                        <a
                            target="_blank"
                            title="Learn more"
                            href={SUPPORT_PAGE_URL.contactInformation}
                            className="underline text-blue-600 hover:text-blue-800"
                            rel="noreferrer"
                        >
                            Learn more here
                        </a>{' '}
                        if you have multiple test kits in the same household.
                    </p>
                </div>
            </div>

            <div className="sm:max-w-cd-form">
                <Field
                    name="country"
                    label="Country"
                    type="text"
                    readOnly={true}
                />

                <Field
                    name="streetAddress"
                    label="Street Address"
                    type="text"
                    autoComplete="address-line1"
                    validate={{
                        required: 'Street address is required',
                    }}
                />

                <Field
                    name="apartmentSuitNo"
                    label="Apartment/Suite No."
                    type="text"
                    autoComplete="address-line2"
                />

                <Field
                    name="state"
                    label="State"
                    type="select"
                    data={{
                        values: states,
                        name: 'name',
                        option: 'abbreviation',
                    }}
                    validate={{
                        required: 'State is required',
                    }}
                />

                <div className="mb-4">
                    <a
                        href={SUPPORT_PAGE_URL.contactInformation}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center text-sm text-gray-700 hover:text-blue-600"
                    >
                        Why can't I select my state or province?
                        <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-800 text-white text-xs">
                            ?
                        </span>
                    </a>
                </div>

                <Field
                    name="city"
                    label="City"
                    type="text"
                    autoComplete="address-level2"
                    validate={{
                        required: 'City is required',
                    }}
                />

                <Field
                    name="zipCode"
                    label="Zip/Postal Code"
                    type="text"
                    autoComplete="postal-code"
                    validate={{
                        required: 'ZIP code is required',
                        pattern: {
                            value: /^\d{5}(-\d{4})?$/,
                            message: 'Invalid ZIP code format',
                        },
                        validateZip: validateZipCode,
                    }}
                />

                <PhoneNumberInput
                    disabledCountryCode={true}
                    countries={[{ phoneCode: '1', name: 'United States' }]}
                />
            </div>
        </section>
    );
}

