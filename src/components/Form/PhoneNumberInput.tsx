'use client';

import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

interface PhoneNumberInputProps {
    disabledCountryCode?: boolean;
    countries: Array<{ phoneCode: string; name: string }>;
}

export default function PhoneNumberInput({
    disabledCountryCode = false,
    countries,
}: PhoneNumberInputProps) {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const countryCodeError = errors.phoneNumberCountryCode;
    const phoneError = errors.phoneNumber;

    return (
        <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-900">
                Phone Number
            </label>
            <div className="flex gap-2">
                <select
                    disabled={disabledCountryCode}
                    {...register('phoneNumberCountryCode', {
                        required: 'Country code is required',
                    })}
                    className={classNames(
                        'block w-32 rounded-lg border p-3 text-sm focus:border-blue-500 focus:ring-blue-500',
                        countryCodeError
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-300 bg-white',
                    )}
                >
                    {countries.map((country) => (
                        <option key={country.phoneCode} value={country.phoneCode}>
                            {country.phoneCode}
                        </option>
                    ))}
                </select>
                <input
                    type="tel"
                    placeholder="Phone number"
                    {...register('phoneNumber', {
                        required: 'Phone number is required',
                        pattern: {
                            value: /^[0-9]{10,15}$/,
                            message: 'Please enter a valid phone number',
                        },
                    })}
                    className={classNames(
                        'block flex-1 rounded-lg border p-3 text-sm focus:border-blue-500 focus:ring-blue-500',
                        phoneError
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-300 bg-white',
                    )}
                />
            </div>
            {(countryCodeError || phoneError) && (
                <p className="mt-2 text-sm text-red-600">
                    {(countryCodeError?.message || phoneError?.message) as string}
                </p>
            )}
        </div>
    );
}

