'use client';

import { useFormContext } from 'react-hook-form';
import Tooltip from '@/components/Form/Tooltip';
import { ethnicityAnswers } from '@/app/api/data/eligibilityQuestions';

export default function Step4() {
    const { register } = useFormContext();

    return (
        <section>
            <div className="sm:max-w-cd-content">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-4">Ethnicity</h1>
                    <p className="text-gray-600">
                        What ethnicity do you identify with? (Select all that apply)
                    </p>
                </div>
            </div>

            <div className="sm:max-w-cd-form">
                <div className="mb-4">
                    <div className="space-y-3">
                        {ethnicityAnswers.map((option) => (
                            <div key={option.value} className="flex items-start">
                                <input
                                    id={`ethnicity-${option.value}`}
                                    type="checkbox"
                                    value={option.value}
                                    {...register(`ethnicity.${option.value}`)}
                                    className="h-4 w-4 mt-1 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                />
                                <label
                                    htmlFor={`ethnicity-${option.value}`}
                                    className="ml-3 flex-1 block text-sm font-medium text-gray-700"
                                >
                                    {option.text}
                                    {option.definition && (
                                        <Tooltip
                                            tooltip={{
                                                position: 'bottom',
                                                title: option.text,
                                                content: option.definition,
                                            }}
                                        />
                                    )}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

