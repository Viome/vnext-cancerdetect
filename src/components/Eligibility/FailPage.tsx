'use client';

import Link from 'next/link';
import CDButton from '@/components/CDButton';

interface FailPageProps {
    message?: string;
}

const FailPage = ({ message }: FailPageProps) => {
    if (message) {
        console.error({ error: message });
    }

    return (
        <div className="flex flex-col">
            <div>
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-4">Oops something went wrong!</h1>
                    {message && <p className="text-gray-600">{message}</p>}
                    <div className="mt-10">
                        <CDButton
                            variant="Standard"
                            theme="Dark"
                            href="/"
                            className="cursor-pointer"
                        >
                            Back to home
                        </CDButton>
                    </div>
                </div>
                <div>
                    <Link
                        href="https://support.viome.com"
                        className="text-gray-600 underline"
                    >
                        Contact Viome Customer Support
                    </Link>{' '}
                    for more help.
                </div>
            </div>
        </div>
    );
};

export default FailPage;

