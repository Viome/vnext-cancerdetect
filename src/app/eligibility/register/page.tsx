import EmailValidationWrapper from '@/components/EmailValidationWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'CD Eligibility',
    description: 'Complete your eligibility screening',
};

export default function RegisterPage() {
    return (
        <div className="flex min-h-[80vh] items-center justify-center bg-[#F5F5F5]">
            <div className="w-full max-w-2xl">
                <EmailValidationWrapper />
            </div>
        </div>
    );
}

