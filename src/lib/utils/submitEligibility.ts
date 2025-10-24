import { QUESTIONS_IDS } from '@/lib/utils/constants';
import { checkEligibility } from '@/lib/utils/eligibilityFlow';

const {
    REASON_FOR_TESTING,
    TOBACCO_USE,
    TOBACCO_TYPES,
    TOBACCO_YEARS,
    TOBACCO_DAY,
    HPV,
    ETHNICITY,
    YOU_OR_FAMILY_MEMBER_CANCER,
    YOU_CANCER,
    YOU_AGE_CANCER,
    FAMILY_MEMBER_CANCER,
    FAMILY_MEMBER_CANCER_LIST_AGE,
    FAMILY_MEMBER_CANCER_LIST_NAME,
} = QUESTIONS_IDS;

interface FamilyMember {
    relationship?: string;
    age?: string;
}

interface SubmitEligibilityData {
    firstName: string;
    lastName: string;
    gender: string;
    streetAddress: string;
    phoneNumber: string;
    email?: string;
    state: string;
    dob: string;
    apartmentSuitNo: string;
    city: string;
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
    familyMembers: { [key: string]: { selected?: boolean; relationship?: string; age?: string } };
    familyCancerYouOrCloseFamilyMember: string;
    familyCancerYourFamily: string;
    familyCancerYou: string;
    familyCancerYouAge: string;
    orderType?: string;
    kitId?: string;
    dentistId?: string;
}

export const submitEligibility = async (formData: SubmitEligibilityData, userEmail?: string) => {
    const {
        firstName,
        lastName,
        gender,
        streetAddress,
        phoneNumber,
        email = '',
        state,
        dob,
        apartmentSuitNo,
        city,
        zipCode,
        country,
        tobaccoCurrent,
        tobaccoPrevious,
        tobaccoTypes,
        tobaccoYears,
        tobaccoDay,
        reasonForTesting,
        ethnicity,
        hpv,
        familyMembers,
        familyCancerYouOrCloseFamilyMember,
        familyCancerYourFamily,
        familyCancerYou,
        familyCancerYouAge,
        orderType = 'regular',
        kitId = '',
        dentistId = '',
    } = formData;

    // Convert familyMembers object to array format for API processing
    const convertFamilyMembersToArray = (familyMembersObj: any): any[] => {
        if (!familyMembersObj || typeof familyMembersObj !== 'object') return [];
        
        return Object.keys(familyMembersObj).map(key => {
            const member = familyMembersObj[key];
            if (member?.selected === true && member?.relationship) {
                return {
                    relationship: member.relationship,
                    age: member.age || ''
                };
            }
            return { relationship: false };
        });
    };

    const familyMembersArray = convertFamilyMembersToArray(familyMembers);

    const requestBody = {
        email: userEmail || 'c_jayanthan.b@viome.com',
        firstName,
        lastName,
        dob,
        gender: gender.toLowerCase(),
        streetAddress,
        apartmentSuitNo,
        city,
        phoneNumberCountryCode: country,
        phoneNumber,
        country,
        state,
        zipCode,
        tobaccoCurrent,
        tobaccoPrevious,
        tobaccoTypes,
        tobaccoYears,
        tobaccoDay,
        hpv,
        reasonForTesting,
        ethnicity,
        familyCancerYouOrCloseFamilyMember,
        familyCancerYou,
        familyCancerYouAge,
        familyCancerYourFamily,
        familyMembers: familyMembersArray,
        orderType,
    };

    const isElegible = checkEligibility(formData as any);

    if (!isElegible.eligible) {
        return {
            error: false,
            eligible: false,
            message: 'You are not eligible to use the service.',
            body: requestBody,
            criteria: isElegible,
        };
    }

    const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN_V1;
    const url = `${apiDomain}/eligibility/submitEligibleUser`;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'Cache-Control': 'no-cache',
        },
        body: JSON.stringify(requestBody),
    });

    const results = await response.json();

    if (!response || response.status !== 200) {
        return {
            error: true,
            eligible: false,
            message: results.error || 'Error, our team has been notified and is working on a solution.',
            body: requestBody,
            criteria: isElegible,
        };
    }

    return {
        error: false,
        eligible: true,
        url: results.payload || '',
        criteria: isElegible,
    };
};