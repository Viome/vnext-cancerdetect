"use client";

import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { API_DOMAIN_V1 } from '@/lib/utils/constants';

export default function useDentists() {
    const searchParams = useSearchParams();
    const practiceId = searchParams.get('practiceId');
    
    const { data, error, isLoading } = useSWR(
        practiceId
            ? `${API_DOMAIN_V1}/dentists/practice/${practiceId}`
            : null,
        (url) => fetch(url).then((r) => r.json()),
    );

    return {
        dentists: data?.payload ?? [],
        loading: isLoading,
        error,
    };
}

