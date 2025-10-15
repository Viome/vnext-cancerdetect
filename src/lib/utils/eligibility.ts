// This file contains legacy eligibility utility functions
// For comprehensive eligibility flow functions, see ./eligibilityFlow.ts

import { NEXT_PUBLIC_API_DOMAIN } from './constants';

export const getUserData = async () => {
    try {
        const response = await fetch(`${NEXT_PUBLIC_API_DOMAIN}/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            return { error: true };
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return { error: true };
    }
};

export const handleGAPageView = (step: string, event?: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', event || 'page_view', {
            page_title: step,
            page_location: window.location.href,
            page_path: window.location.pathname,
        });
    }
};

interface EligibilityData {
    tobaccoCurrent?: string;
    tobaccoPrevious?: string;
    tobaccoYears?: string;
    dob?: string;
    familyCancerYouOrCloseFamilyMember?: string;
    familyCancerYou?: string;
    reasonForTesting?: string;
    hpv?: string;
}

interface EligibilityCriteria {
    eligible: boolean;
    age?: boolean;
    tobacco?: boolean;
    cancer?: boolean;
    hpv?: boolean;
    reasonForTesting?: boolean;
}

// Simple eligibility check - for comprehensive check, use checkEligibility from ./eligibilityFlow.ts
export const checkEligibility = (data: EligibilityData): EligibilityCriteria => {
    const criteria: EligibilityCriteria = {
        eligible: true,
        age: true,
        tobacco: true,
        cancer: true,
        hpv: true,
        reasonForTesting: true,
    };

    // Check age (must be 18 or older)
    if (data.dob) {
        const birthDate = new Date(data.dob);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            criteria.age = age - 1 >= 18;
        } else {
            criteria.age = age >= 18;
        }
        
        if (!criteria.age) {
            criteria.eligible = false;
        }
    }

    // Check tobacco use (at least 20 pack years for previous users)
    if (data.tobaccoPrevious === 'yes' && data.tobaccoYears) {
        const years = parseInt(data.tobaccoYears, 10);
        criteria.tobacco = years >= 20;
        if (!criteria.tobacco) {
            criteria.eligible = false;
        }
    }

    // Check cancer history
    if (data.familyCancerYouOrCloseFamilyMember === 'yes' && data.familyCancerYou === 'yes') {
        criteria.cancer = true;
    }

    // Check HPV status
    if (data.hpv === 'no') {
        criteria.hpv = true;
    }

    // Check reason for testing
    if (data.reasonForTesting) {
        criteria.reasonForTesting = true;
    }

    return criteria;
};

