'use client';

import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { getCountries } from '@/lib/utils/eligibilityFlow';
import { getAnswerText, getPhoneNumberByCode, calculateAge } from '@/lib/utils/helpers';
import {
    genericAnwsers,
    medicalAnswers,
    tobaccoTypes,
    relationshipAnswers,
} from '@/app/api/data/eligibilityQuestions';

export default function StepConfirmDetails() {
    const { watch } = useFormContext();
    const [countries, setCountries] = useState<any[]>([]);
    
    const formData = watch();
    const {
        firstName,
        lastName,
        dob,
        gender,
        email,
        streetAddress,
        apartmentSuitNo,
        city,
        state,
        zipCode,
        country,
        phoneNumberCountryCode,
        phoneNumber,
        tobaccoCurrent,
        tobaccoPrevious,
        tobaccoTypes: selectedTobaccoTypes,
        tobaccoYears,
        tobaccoDay,
        hpv,
        reasonForTesting,
        ethnicity,
        familyCancerYouOrCloseFamilyMember,
        familyCancerYou,
        familyCancerYouAge,
        familyCancerYourFamily,
        familyMembers,
    } = formData;

    useEffect(() => {
        const fetchCountries = async () => {
            const result = await getCountries();
            if (!result.error && result.countries) {
                setCountries(result.countries);
            }
        };
        fetchCountries();
    }, []);

    const age = dob ? calculateAge(dob) : 0;
    const phoneCode = countries.length > 0 
        ? getPhoneNumberByCode(countries, phoneNumberCountryCode) 
        : '+1';

    // Format ethnicity
    const getEthnicityText = () => {
        if (!ethnicity || typeof ethnicity !== 'object') return 'Not specified';
        const selected = Object.keys(ethnicity)
            .filter(key => ethnicity[key])
            .map(key => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
        return selected.length > 0 ? selected.join(', ') : 'Not specified';
    };

    // Get selected family members with ages
    const getSelectedFamilyMembers = () => {
        if (!familyMembers || typeof familyMembers !== 'object') return [];
        
        return Object.keys(familyMembers)
            .filter(key => familyMembers[key]?.selected)
            .map(key => {
                const member = relationshipAnswers.find(r => r.value === key);
                return {
                    relationship: member?.text || key,
                    age: familyMembers[key]?.age || 'N/A',
                };
            });
    };

    const selectedFamilyMembers = getSelectedFamilyMembers();

    return (
        <section>
            <div className="sm:max-w-cd-content">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-4">Confirm Your Details</h1>
                    <p className="text-gray-600">
                        Please review your information below and confirm that everything is correct.
                    </p>
                </div>
            </div>

            <div className="sm:max-w-cd-form">
                {/* Personal Information */}
                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                    <div className="space-y-2 text-sm">
                        <div className="flex">
                            <span className="font-medium w-32">Name:</span>
                            <span className="text-gray-700">{firstName} {lastName}</span>
                        </div>
                        <div className="flex">
                            <span className="font-medium w-32">Date of Birth:</span>
                            <span className="text-gray-700">{dob} (Age: {age})</span>
                        </div>
                        <div className="flex">
                            <span className="font-medium w-32">Gender:</span>
                            <span className="text-gray-700 capitalize">{gender}</span>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                    <div className="space-y-2 text-sm">
                        <div className="flex">
                            <span className="font-medium w-32">Email:</span>
                            <span className="text-gray-700">{email}</span>
                        </div>
                        <div className="flex">
                            <span className="font-medium w-32">Phone:</span>
                            <span className="text-gray-700">{phoneCode} {phoneNumber}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium">Address:</span>
                            <span className="text-gray-700 mt-1">
                                {streetAddress}
                                {apartmentSuitNo && `, ${apartmentSuitNo}`}
                                <br />
                                {city}, {state} {zipCode}
                                <br />
                                {country}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Tobacco Use */}
                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Tobacco Use</h2>
                    <div className="space-y-2 text-sm">
                        <div className="flex">
                            <span className="font-medium w-48">Current tobacco use:</span>
                            <span className="text-gray-700 capitalize">{getAnswerText(genericAnwsers, tobaccoCurrent)}</span>
                        </div>
                        {tobaccoCurrent === 'no' && (
                            <div className="flex">
                                <span className="font-medium w-48">Previous tobacco use:</span>
                                <span className="text-gray-700 capitalize">{getAnswerText(genericAnwsers, tobaccoPrevious)}</span>
                            </div>
                        )}
                        {(tobaccoCurrent === 'yes' || tobaccoPrevious === 'yes') && (
                            <>
                                <div className="flex flex-col">
                                    <span className="font-medium">Types of tobacco:</span>
                                    <span className="text-gray-700 mt-1">
                                        {selectedTobaccoTypes?.split(',').map((type: string) => 
                                            getAnswerText(tobaccoTypes, type.trim())
                                        ).join(', ') || 'Not specified'}
                                    </span>
                                </div>
                                <div className="flex">
                                    <span className="font-medium w-48">Years of use:</span>
                                    <span className="text-gray-700">{tobaccoYears || 'Not specified'}</span>
                                </div>
                                <div className="flex">
                                    <span className="font-medium w-48">Daily consumption:</span>
                                    <span className="text-gray-700">{tobaccoDay || 'Not specified'}</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Health Information */}
                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Health Information</h2>
                    <div className="space-y-2 text-sm">
                        <div className="flex">
                            <span className="font-medium w-48">HPV Status:</span>
                            <span className="text-gray-700 capitalize">{getAnswerText(genericAnwsers, hpv)}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium">Reason for testing:</span>
                            <span className="text-gray-700 mt-1">
                                {getAnswerText(medicalAnswers, reasonForTesting)}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium">Ethnicity:</span>
                            <span className="text-gray-700 mt-1">{getEthnicityText()}</span>
                        </div>
                    </div>
                </div>

                {/* Family Cancer History */}
                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Family Cancer History</h2>
                    <div className="space-y-2 text-sm">
                        <div className="flex">
                            <span className="font-medium w-48">You or family cancer:</span>
                            <span className="text-gray-700 capitalize">
                                {getAnswerText(genericAnwsers, familyCancerYouOrCloseFamilyMember)}
                            </span>
                        </div>
                        {familyCancerYouOrCloseFamilyMember === 'yes' && (
                            <>
                                <div className="flex">
                                    <span className="font-medium w-48">You have cancer:</span>
                                    <span className="text-gray-700 capitalize">
                                        {getAnswerText(genericAnwsers, familyCancerYou)}
                                    </span>
                                </div>
                                {familyCancerYou === 'yes' && (
                                    <div className="flex">
                                        <span className="font-medium w-48">Age at diagnosis:</span>
                                        <span className="text-gray-700">{familyCancerYouAge}</span>
                                    </div>
                                )}
                                <div className="flex">
                                    <span className="font-medium w-48">Family has cancer:</span>
                                    <span className="text-gray-700 capitalize">
                                        {getAnswerText(genericAnwsers, familyCancerYourFamily)}
                                    </span>
                                </div>
                                {familyCancerYourFamily === 'yes' && selectedFamilyMembers.length > 0 && (
                                    <div className="flex flex-col">
                                        <span className="font-medium">Family members:</span>
                                        <div className="mt-2 space-y-1">
                                            {selectedFamilyMembers.map((member, index) => (
                                                <div key={index} className="text-gray-700 ml-4">
                                                    • {member.relationship} (Age at diagnosis: {member.age})
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                <div className="p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
                    <p className="text-sm text-blue-800">
                        <strong>Note:</strong> You can edit your information by clicking "Edit Information" below.
                        Your email address cannot be changed.
                    </p>
                </div>
            </div>
        </section>
    );
}

