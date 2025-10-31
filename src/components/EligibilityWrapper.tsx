'use client';

import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import useFormPersist from 'react-hook-form-persist';
import classNames from 'classnames';
import moment from 'moment';
import {
    ELEGIBILITY_STEPS,
    ELIGIBILITTY_GA_EVENTS,
    ELIGIBILITY_DEFAULT_VALUES,
    LOCAL_STORAGE_CD_ELEGIBILITY,
    USER_GENDER_QUESTION_ID,
} from '@/lib/utils/constants';
import {
    checkAllValuesComplete,
    getUserAddresses,
    getUserData as getUserDataFlow,
    getUserGender,
    handleGAPageView,
    handleStepPageTitle,
} from '@/lib/utils/eligibilityFlow';
import { submitEligibilityClient } from '@/lib/utils/eligibilityClient';
import { scrollToTopDiv } from '@/lib/utils/helpers';
import Spinner from './Spinner';
import Step0 from './Eligibility/Steps/Step0';
import Step1 from './Eligibility/Steps/Step1';
import Step2 from './Eligibility/Steps/Step2';
import Step2Previous from './Eligibility/Steps/Step2Previous';
import Step2Types from './Eligibility/Steps/Step2Types';
import Step2Years from './Eligibility/Steps/Step2Years';
import Step2Day from './Eligibility/Steps/Step2Day';
import Step3 from './Eligibility/Steps/Step3';
import Step4 from './Eligibility/Steps/Step4';
import Step5 from './Eligibility/Steps/Step5';
import Step6 from './Eligibility/Steps/Step6';
import Step7 from './Eligibility/Steps/Step7';
import Step8 from './Eligibility/Steps/Step8';
import Step9 from './Eligibility/Steps/Step9';
import Step10 from './Eligibility/Steps/Step10';
import StepConfirmDetails from './Eligibility/Steps/StepConfirmDetails';
import EligibilityResults from './Eligibility/EligibilityResults';
import BackButton from './Form/BackButton';

export default function EligibilityWrapper() {
    const [formStep, setFormStep] = useState<number | undefined>();
    const [loading, setLoading] = useState(false);
    const [verifyingTokenLoading, setVerifyingTokenLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [tokenVerified, setTokenVerified] = useState(false);
    const [redirectUrl, setRedirectUrl] = useState('');
    const [userIsElegible, setUserIsElegible] = useState(false);
    const [stepStack, setStepStack] = useState<number[]>([]);

    const router = useRouter();
    const searchParams = useSearchParams();

    const formOptions = {
        mode: 'onChange' as const,
        defaultValues: ELIGIBILITY_DEFAULT_VALUES,
    };

    const methods = useForm(formOptions);
    const { handleSubmit, formState, watch, setValue, reset } = methods;
    const { isValid } = formState;

    const {
        MAX_STEPS,
        PERSONAL_INFO_STEP,
        CONFIRMATION_DETAILS_STEP,
        CONTACT_DETAILS_STEP,
        TOBACCO_USE_STEP,
        TOBACCO_USE_PREVIOUS_STEP_PREVIOUS,
        TOBACCO_USE_TYPES,
        TOBACCO_USE_YEARS,
        TOBACCO_USE_DAY_CONSUME,
        PRIMARY_REASON_STEP,
        ETHNICITY_STEP,
        HPV_STEP,
        YOU_OR_FAMILY_CANCER,
        YOU_CANCER,
        YOU_CANCER_AGE,
        YOUR_FAMILY_CANCER,
        FAMILY_MEMBERS_STEP,
    } = ELEGIBILITY_STEPS;

    const onSubmit = async () => {
        handleGAPageView(
            ELEGIBILITY_STEPS.CONFIRMATION_DETAILS_STEP,
            ELIGIBILITTY_GA_EVENTS.CLICK_CONFIRM,
        );
        setError(false);
        setLoading(true);
        
        try {
            const formData = watch();
            const orderType = searchParams.get('order_type') || 'regular';
            const res = await submitEligibilityClient({
                ...formData,
                orderType,
            } as any);

            if (res.error) {
                setUserIsElegible(false);
                setError(true);
                setErrorMessage(
                    'Sorry, there was an error submitting your data. Please contact Support.',
                );
            } else if (res.eligible) {
                setRedirectUrl(res.url);
                setUserIsElegible(true);
                setFormStep(MAX_STEPS + 1);
                setSubmitted(true);
                setLoading(false);
                reset();
            } else {
                setUserIsElegible(false);
                setFormStep(MAX_STEPS + 1);
                setSubmitted(true);
                setLoading(false);
                reset();
            }
        } catch (err: any) {
            setError(true);
            setErrorMessage(err.message);
        }
    };

    const completeFormStepForced = () => {
        setStepStack((cur) => [...cur, formStep!]);
        setFormStep((cur) => cur! + 1);
    };

    const completeFormStep = () => {
        setStepStack((cur) => [...cur, formStep!]);

        const tobaccoCurrent = watch('tobaccoCurrent');
        if (formStep === TOBACCO_USE_STEP && tobaccoCurrent === 'yes') {
            setFormStep(TOBACCO_USE_TYPES);
            return;
        }

        const tobaccoPrevious = watch('tobaccoPrevious');
        if (
            formStep === TOBACCO_USE_PREVIOUS_STEP_PREVIOUS &&
            tobaccoPrevious === 'yes'
        ) {
            setFormStep(TOBACCO_USE_TYPES);
            return;
        }

        if (
            formStep === TOBACCO_USE_PREVIOUS_STEP_PREVIOUS &&
            tobaccoPrevious === 'no'
        ) {
            setFormStep(HPV_STEP);
            return;
        }

        const familyCancerYouOrCloseFamilyMember = watch(
            'familyCancerYouOrCloseFamilyMember',
        );
        const familyCancerYou = watch('familyCancerYou');
        const familyCancerYourFamily = watch('familyCancerYourFamily');

        if (
            formStep === YOU_OR_FAMILY_CANCER &&
            (familyCancerYouOrCloseFamilyMember === 'no' ||
                familyCancerYouOrCloseFamilyMember === 'not_sure')
        ) {
            setFormStep(CONFIRMATION_DETAILS_STEP);
            return;
        }

        if (
            formStep === YOUR_FAMILY_CANCER &&
            (familyCancerYourFamily === 'no' ||
                familyCancerYourFamily === 'not_sure')
        ) {
            setFormStep(CONFIRMATION_DETAILS_STEP);
            return;
        }

        if (
            formStep === YOUR_FAMILY_CANCER &&
            familyCancerYourFamily === 'yes'
        ) {
            setFormStep(FAMILY_MEMBERS_STEP);
            return;
        }

        if (
            formStep === YOU_CANCER &&
            (familyCancerYou === 'no' || familyCancerYou === 'not_sure')
        ) {
            setFormStep(YOUR_FAMILY_CANCER);
            return;
        }

        setFormStep((cur) => cur! + 1);
    };

    const handleFormSubmit = () => {
        onSubmit();
    };

    const backFormStep = () => {
        if (formStep && formStep > 0) {
            const lastStep = stepStack[stepStack.length - 1];
            setFormStep(lastStep);
            setStepStack((cur) => cur.slice(0, -1));
        }
    };

    useEffect(() => {
        if (formStep !== undefined) {
            scrollToTopDiv('mainContent');
            handleGAPageView(formStep);
        }
    }, [formStep]);

    useFormPersist(LOCAL_STORAGE_CD_ELEGIBILITY, {
        watch,
        setValue,
        storage: typeof window !== 'undefined' ? window.sessionStorage : undefined,
    });

    useEffect(() => {
        const initializeForm = async () => {
            // Check if there's persisted data in sessionStorage
            const persistedData = typeof window !== 'undefined' 
                ? window.sessionStorage.getItem(LOCAL_STORAGE_CD_ELEGIBILITY)
                : null;
            
            // Only reset if there's no persisted data
            if (!persistedData) {
                reset();
            }

            const handleUserData = async () => {
                const userData = await getUserDataFlow();
                if (userData.error) return null;
                setValue('firstName', userData.firstName);
                setValue('lastName', userData.lastName);
                setValue('phoneNumberCountryCode', userData.countryPhoneCode || 'US');
                setValue('phoneNumber', userData.phone?.replace(/\D/g, ''));
                const dob = moment(userData.birthDate).format('YYYY-MM-DD');
                setValue('dob', dob);
                return true;
            };

            const handleUserAddresses = async () => {
                const userAddresses = await getUserAddresses();
                if (userAddresses.error) return null;
                
                const defaultAddress = userAddresses?.find(
                    (address: any) => address.defaultAddress,
                );

                if (defaultAddress) {
                    setValue('streetAddress', defaultAddress.addressLine1);
                    setValue('apartmentSuitNo', defaultAddress.addressLine2);
                    setValue('city', defaultAddress.city);
                    setValue('state', defaultAddress.state);
                    setValue('country', defaultAddress.country);
                    setValue('zipCode', defaultAddress.zip);
                    return true;
                }
                
                setValue('country', 'US');
                return null;
            };

            const handleUserGender = async () => {
                const userGender = await getUserGender();
                if (userGender.error) return null;
                
                const questionIdQuestion = userGender.find(
                    (question: any) =>
                        question.questionId === USER_GENDER_QUESTION_ID,
                );
                
                if (questionIdQuestion) {
                    setValue('gender', questionIdQuestion.answer.toLowerCase());
                    return true;
                }
                return null;
            };

            const existingUserSessionValidation = async () => {
                setVerifyingTokenLoading(true);
                
                // Only load user data if there's no persisted form data
                if (!persistedData) {
                    const userData = handleUserData();
                    const userAddress = handleUserAddresses();
                    const userGender = handleUserGender();

                    Promise.all([userData, userAddress, userGender]).then((values) => {
                        if (!values[0]) {
                            setError(true);
                            setErrorMessage(
                                'There was a problem fetching user data. You are being redirected to the login page',
                            );
                            setTimeout(() => {
                                router.push('/eligibility/register');
                            }, 3000);
                        }
                        setFormStep(PERSONAL_INFO_STEP);
                        setVerifyingTokenLoading(false);
                    });
                } else {
                    // If there's persisted data, just set the appropriate step
                    setFormStep(PERSONAL_INFO_STEP);
                    setVerifyingTokenLoading(false);
                }
                setTokenVerified(true);
            };

            const tokenValidation = async (token: string) => {
                setVerifyingTokenLoading(true);
                
                try {
                    const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN_V1;
                    const url = `${apiDomain}/user/verifyToken?token=${token}`;

                    const response = await fetch(url, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    const data = await response.json();
                    const { payload } = data;
                    const { body, statusCodeValue } = payload || {};
                    const { error, email } = body || {};

                    if (!response || statusCodeValue !== 200) {
                        setError(true);
                        setErrorMessage('Please try again');
                        setVerifyingTokenLoading(false);
                        setFormStep(PERSONAL_INFO_STEP);
                        return false;
                    }

                    if (error && error !== 'cd-0028') {
                        setError(true);
                        setErrorMessage('Error token not valid');
                        setVerifyingTokenLoading(false);
                        setFormStep(PERSONAL_INFO_STEP);
                        return false;
                    }

                    // Only set these values if there's no persisted data
                    if (!persistedData) {
                        setValue('country', 'US');
                        setValue('phoneNumberCountryCode', 'US');
                    }

                    // Set the email from token validation response
                    if (email) {
                        setValue('email', email);
                    }

                    setFormStep(PERSONAL_INFO_STEP);

                    sessionStorage.setItem('token', token);
                    setTokenVerified(true);
                    setVerifyingTokenLoading(false);
                    return true;
                } catch (err) {
                    setError(true);
                    setErrorMessage('There was a problem. Please try again later.');
                    setVerifyingTokenLoading(false);
                    setFormStep(PERSONAL_INFO_STEP);
                    return false;
                }
            };

            try {
                if (!tokenVerified) {
                    let token = typeof window !== 'undefined' 
                        ? sessionStorage.getItem('token')
                        : null;
                    
                    const queryToken = searchParams?.get('token');
                    const redirectedStatus = searchParams?.get('redirected');

                    if (queryToken) token = queryToken;

                    if (redirectedStatus === 'true') {
                        existingUserSessionValidation();
                    } else if (token && token !== 'null') {
                        tokenValidation(token);
                    } else {
                        setError(true);
                        setErrorMessage('No token provided');
                        setVerifyingTokenLoading(false);
                    }
                }
            } catch (err) {
                setError(true);
                setErrorMessage('There was a problem. Please try again later.');
                setVerifyingTokenLoading(false);
            }
        };

        initializeForm();
    }, [searchParams, tokenVerified]);

    if (!error && !verifyingTokenLoading && formStep === undefined) {
        return null;
    }

    if (error) {
        return (
            <div className="m-auto flex max-w-4xl flex-col items-center justify-center p-10 text-center">
                <div className="rounded-lg bg-red-50 p-6">
                    <h2 className="text-xl font-semibold text-red-800 mb-2">
                        Oops, something went wrong!
                    </h2>
                    <p className="text-red-600">{errorMessage}</p>
                </div>
            </div>
        );
    }

    if (verifyingTokenLoading) {
        return (
            <div className="m-auto flex h-screen max-w-4xl flex-col items-center justify-center">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="h-full lg:max-w-3xl" id="mainContent">
            <div className="p-10 lg:p-0">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Results */}
                        {submitted ? (
                            <EligibilityResults
                                userIsElegible={userIsElegible}
                                redirectUrl={redirectUrl}
                                setFormStep={setFormStep}
                            />
                        ) : (
                            <>
                                {formStep !== undefined &&
                                    formStep !== PERSONAL_INFO_STEP &&
                                    formStep !== FAMILY_MEMBERS_STEP && (
                                        <BackButton
                                            formStep={formStep}
                                            handleBackStep={() => backFormStep()}
                                        />
                                    )}

                                {/* Personal Info */}
                                {formStep === PERSONAL_INFO_STEP && <Step0 />}

                                {/* Contact Details */}
                                {formStep === CONTACT_DETAILS_STEP && <Step1 />}

                                {/* Tobacco Use Flow */}
                                {formStep === TOBACCO_USE_STEP && <Step2 />}
                                {formStep === TOBACCO_USE_PREVIOUS_STEP_PREVIOUS && <Step2Previous />}
                                {formStep === TOBACCO_USE_TYPES && <Step2Types />}
                                {formStep === TOBACCO_USE_YEARS && <Step2Years />}
                                {formStep === TOBACCO_USE_DAY_CONSUME && <Step2Day />}

                                {/* HPV */}
                                {formStep === HPV_STEP && <Step10 />}

                                {/* Reason and Ethnicity */}
                                {formStep === PRIMARY_REASON_STEP && <Step3 />}
                                {formStep === ETHNICITY_STEP && <Step4 />}

                                {/* Cancer History Flow */}
                                {formStep === YOU_OR_FAMILY_CANCER && <Step5 />}
                                {formStep === YOU_CANCER && <Step6 />}
                                {formStep === YOU_CANCER_AGE && <Step7 />}
                                {formStep === YOUR_FAMILY_CANCER && <Step8 />}
                                {formStep === FAMILY_MEMBERS_STEP && (
                                    <Step9
                                        handleBackStep={() => backFormStep()}
                                        formStep={formStep}
                                        completeFormStep={() => completeFormStepForced()}
                                    />
                                )}

                                {/* Confirmation */}
                                {formStep === CONFIRMATION_DETAILS_STEP && <StepConfirmDetails />}
                            </>
                        )}

                        {/* Buttons (except for Family Members which has its own) */}
                        {!submitted && formStep !== FAMILY_MEMBERS_STEP && (
                            <div className="sm:max-w-cd-form">
                                <div className="mt-20 pb-20">
                                    <div className="flex flex-col gap-3">
                                        {formStep !== undefined && formStep < MAX_STEPS &&
                                            formStep !== CONFIRMATION_DETAILS_STEP && (
                                                <button
                                                    type="button"
                                                    className="bg-black text-white px-6 py-3 rounded-lg disabled:bg-gray-400"
                                                    onClick={() => completeFormStep()}
                                                    disabled={!isValid}
                                                >
                                                    Next
                                                </button>
                                            )}

                                        {formStep === CONFIRMATION_DETAILS_STEP && (
                                            <>
                                                <button
                                                    type="button"
                                                    className="bg-black text-white px-6 py-3 rounded-lg disabled:bg-gray-400"
                                                    disabled={
                                                        loading ||
                                                        !checkAllValuesComplete({
                                                            values: watch() as any,
                                                        })
                                                    }
                                                    onClick={() => handleFormSubmit()}
                                                >
                                                    My Information is Correct
                                                </button>
                                                <button
                                                    type="button"
                                                    className="bg-white text-black border-2 border-black px-6 py-3 rounded-lg"
                                                    onClick={() => setFormStep(PERSONAL_INFO_STEP)}
                                                >
                                                    Edit Information
                                                </button>
                                            </>
                                        )}

                                        {loading && <Spinner />}
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>
                </FormProvider>

                {error && <p className="text-red-600 mt-4">{errorMessage}</p>}
            </div>
        </div>
    );
}

