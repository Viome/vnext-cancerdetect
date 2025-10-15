'use client';

import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

interface FieldProps {
    name: string;
    label?: string;
    type?: 'text' | 'radioGroup' | 'checkboxGroup' | 'select' | 'textarea' | 'input' | 'masked-input-kit-id' | 'email' | 'number';
    values?: Array<{ value: string; text: string; [key: string]: any }>;
    data?: { values: any[]; name: string; option: string };
    validate?: any;
    tooltip?: { position: string; title: string; content: React.ReactNode };
    disabled?: boolean;
    className?: string;
    autoComplete?: string;
    fieldAttribute?: string;
    placeholder?: string;
}

export default function Field({
    name,
    label,
    type = 'text',
    values,
    data,
    validate,
    tooltip,
    disabled = false,
    className = '',
    autoComplete,
    fieldAttribute,
    placeholder,
}: FieldProps) {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const error = errors[name];
    const hasError = !!error;

    // Text/Email/Number Input
    if (type === 'text' || type === 'input' || type === 'email' || type === 'number') {
        return (
            <div className={classNames('mb-4', className)}>
                {label && (
                    <label htmlFor={name} className="mb-2 block text-sm font-medium text-gray-900">
                        {label}
                    </label>
                )}
                <input
                    id={name}
                    type={type === 'input' ? 'text' : type}
                    placeholder={placeholder}
                    disabled={disabled}
                    autoComplete={autoComplete}
                    {...register(name, validate)}
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

    // Textarea
    if (type === 'textarea') {
        return (
            <div className={classNames('mb-4', className)}>
                {label && (
                    <label htmlFor={name} className="mb-2 block text-sm font-medium text-gray-900">
                        {label}
                    </label>
                )}
                <textarea
                    id={name}
                    disabled={disabled}
                    placeholder={placeholder}
                    {...register(name, validate)}
                    rows={4}
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

    // Radio Group
    if (type === 'radioGroup') {
        return (
            <div className={classNames('mb-4', className)}>
                {label && (
                    <legend className="mb-3 block text-sm font-medium text-gray-900">{label}</legend>
                )}
                <div className="space-y-2">
                    {values?.map((option) => (
                        <div key={option.value} className="flex items-center">
                            <input
                                id={`${name}-${option.value}`}
                                type="radio"
                                value={option.value}
                                disabled={disabled}
                                {...register(name, validate)}
                                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                            />
                            <label
                                htmlFor={`${name}-${option.value}`}
                                className="ml-3 block text-sm font-medium text-gray-700"
                            >
                                {option.text}
                            </label>
                        </div>
                    ))}
                </div>
                {hasError && (
                    <p className="mt-2 text-sm text-red-600">{error?.message as string}</p>
                )}
            </div>
        );
    }

    // Checkbox Group
    if (type === 'checkboxGroup') {
        return (
            <div className={classNames('mb-4', className)}>
                {label && (
                    <legend className="mb-3 block text-sm font-medium text-gray-900">{label}</legend>
                )}
                <div className="space-y-2">
                    {values?.map((option) => {
                        const fieldName = fieldAttribute
                            ? `${name}.${option.value}.${fieldAttribute}`
                            : `${name}.${option.value}`;
                        
                        return (
                            <div key={option.value} className="flex items-center">
                                <input
                                    id={`${name}-${option.value}`}
                                    type="checkbox"
                                    value={option.value}
                                    disabled={disabled}
                                    {...register(fieldName, validate)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                />
                                <label
                                    htmlFor={`${name}-${option.value}`}
                                    className="ml-3 block text-sm font-medium text-gray-700"
                                >
                                    {option.text}
                                    {tooltip && option.tooltip && (
                                        <span className="ml-2 text-blue-600 cursor-help">ⓘ</span>
                                    )}
                                </label>
                            </div>
                        );
                    })}
                </div>
                {hasError && (
                    <p className="mt-2 text-sm text-red-600">{error?.message as string}</p>
                )}
            </div>
        );
    }

    // Select/Dropdown
    if (type === 'select') {
        const options = data?.values || values;
        const optionName = data?.name || 'text';
        const optionValue = data?.option || 'value';

        return (
            <div className={classNames('mb-4', className)}>
                {label && (
                    <label htmlFor={name} className="mb-2 block text-sm font-medium text-gray-900">
                        {label}
                    </label>
                )}
                <select
                    id={name}
                    disabled={disabled}
                    {...register(name, validate)}
                    className={classNames(
                        'block w-full rounded-lg border p-3 text-sm focus:border-blue-500 focus:ring-blue-500',
                        hasError ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white',
                    )}
                >
                    <option value="">Select an option</option>
                    {options?.map((option: any) => (
                        <option key={option[optionValue]} value={option[optionValue]}>
                            {option[optionName]}
                        </option>
                    ))}
                </select>
                {hasError && (
                    <p className="mt-2 text-sm text-red-600">{error?.message as string}</p>
                )}
            </div>
        );
    }

    // Masked Kit ID Input
    if (type === 'masked-input-kit-id') {
        return (
            <div className={classNames('mb-4', className)}>
                {label && (
                    <label htmlFor={name} className="mb-2 block text-sm font-medium text-gray-900">
                        {label}
                    </label>
                )}
                <input
                    id={name}
                    type="text"
                    placeholder={placeholder || 'XXXX-XXXX-XXXX-XXXX'}
                    disabled={disabled}
                    maxLength={19}
                    {...register(name, {
                        ...validate,
                        onChange: (e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            const formatted = value.match(/.{1,4}/g)?.join('-') || value;
                            e.target.value = formatted;
                        },
                    })}
                    className={classNames(
                        'block w-full rounded-lg border p-3 text-sm font-mono focus:border-blue-500 focus:ring-blue-500',
                        hasError ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white',
                    )}
                />
                {hasError && (
                    <p className="mt-2 text-sm text-red-600">{error?.message as string}</p>
                )}
            </div>
        );
    }

    return null;
}
