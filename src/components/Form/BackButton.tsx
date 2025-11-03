'use client';

interface BackButtonProps {
    formStep: number;
    handleBackStep: () => void;
}

export default function BackButton({ formStep, handleBackStep }: BackButtonProps) {
    return (
        <button
            type="button"
            onClick={handleBackStep}
            className="mb-6 flex items-center text-black hover:text-gray-800 font-medium cursor-pointer"
        >
            <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                />
            </svg>
            Back
        </button>
    );
}

