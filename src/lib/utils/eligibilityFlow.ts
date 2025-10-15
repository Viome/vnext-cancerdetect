import {
    ELEGIBILITY_STEPS,
    ELEGIBILITY_STEPS_PAGE_TITLES_AND_PATHS,
    ELIGIBILITTY_GA_EVENTS,
    ELIGIBILITY_DEFAULT_VALUES,
    ELIGIBILITY_DEFAULT_VALUES_NOT_REQUIRED,
    ELIGIBILITY_PAGE_TITLE,
    NEXT_PUBLIC_API_DOMAIN,
} from './constants';
import { calculateAge } from './helpers';

interface FamilyMember {
    relationship?: string;
    age?: string;
}

interface EligibilityValues {
    firstName: string;
    lastName: string;
    gender: string;
    dob: string;
    phoneNumber: string;
    email: string;
    streetAddress: string;
    apartmentSuitNo: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    tobaccoCurrent: string;
    tobaccoPrevious: string;
    tobaccoTypes: string[];
    tobaccoYears: string;
    tobaccoDay: string;
    reasonForTesting: string;
    ethnicity: string[];
    hpv: string;
    familyCancerYouOrCloseFamilyMember: string;
    familyCancerYou: string;
    familyCancerYouAge: string;
    familyCancerYourFamily: string;
    familyMembers: FamilyMember[];
}

interface EligibilityCheckResult {
    eligible: boolean;
    message: string;
    data: {
        state: string;
        dob: string;
        country: string;
        tobaccoCurrent: string;
        tobaccoPrevious: string;
    };
}

interface UserDataResponse {
    error?: boolean;
    [key: string]: any;
}

declare global {
    interface Window {
        dataLayer: any[];
    }
}

export const getUserData = async (): Promise<UserDataResponse> => {
    try {
        const results = await fetch(`${NEXT_PUBLIC_API_DOMAIN}/user/account`, {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => {
                if (response.status !== 200) {
                    return { error: true };
                }
                return response.json();
            })
            .then((res) => {
                if (res.error) {
                    return { error: true };
                }
                return res;
            });
        return results;
    } catch (error) {
        return { error: true };
    }
};

export const getUserAddresses = async (): Promise<UserDataResponse> => {
    try {
        const results = await fetch(`${NEXT_PUBLIC_API_DOMAIN}/user/addresses`, {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.error) {
                    return { error: true };
                }
                return res;
            });
        return results;
    } catch (error) {
        return { error: true };
    }
};

export const getUserGender = async (): Promise<UserDataResponse> => {
    try {
        const results = await fetch(`${NEXT_PUBLIC_API_DOMAIN}/udb/recentAnswer`, {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.error) {
                    return { error: true };
                }
                return res;
            });
        return results;
    } catch (error) {
        return { error: true };
    }
};

export const getCountryStates = async (country: string): Promise<UserDataResponse> => {
    try {
        const results = await fetch(
            `${NEXT_PUBLIC_API_DOMAIN}/public/stateInfo/${country}`,
            {
                method: 'GET',
                credentials: 'include',
            },
        )
            .then((response) => response.json())
            .then((res) => {
                if (res.error) {
                    return { error: true };
                }
                return res;
            });
        return results;
    } catch (error) {
        return { error: true };
    }
};

export const getCountries = async (): Promise<UserDataResponse> => {
    try {
        const results = await fetch(`${NEXT_PUBLIC_API_DOMAIN}/public/countryInfo`, {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.error) {
                    return { error: true };
                }
                return res;
            });
        return results;
    } catch (error) {
        return { error: true };
    }
};

export const getStates = async (country: string): Promise<UserDataResponse> => {
    try {
        const results = await fetch(`${NEXT_PUBLIC_API_DOMAIN}/public/countryInfo/${country}/states`, {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.error) {
                    return { error: true };
                }
                return res;
            });
        return results;
    } catch (error) {
        return { error: true };
    }
};

export const ageMajorityPerState = (country: string, state: string): number => {
    if (country === 'US' || country === 'United States') {
        if (state === 'NE' || state === 'AL') {
            return 19;
        }
        if (state === 'MS') {
            return 21;
        }
    }
    return 18;
};

export const checkAllValuesComplete = ({ values }: { values: EligibilityValues }): boolean => {
    const missingFileds: string[] = [];
    
    for (const [key] of Object.entries(ELIGIBILITY_DEFAULT_VALUES)) {
        if (key === 'familyMembers') {
            if (
                values.familyCancerYouOrCloseFamilyMember === 'yes' &&
                values.familyCancerYourFamily === 'yes' &&
                values[key].length === 0
            ) {
                missingFileds.push(key);
            }
        } else if (key === 'familyCancerYouAge') {
            if (
                values.familyCancerYou === 'yes' &&
                values.familyCancerYouOrCloseFamilyMember === 'yes' &&
                values[key] === ''
            ) {
                missingFileds.push(key);
            }
        } else if (key === 'familyCancerYourFamily') {
            if (
                values.familyCancerYouOrCloseFamilyMember === 'yes' &&
                values[key] === ''
            ) {
                missingFileds.push(key);
            }
        } else if (key === 'familyCancerYou') {
            if (
                values.familyCancerYouOrCloseFamilyMember === 'yes' &&
                values[key] === ''
            ) {
                missingFileds.push(key);
            }
        } else if (key === 'tobaccoPrevious') {
            if (values.tobaccoCurrent === 'no' && values[key] === '') {
                missingFileds.push(key);
            }
        } else if (key === 'tobaccoTypes') {
            if (
                (values.tobaccoPrevious === 'yes' ||
                    values.tobaccoCurrent === 'yes') &&
                values[key].length === 0
            ) {
                missingFileds.push(key);
            }
        } else if (key === 'tobaccoYears') {
            if (
                (values.tobaccoPrevious === 'yes' ||
                    values.tobaccoCurrent === 'yes') &&
                values[key] === ''
            ) {
                missingFileds.push(key);
            }
        } else if (key === 'tobaccoDay') {
            if (
                (values.tobaccoPrevious === 'yes' ||
                    values.tobaccoCurrent === 'yes') &&
                values[key] === ''
            ) {
                missingFileds.push(key);
            }
        } else if (key === 'dob') {
            if (values.dob) {
                const age = calculateAge(values.dob);
                const ageMajority = ageMajorityPerState(
                    values.country,
                    values.state,
                );
                if (age < ageMajority) {
                    missingFileds.push(key);
                }
                if (age > 120) {
                    missingFileds.push(key);
                }
            }
        } else if (
            (values[key as keyof EligibilityValues] === '' ||
                (Array.isArray(values[key as keyof EligibilityValues]) && 
                 (values[key as keyof EligibilityValues] as string[]).length === 0)) &&
            !ELIGIBILITY_DEFAULT_VALUES_NOT_REQUIRED.includes(key)
        ) {
            missingFileds.push(key);
        }
    }
    
    if (missingFileds.length !== 0) {
        return false;
    }
    return true;
};

export const checkEligibility = (data: Partial<EligibilityValues>): EligibilityCheckResult => {
    const { state = '', dob = '', country = '', tobaccoCurrent = '', tobaccoPrevious = '' } = data;
    const age = calculateAge(dob);
    const ageMajority = ageMajorityPerState(country, state);
    const targetAge = 50;

    if (
        age < targetAge &&
        age >= ageMajority &&
        tobaccoCurrent === 'no' &&
        tobaccoPrevious === 'no'
    ) {
        return {
            eligible: false,
            message: `User matches conditions: age < ${targetAge} && age > ${ageMajority} && (tobaccoCurrent === 'no' && tobaccoPrevious === 'no')`,
            data: {
                state,
                dob,
                country,
                tobaccoCurrent,
                tobaccoPrevious,
            },
        };
    }

    if (age < ageMajority) {
        return {
            eligible: false,
            message: `User matches conditions: age < ${ageMajority}`,
            data: {
                state,
                dob,
                country,
                tobaccoCurrent,
                tobaccoPrevious,
            },
        };
    }

    if ((country === 'US' || country === 'United States') && state === 'NY') {
        return {
            eligible: false,
            message: `User matches conditions : country === 'US' or 'United States' && state === 'NY'`,
            data: {
                state,
                dob,
                country,
                tobaccoCurrent,
                tobaccoPrevious,
            },
        };
    }

    return {
        eligible: true,
        message: 'User matches conditions',
        data: {
            state,
            dob,
            country,
            tobaccoCurrent,
            tobaccoPrevious,
        },
    };
};

export const handleGAPageView = (
    formStep: number,
    eventTitle: string = ELIGIBILITTY_GA_EVENTS.STEP_PAGE_VIEW,
): void => {
    if (typeof window === 'undefined') return;
    
    window.dataLayer = window.dataLayer || [];
    const stepName = Object.keys(ELEGIBILITY_STEPS).find(
        (key) => ELEGIBILITY_STEPS[key as keyof typeof ELEGIBILITY_STEPS] === formStep,
    );
    
    if (!stepName) return;
    
    const page = ELEGIBILITY_STEPS_PAGE_TITLES_AND_PATHS[stepName as keyof typeof ELEGIBILITY_STEPS_PAGE_TITLES_AND_PATHS];
    const { path, title } = page || {};

    window.dataLayer.push({
        event: eventTitle,
        page_path: path,
        page_title: `${ELIGIBILITY_PAGE_TITLE.main}${
            title ? ` | ${title}` : ''
        }`,
    });
};

export const handleStepPageTitle = (formStep: number): string => {
    const stepName = Object.keys(ELEGIBILITY_STEPS).find(
        (key) => ELEGIBILITY_STEPS[key as keyof typeof ELEGIBILITY_STEPS] === formStep,
    );
    
    if (!stepName) return ELIGIBILITY_PAGE_TITLE.main;
    
    const page = ELEGIBILITY_STEPS_PAGE_TITLES_AND_PATHS[stepName as keyof typeof ELEGIBILITY_STEPS_PAGE_TITLES_AND_PATHS];
    const { title } = page || {};
    return `${ELIGIBILITY_PAGE_TITLE.main}${title ? ` | ${title}` : ''}`;
};

