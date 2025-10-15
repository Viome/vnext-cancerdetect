'use client';

import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import Field from '@/components/Form/Field';
import DobDatePicker from '@/components/Form/DobDatePicker';
import { SUPPORT_PAGE_URL } from '@/lib/utils/constants';

export default function Step0() {
    const methods = useFormContext();
    const { setFocus } = methods;

    useEffect(() => {
        setFocus('firstName');
    }, [setFocus]);

    return (
        <>
            <div className="sm:max-w-cd-content">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-4">Personal Information</h1>
                    <p className="text-gray-600">
                        Please enter the information of the person who will be taking the test.{' '}
                        <a
                            target="_blank"
                            title="Learn more"
                            href={SUPPORT_PAGE_URL.personalInformation}
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
                <Field name="firstName" label="First Name" type="text" />
                <Field name="lastName" label="Last Name" type="text" />
                <div className="mb-4">
                    <DobDatePicker />
                </div>
                <Field
                    name="gender"
                    label="Biological Sex"
                    type="radioGroup"
                    values={[
                        { value: 'female', text: 'Female' },
                        { value: 'male', text: 'Male' },
                        { value: 'other', text: 'Other' },
                    ]}
                />
            </div>
        </>
    );
}

