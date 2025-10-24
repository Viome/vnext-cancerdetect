'use client';

import { useFormContext } from 'react-hook-form';
import Field from '@/components/Form/Field';
import { tobaccoTypes } from '@/app/api/data/eligibilityQuestions';

export default function Step2Types() {
    const { register, watch, formState: { errors } } = useFormContext();
    const tobaccoTypesValue = watch('tobaccoTypes');
    
    // Check if at least one tobacco type is selected
    const hasSelectedTobaccoTypes = tobaccoTypesValue && 
        typeof tobaccoTypesValue === 'object' && 
        Object.values(tobaccoTypesValue).some(value => value === true || (typeof value === 'string' && value.trim() !== ''));

    return (
        <section>
            <div className="sm:max-w-cd-content">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-4">Tobacco Use</h1>
                    <p className="text-gray-600">
                        What type of tobacco product have you used four or more times per week for
                        at least six months?
                    </p>
                </div>
            </div>
            <div className="sm:max-w-cd-form">
                {/* Hidden field for validation */}
                <input
                    type="hidden"
                    {...register('tobaccoTypesValidation', {
                        validate: () => {
                            if (!tobaccoTypesValue || typeof tobaccoTypesValue !== 'object') {
                                return 'Please select at least one tobacco type';
                            }
                            
                            const hasSelection = Object.values(tobaccoTypesValue).some(value => 
                                value === true || (typeof value === 'string' && value.trim() !== '')
                            );
                            
                            if (!hasSelection) {
                                return 'Please select at least one tobacco type';
                            }
                            return true;
                        }
                    })}
                />
                
                <Field 
                    name="tobaccoTypes" 
                    type="checkboxGroup" 
                    values={tobaccoTypes}
                />
                
                {errors.tobaccoTypesValidation && (
                    <p className="mt-2 text-sm text-red-600">
                        {errors.tobaccoTypesValidation.message as string}
                    </p>
                )}
            </div>
        </section>
    );
}

