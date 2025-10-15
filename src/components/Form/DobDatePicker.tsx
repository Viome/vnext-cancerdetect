'use client';

import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

export default function DobDatePicker() {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const error = errors.dob;
    const hasError = !!error;

    return (
        <div className="mb-4">
            <label htmlFor="dob" className="mb-2 block text-sm font-medium text-gray-900">
                Date of Birth
            </label>
            <input
                id="dob"
                type="date"
                {...register('dob', {
                    required: 'Date of birth is required',
                    validate: {
                        validDate: (value) => {
                            if (!value) return 'Date of birth is required';
                            const date = new Date(value);
                            const now = new Date();
                            if (date > now) return 'Date cannot be in the future';
                            const age = now.getFullYear() - date.getFullYear();
                            if (age < 18) return 'You must be at least 18 years old';
                            if (age > 120) return 'Please enter a valid date of birth';
                            return true;
                        },
                    },
                })}
                className={classNames(
                    'block w-full rounded-lg border p-3 text-sm focus:border-blue-500 focus:ring-blue-500',
                    hasError ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white',
                )}
            />
            {hasError && (
                <p className="mt-2 text-sm text-red-600">{error?.message as string}</p>
            )}
        </div>
    );
}

