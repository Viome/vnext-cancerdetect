import { API_DOMAIN_V1, QUESTIONS_IDS } from './constants';
import { checkEligibility } from './eligibilityFlow';

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
    selected?: boolean;
    age?: string;
    relationship?: string;
}

interface EligibilityFormData {
    firstName: string;
    lastName: string;
    gender: string;
    streetAddress: string;
    phoneNumber: string;
    email: string;
    state: string;
    dob: string;
    apartmentSuitNo?: string;
    city: string;
    zipCode: string;
    country: string;
    tobaccoCurrent: string;
    tobaccoPrevious: string;
    tobaccoTypes?: string | string[] | { [key: string]: any };
    tobaccoYears?: string;
    tobaccoDay?: string;
    reasonForTesting: string;
    ethnicity?: string[];
    hpv: string;
    familyMembers?: { [key: string]: FamilyMember };
    familyCancerYouOrCloseFamilyMember: string;
    familyCancerYourFamily?: string;
    familyCancerYou?: string;
    familyCancerYouAge?: string;
    orderType?: string;
    kitId?: string;
    dentistId?: string;
}

export const submitEligibilityClient = async (formData: EligibilityFormData) => {
    const {
        firstName,
        lastName,
        gender,
        streetAddress,
        phoneNumber,
        email,
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
        orderType,
        kitId,
        dentistId,
    } = formData;
    console.log('jeyyy', formData)

    // Build ethnicity results
    const ethnicityResults = {
        answer: ethnicity && ethnicity.join(','),
        subgroup_id: null,
        instance_id: 1,
        question_id: ETHNICITY,
    };

    // Build tobacco types results - handle both object and array formats
    const tobaccoTypesResults = (() => {
        if (!tobaccoTypes) return [];
        
        let selectedTypes: string[] = [];
        
        if (typeof tobaccoTypes === 'object' && !Array.isArray(tobaccoTypes)) {
            // Handle object format like { "cigarette": false, "cigar": "cigar", ... }
            selectedTypes = Object.keys(tobaccoTypes).filter(key => {
                const value = tobaccoTypes[key];
                return value === true || (typeof value === 'string' && value.trim() !== '');
            });
        } else if (Array.isArray(tobaccoTypes)) {
            // Handle array format
            selectedTypes = tobaccoTypes.filter(type => type && type.trim() !== '');
        } else if (typeof tobaccoTypes === 'string' && tobaccoTypes.trim() !== '') {
            // Handle string format
            selectedTypes = [tobaccoTypes];
        }
        
        return selectedTypes.length > 0
            ? [
                  {
                      answer: selectedTypes.join(','),
                      subgroup_id: 411,
                      instance_id: 1,
                      question_id: TOBACCO_TYPES,
                  },
              ]
            : [];
    })();

    // Build tobacco day results
    const tobaccoDayResults =
        tobaccoDay && tobaccoDay !== ''
            ? [
                  {
                      answer: tobaccoDay,
                      subgroup_id: 411,
                      instance_id: 1,
                      question_id: TOBACCO_DAY,
                  },
              ]
            : [];

    // Build tobacco years results
    const tobaccoYearsResults =
        tobaccoYears && tobaccoYears !== ''
            ? [
                  {
                      answer: tobaccoYears,
                      subgroup_id: 411,
                      instance_id: 1,
                      question_id: TOBACCO_YEARS,
                  },
              ]
            : [];

    // Build family cancer you age results
    const familyCancerYouAgeResults =
        familyCancerYouAge && familyCancerYouAge !== ''
            ? [
                  {
                      answer: familyCancerYouAge,
                      subgroup_id: YOU_AGE_CANCER,
                      instance_id: 1,
                      question_id: YOU_AGE_CANCER,
                  },
              ]
            : [];

    // Build family cancer your family results
    const familyCancerYourFamilyResults =
        familyCancerYourFamily && familyCancerYourFamily !== ''
            ? [
                  {
                      answer: familyCancerYourFamily,
                      subgroup_id: YOU_CANCER,
                      instance_id: 1,
                      question_id: FAMILY_MEMBER_CANCER,
                  },
              ]
            : [];

    // Build family members results - convert from object to array format
    let familyCounter = 0;
    const familyMembersResults = familyMembers && typeof familyMembers === 'object'
        ? Object.keys(familyMembers)
              .filter(key => familyMembers[key]?.selected === true)
              .map(key => {
                  familyCounter += 1;
                  return {
                      answer: key, // Use the key as the relationship
                      subgroup_id: FAMILY_MEMBER_CANCER_LIST_NAME,
                      instance_id: familyCounter,
                      question_id: FAMILY_MEMBER_CANCER_LIST_NAME,
                  };
              })
        : [];

    familyCounter = 0;
    const familyMembersResultsAge = familyMembers && typeof familyMembers === 'object'
        ? Object.keys(familyMembers)
              .filter(key => familyMembers[key]?.selected === true)
              .map(key => {
                  familyCounter += 1;
                  return {
                      answer: familyMembers[key]?.age || '',
                      subgroup_id: FAMILY_MEMBER_CANCER_LIST_NAME,
                      instance_id: familyCounter,
                      question_id: FAMILY_MEMBER_CANCER_LIST_AGE,
                  };
              })
        : [];

    // Format phone number and date
    const phoneNumerClean = `1-${phoneNumber}`;
    const dobDate = new Date(dob);
    const dobDateFormatted = `${dobDate.getFullYear()}-${
        dobDate.getMonth() + 1
    }-${dobDate.getDate()}`;
    const tobaccoUse =
        tobaccoCurrent === 'yes' || tobaccoPrevious === 'yes' ? 'yes' : 'no';

    // Convert country name to country code
    const getCountryCode = (countryName: string): string => {
        const countryMap: { [key: string]: string } = {
            'United States': 'US',
            'United States of America': 'US',
            'USA': 'US',
            'Canada': 'CA',
            'United Kingdom': 'GB',
            'UK': 'GB',
            // Add more mappings as needed
        };
        return countryMap[countryName] || countryName;
    };

    const countryCode = getCountryCode(country);

    // Build the request payload exactly as specified
    const requestBody = {
        user: {
            first_name: firstName,
            last_name: lastName,
            full_name: `${firstName} ${lastName}`,
            birth_date: `${dobDateFormatted}`,
            gender: `${gender.replace(/^\w/, (c) =>
                c.toUpperCase(),
            )}`,
            phone: `${phoneNumerClean}`,
            email: `${email}`,
            address: {
                line: streetAddress,
                line2: apartmentSuitNo,
                city,
                state,
                zip: zipCode,
                country: countryCode,
            },
        },
        partner_question_answers: [
            ethnicityResults,
            {
                answer: familyCancerYou,
                subgroup_id: YOU_CANCER,
                instance_id: 1,
                question_id: YOU_CANCER,
            },
            ...familyCancerYourFamilyResults,
            ...familyCancerYouAgeResults,
            ...familyMembersResults,
            ...familyMembersResultsAge,
            {
                answer: tobaccoUse,
                subgroup_id: null,
                instance_id: 1,
                question_id: TOBACCO_USE,
            },
            ...tobaccoTypesResults,
            ...tobaccoDayResults,
            ...tobaccoYearsResults,
            {
                answer: hpv,
                subgroup_id: null,
                instance_id: 1,
                question_id: HPV,
            },
            {
                answer: reasonForTesting,
                subgroup_id: null,
                instance_id: 1,
                question_id: REASON_FOR_TESTING,
            },
            {
                answer: familyCancerYouOrCloseFamilyMember,
                subgroup_id: null,
                instance_id: 1,
                question_id: YOU_OR_FAMILY_MEMBER_CANCER,
            },
        ],
        order_type: orderType,
        kit_id: kitId && kitId !== '' ? kitId : null,
        dentist_id:
            dentistId && dentistId !== ''
                ? parseInt(dentistId, 10)
                : null,
    };

    // Check eligibility first - convert data to expected format
    const eligibilityData = {
        ...formData,
        tobaccoTypes: (() => {
            if (!tobaccoTypes) return [];
            
            if (typeof tobaccoTypes === 'object' && !Array.isArray(tobaccoTypes)) {
                // Convert object to array of selected keys
                return Object.keys(tobaccoTypes).filter(key => {
                    const value = tobaccoTypes[key];
                    return value === true || (typeof value === 'string' && value.trim() !== '');
                });
            } else if (Array.isArray(tobaccoTypes)) {
                return tobaccoTypes;
            } else if (typeof tobaccoTypes === 'string' && tobaccoTypes.trim() !== '') {
                return [tobaccoTypes];
            }
            
            return [];
        })(),
        familyMembers: familyMembers && typeof familyMembers === 'object' 
            ? Object.keys(familyMembers)
                  .filter(key => familyMembers[key]?.selected === true)
                  .map(key => ({
                      relationship: key,
                      age: familyMembers[key]?.age || ''
                  }))
            : []
    };
    const isEligible = checkEligibility(eligibilityData);

    if (!isEligible.eligible) {
        return {
            error: false,
            eligible: false,
            message: 'You are not eligible to use the service.',
            body: requestBody,
            criteria: isEligible,
        };
    }

    // Submit to external API
    const url = `${API_DOMAIN_V1}/eligibility/submitEligibleUser`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'Cache-Control': 'no-cache',
        },
        body: JSON.stringify(requestBody),
    };

    try {
        const response = await fetch(url, options);
        const results = await response.json();

        if (!response || response.status !== 200) {
            return {
                error: true,
                eligible: false,
                message: results.error || 'Error, our team has been notified and is working on a solution.',
                body: requestBody,
                criteria: isEligible,
            };
        }

        return {
            error: false,
            eligible: true,
            url: results.payload || '',
            criteria: isEligible,
        };
    } catch (err) {
        return {
            error: true,
            message: 'Error, our team has been notified and is working on a solution.',
        };
    }
};
