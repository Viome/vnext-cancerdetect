"use client";

import { useSearchParams } from 'next/navigation';

export default function usePracticeId() {
    const searchParams = useSearchParams();
    return searchParams.get('practiceId');
}

