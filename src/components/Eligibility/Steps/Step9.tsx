'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Field from '@/components/Form/Field';
import BackButton from '@/components/Form/BackButton';
import { relationshipAnswers } from '@/app/api/data/eligibilityQuestions';

interface Step9Props {
    handleBackStep: () => void;
    formStep: number;
    completeFormStep: () => void;
}

export default function Step9({ handleBackStep, formStep, completeFormStep }: Step9Props) {
    const { watch, register, formState: { errors } } = useFormContext();
    const [internalStep, setInternalStep] = useState(0); // 0 = select members, 1 = enter ages

    const familyMembers = watch('familyMembers') || {};

    // Get selected family members (those that have been checked)
    const getSelectedMembers = () => {
        return relationshipAnswers.filter((member) => {
            return familyMembers[member.value]?.selected === true;
        });
    };

    const handleNext = () => {
        const selectedMembers = getSelectedMembers();
        if (internalStep === 0 && selectedMembers.length > 0) {
            setInternalStep(1);
        } else if (internalStep === 1) {
            // Validate all ages are filled
            const allAgesValid = selectedMembers.every((member) => {
                const age = familyMembers[member.value]?.age;
                return age && parseInt(age) > 0;
            });
            
            if (allAgesValid) {
                completeFormStep();
            }
        }
    };

    const handleBack = () => {
        if (internalStep === 1) {
            setInternalStep(0);
        } else {
            handleBackStep();
        }
    };

    const selectedMembers = getSelectedMembers();
    const canProceed = internalStep === 0
        ? selectedMembers.length > 0
        : selectedMembers.every((member) => {
            const age = familyMembers[member.value]?.age;
            return age && parseInt(age) > 0;
        });

    return (
        <section>
            <BackButton formStep={formStep} handleBackStep={handleBack} />

            {internalStep === 0 ? (
                <>
                    <div className="sm:max-w-cd-content">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold mb-4">
                                Family Members with Cancer
                            </h1>
                            <p className="text-gray-600">
                                Select all family members who have been diagnosed with cancer:
                            </p>
                        </div>
                    </div>

                    <div className="sm:max-w-cd-form">
                        <div className="mb-4">
                            <div className="space-y-3">
                                {relationshipAnswers.map((member) => (
                                    <div key={member.value} className="flex items-center">
                                        <input
                                            id={`member-${member.value}`}
                                            type="checkbox"
                                            {...register(`familyMembers.${member.value}.selected`)}
                                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                        />
                                        <label
                                            htmlFor={`member-${member.value}`}
                                            className="ml-3 block text-sm font-medium text-gray-700 capitalize"
                                        >
                                            {member.text}
                                        </label>
                                        <input
                                            type="hidden"
                                            value={member.value}
                                            {...register(`familyMembers.${member.value}.relationship`)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="sm:max-w-cd-content">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold mb-4">
                                Family Members' Ages at Diagnosis
                            </h1>
                            <p className="text-gray-600">
                                Please enter the age at which each family member was diagnosed with cancer:
                            </p>
                        </div>
                    </div>

                    <div className="sm:max-w-cd-form">
                        {selectedMembers.map((member) => (
                            <div key={member.value} className="mb-4">
                                <label
                                    htmlFor={`age-${member.value}`}
                                    className="mb-2 block text-sm font-medium text-gray-900 capitalize"
                                >
                                    {member.text} - Age at Diagnosis
                                </label>
                                <input
                                    id={`age-${member.value}`}
                                    type="number"
                                    min="1"
                                    max="120"
                                    placeholder="Age"
                                    {...register(`familyMembers.${member.value}.age`, {
                                        required: 'Age is required',
                                        min: { value: 1, message: 'Age must be at least 1' },
                                        max: { value: 120, message: 'Age must be less than 120' },
                                    })}
                                    className="block w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                                {errors?.familyMembers?.[member.value]?.age && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.familyMembers[member.value].age?.message as string}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}

            <div className="sm:max-w-cd-form">
                <div className="mt-8">
                    <button
                        type="button"
                        onClick={handleNext}
                        disabled={!canProceed}
                        className="w-full bg-black text-white px-6 py-3 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {internalStep === 0 ? 'Next' : 'Continue'}
                    </button>
                </div>
            </div>
        </section>
    );
}

