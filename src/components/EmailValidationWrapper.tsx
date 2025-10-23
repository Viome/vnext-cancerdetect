'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import Field from '@/components/Form/Field';
import Spinner from '@/components/Spinner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
    APP_URL,
    ELEGIBILITY_STEPS,
    ELIGIBILITTY_GA_EVENTS,
    LOGIN_PAGE_URL,
    SUPPORT_PAGE_URL,
} from '@/lib/utils/constants';
import { getUserData, handleGAPageView } from '@/lib/utils/eligibility';
import * as Yup from 'yup';
import LoginContentLoader from '@/components/LoginContentLoader';
import ResultsPage from '@/components/ResultsPage';

const LOGIN_PAGE_URL_REDIRECTION = `${LOGIN_PAGE_URL}?oauth2_redirect_uri=${
        process.env.NODE_ENV === 'development'
            ? `http://localhost:3000/eligibility?order_type=regular`
            : `${APP_URL}/eligibility?order_type=regular`
    }`,
    NON_EXISTING_USER_CONTENT = (
        <div>
            <div className="mb-6">
                <h1 className="mb-6 text-4xl font-bold">Verify Your Email</h1>
                <p className="mb-5 text-lg leading-relaxed">
                    Please verify your email for security purpose. <br />
                    Check your email to continue.
                </p>
                <p className="text-gray-500">
                    Didn&apos;t receive email? <br />
                    <a
                        title="Contact Support"
                        href={SUPPORT_PAGE_URL.register}
                        className="underline hover:text-gray-700"
                    >
                        Contact Viome Customer Support
                    </a>{' '}
                    for help.
                </p>
            </div>
        </div>
    ),
    EXISTING_USER_CONTENT = (
        <div>
            <div className="mb-6">
                <h1 className="mb-6 text-4xl font-bold">
                    You have an existing account with us. Please log into your
                    account.
                </h1>
                <p className="mb-8 text-gray-500">
                    If you are not redirected please{' '}
                    <a
                        title="Login"
                        href={LOGIN_PAGE_URL_REDIRECTION}
                        className="underline hover:text-gray-700"
                    >
                        click here
                    </a>
                </p>
            </div>
            <LoginContentLoader />
        </div>
    );

export default function EmailValidationWrapper() {
    const [loading, setLoading] = useState(false),
        [error, setError] = useState(false),
        [importantNotice, setImportantNotice] = useState(true),
        [errorMessage, setErrorMessage] = useState(''),
        [resultsMessage, setResultsMessage] = useState<React.ReactNode>(),
        [submitted, setSubmitted] = useState(false),
        router = useRouter(),
        validationSchema = Yup.object().shape({
            email: Yup.string().email().required('E-mail is required'),
        }),
        formOptions = {
            resolver: yupResolver(validationSchema),
            defaultValues: {
                email: '',
            },
        },
        methods = useForm(formOptions),
        { register, handleSubmit, formState, resetField } = methods,
        { errors } = formState,
        handleUserData = async () => {
            const userData = await getUserData();
            if (userData.error) return false;
            return true;
        },
        onSubmit = async (values: { email: string }) => {
            setError(false);
            setLoading(true);

            try {
                const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN_V1;
                const orderType = 'regular';
                const url = `${apiDomain}/user/generateToken/${values.email}?order_type=${orderType}`;

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Referrer-Policy': 'strict-origin-when-cross-origin',
                        'Cache-Control': 'no-cache',
                    },
                });

                const data = await response.json();
                const { payload } = data;
                const {
                    existing_user: existingUser,
                    error: apiError,
                    message,
                } = payload || {};

                if (!response || response.status !== 200) {
                    setLoading(false);
                    setError(true);
                    setErrorMessage('Error, Our team is working on a fix');
                    return;
                }

                if (existingUser) {
                    setError(false);
                    setLoading(false);
                    setSubmitted(true);
                    setResultsMessage(EXISTING_USER_CONTENT);

                    const userData = await handleUserData();
                    if (userData) {
                        setTimeout(
                            () =>
                                router.push(
                                    '/eligibility?redirected=true&order_type=regular',
                                ),
                            4000,
                        );
                    } else {
                        setTimeout(
                            () =>
                                router.push(
                                    LOGIN_PAGE_URL_REDIRECTION,
                                ),
                            4000,
                        );
                    }
                    return;
                }

                if (apiError) {
                    setLoading(false);
                    setError(true);
                    setErrorMessage(
                        'Please check your email and try again. Redirecting to login page...',
                    );
                    setSubmitted(false);
                    setTimeout(() => {
                        setError(false);
                        resetField('email');
                    }, 4000);
                    return;
                }

                setError(false);
                setLoading(false);
                setSubmitted(true);
                setResultsMessage(NON_EXISTING_USER_CONTENT);
            } catch (err) {
                setError(true);
                setErrorMessage('There was a problem. Please try again later.');
                setLoading(false);
            }
        },
        handleClickAcknowledgement = () => {
            setImportantNotice(false);
            // handleGAPageView(
            //     ELEGIBILITY_STEPS.REGISTER_STEP_ACKNOWLEDGE,
            //     ELIGIBILITTY_GA_EVENTS.CLICK_ACKNOWLEDGE,
            // );
            // handleGAPageView(ELEGIBILITY_STEPS.REGISTER_STEP_EMAIL);
        };

    if (!error && submitted) {
        return <ResultsPage>{resultsMessage}</ResultsPage>;
    }

    if (importantNotice) {
        return (
            <div>
                <div className="mb-12">
                    <h1 className="mb-6 text-4xl font-bold">
                        Important Notice
                    </h1>
                    <p className="text-lg leading-relaxed">
                        <span className="font-medium">
                            CancerDetect<sup>®</sup> Oral &amp; Throat
                        </span>{' '}
                        is intended to detect for active cancer and does NOT
                        determine hereditary risks for future cancers.
                    </p>
                </div>
                <div className="max-w-md">
                    <button
                        type="button"
                        className={classNames(
                            'w-full rounded-lg bg-black px-6 py-3.5 text-base font-normal text-white transition-colors hover:bg-gray-800 disabled:bg-gray-400',
                        )}
                        disabled={loading}
                        onClick={() => handleClickAcknowledgement()}
                    >
                        I understand, continue
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            {!error && (
                <>
                    <div className="mb-8">
                        <h1 className="mb-4 text-4xl font-bold">
                            Eligibility Form
                        </h1>
                        <p className="text-lg leading-relaxed text-gray-700">
                            Please provide accurate information of the person
                            who will be taking the test. We may use information
                            below for contact purpose.
                        </p>
                    </div>
                    <div className="max-w-md">
                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Field
                                    name="email"
                                    label="Email Address"
                                    type="text"
                                    className="!mb-2"
                                    placeholder="your@email.com"
                                />
                                <p className="mb-5 text-sm text-gray-500">
                                    Please use your primary email address.
                                </p>
                                <div className="mb-4">
                                    <button
                                        type="submit"
                                        className={classNames(
                                            'w-full rounded-lg bg-black px-6 py-3.5 text-base font-normal text-white transition-colors hover:bg-gray-800 disabled:bg-gray-400',
                                        )}
                                        disabled={loading}
                                    >
                                        Next
                                    </button>
                                    {loading && (
                                        <div className="mt-4">
                                            <Spinner />
                                        </div>
                                    )}
                                </div>
                            </form>
                        </FormProvider>
                    </div>
                    <div className="mt-16">
                        <p className="text-sm text-gray-500">
                            <a
                                title="Learn more"
                                href={SUPPORT_PAGE_URL.register}
                                className="underline hover:text-gray-700"
                            >
                                Learn more here
                            </a>{' '}
                            if you are purchasing the test kit for someone else.
                        </p>
                    </div>
                </>
            )}
            {error && (
                <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-800">
                    <p>{errorMessage}</p>
                </div>
            )}
        </div>
    );
}

