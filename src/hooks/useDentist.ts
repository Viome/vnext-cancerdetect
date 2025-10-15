"use client";

import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { NEXT_API_FOLDER } from '@/lib/utils/constants';

export default function useDentist() {
    const searchParams = useSearchParams();
    const dentistId = searchParams.get('dentistId');
    
    const dentistQuery = useSWR(
        dentistId
            ? `/${NEXT_API_FOLDER}/dentist/${dentistId}`
            : null,
        (url) => fetch(url).then((r) => r.json()),
    );

    return dentistQuery;
}

