import { NextRequest, NextResponse } from 'next/server';
// import * as Sentry from '@sentry/nextjs';
import { API_DOMAIN_V1, QUESTIONS_IDS } from '@/lib/utils/constants';
import { checkEligibility } from '@/lib/utils/eligibility';

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

const errorMessage = 'Error, our team has been notified and is working on a solution.';

interface FamilyMember {
    relationship?: string;
    age?: string;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
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
        } = body;

        const ethnicityResults = {
            answer: ethnicity && ethnicity.join(','),
            subgroup_id: null,
            instance_id: 1,
            question_id: ETHNICITY,
        };

        const tobaccoTypesResults =
            tobaccoTypes && tobaccoTypes !== ''
                ? [
                      {
                          answer: tobaccoTypes && tobaccoTypes.join(','),
                          subgroup_id: 411,
                          instance_id: 1,
                          question_id: TOBACCO_TYPES,
                      },
                  ]
                : [];

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

        let familyCounter = 0;
        const familyMembersResults =
            familyMembers &&
            (familyMembers as FamilyMember[])
                .filter((member) => {
                    if (!member.relationship) {
                        return false;
                    }
                    return true;
                })
                .map((family) => {
                    if (family.relationship) {
                        familyCounter += 1;
                        const familyRecord = {
                            answer: family.relationship,
                            subgroup_id: FAMILY_MEMBER_CANCER_LIST_NAME,
                            instance_id: familyCounter,
                            question_id: FAMILY_MEMBER_CANCER_LIST_NAME,
                        };
                        return familyRecord;
                    }
                    return null;
                });

        familyCounter = 0;
        const familyMembersResultsAge =
            familyMembers &&
            (familyMembers as FamilyMember[])
                .filter((member) => {
                    if (!member.relationship) {
                        return false;
                    }
                    return true;
                })
                .map((family) => {
                    if (family.relationship) {
                        familyCounter += 1;
                        const familyRecord = {
                            answer: family.age,
                            subgroup_id: FAMILY_MEMBER_CANCER_LIST_NAME,
                            instance_id: familyCounter,
                            question_id: FAMILY_MEMBER_CANCER_LIST_AGE,
                        };
                        return familyRecord;
                    }
                    return null;
                });

        const phoneNumerClean = `1-${phoneNumber}`;
        const dobDate = new Date(dob);
        const dobDateFormatted = `${dobDate.getFullYear()}-${
            dobDate.getMonth() + 1
        }-${dobDate.getDate()}`;
        const tobaccoUse =
            tobaccoCurrent === 'yes' || tobaccoPrevious === 'yes' ? 'yes' : 'no';

        const requestBody = {
            user: {
                first_name: firstName,
                last_name: lastName,
                full_name: `${firstName} ${lastName}`,
                birth_date: `${dobDateFormatted}`,
                gender: `${gender.replace(/^\w/, (c: string) => c.toUpperCase())}`,
                phone: `${phoneNumerClean}`,
                email: `${email}`,
                address: {
                    line: streetAddress,
                    line2: apartmentSuitNo,
                    city,
                    state,
                    zip: zipCode,
                    country,
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
                dentistId && dentistId !== '' ? parseInt(dentistId, 10) : null,
        };

        const isElegible = checkEligibility(body);

        if (!isElegible.eligible) {
            return NextResponse.json(
                {
                    error: false,
                    eligible: false,
                    message: 'You are not eligible to use the service.',
                    body: requestBody,
                    criteria: isElegible,
                },
                { status: 200 }
            );
        }

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

        const response = await fetch(url, options);
        const results = await response.json();

        if (!response || response.status !== 200) {
            // Sentry.captureMessage(`Error Submitting Elegibility: ${errorMessage}`);
            return NextResponse.json(
                {
                    error: true,
                    eligible: false,
                    message: results.error || errorMessage,
                    body: requestBody,
                    criteria: isElegible,
                },
                { status: 200 }
            );
        }

        return NextResponse.json(
            {
                error: false,
                eligible: true,
                url: results.payload || '',
                criteria: isElegible,
            },
            { status: 200 }
        );
    } catch (err) {
        // Sentry.captureException(err);
        // Sentry.captureException(errorMessage);
        return NextResponse.json(
            {
                error: true,
                message: errorMessage,
            },
            { status: 400 }
        );
    }
}

