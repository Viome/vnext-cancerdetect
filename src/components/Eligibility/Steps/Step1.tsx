'use client';

import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Field from '@/components/Form/Field';
import PhoneNumberInput from '@/components/Form/PhoneNumberInput';
import { SUPPORT_PAGE_URL } from '@/lib/utils/constants';
import { ageMajorityPerState, getCountries, getStates } from '@/lib/utils/eligibilityFlow';
import { calculateAge } from '@/lib/utils/helpers';

export default function Step1() {
    const methods = useFormContext();
    const { watch, setValue, trigger, setError, clearErrors, formState: { errors } } = methods;
    
    const [countries, setCountries] = useState<any[]>([]);
    const [states, setStates] = useState<any[]>([]);
    const [loadingCountries, setLoadingCountries] = useState(true);
    const [loadingStates, setLoadingStates] = useState(false);
    
    const watchCountry = watch('country');
    const watchState = watch('state');
    const watchZipCode = watch('zipCode');
    const watchDob = watch('dob');

    // Fetch countries on mount
    useEffect(() => {
        const fetchCountries = async () => {
            const result = await getCountries();
            if (!result.error && result.countries) {
                setCountries(result.countries);
            }
            setLoadingCountries(false);
        };
        fetchCountries();
    }, []);

    // Fetch states when country changes
    useEffect(() => {
        const fetchStates = async () => {
            if (watchCountry) {
                setLoadingStates(true);
                const result = await getStates(watchCountry);
                if (!result.error && result.states) {
                    // Filter out NY state for US
                    const filteredStates = watchCountry === 'US'
                        ? result.states.filter((state: any) => state.abbreviation !== 'NY')
                        : result.states;
                    setStates(filteredStates);
                }
                setLoadingStates(false);
            }
        };
        fetchStates();
    }, [watchCountry]);

    // Validate age when state changes
    useEffect(() => {
        if (watchState && watchDob && watchCountry) {
            const age = calculateAge(watchDob);
            const requiredAge = ageMajorityPerState(watchCountry, watchState);
            
            if (age < requiredAge) {
                setError('dob', {
                    type: 'manual',
                    message: `You must be at least ${requiredAge} years old in ${watchState}`,
                });
            } else {
                clearErrors('dob');
            }
        }
    }, [watchState, watchDob, watchCountry, setError, clearErrors]);

    // Validate ZIP code
    const validateZipCode = async (zipCode: string) => {
        if (!zipCode || !watchState || !watchCountry) return true;

        // Check if NY ZIP code
        const zipNum = parseInt(zipCode);
        if (watchCountry === 'US' && zipNum >= 10000 && zipNum <= 14925) {
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
                    type="select"
                    disabled={loadingCountries}
                    data={{
                        values: countries,
                        name: 'name',
                        option: 'abbreviation',
                    }}
                    validate={{
                        required: 'Country is required',
                    }}
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
                    disabled={!watchCountry || loadingStates}
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
                        validate: validateZipCode,
                    }}
                />

                <PhoneNumberInput
                    disabledCountryCode={false}
                    countries={countries.map((c: any) => ({
                        phoneCode: c.phoneCode,
                        name: c.name,
                    }))}
                />
            </div>
        </section>
    );
}

