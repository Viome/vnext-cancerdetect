import { Metadata } from 'next';
import EligibilityWrapper from '@/components/EligibilityWrapper';

export const metadata: Metadata = {
    title: 'CD Eligibility',
    description: 'Complete your eligibility screening',
};

export default function EligibilityPage() {
    return (
        <div className="flex min-h-[80vh] items-center justify-center bg-[#F5F5F5]">
            <div className="w-full max-w-2xl">
                <EligibilityWrapper />
            </div>
        </div>
    );
}

