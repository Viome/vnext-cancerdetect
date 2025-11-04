"use client";

import { ReactNode, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import {
    Input,
    Radio,
    RadioGroup,
    Select,
    SelectItem,
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@nextui-org/react";
import type { Selection } from "@nextui-org/react";
import { PositiveIcon, NegativeIcon } from "./RiskAssessmentIcons";
import { cn as classNames } from "@/lib/utils";
import RiskAssessmentFaqs from "./RiskAssessmentFaqs";
import useDentist from "@/hooks/useDentist";
import { VDP_URL } from "@/lib/utils/constants";
interface Question {
    name: string;
    label: string;
    component: string;
    infoLabel: string;
    answers?: Array<{ label: string; value: string }>;
    tooltip: (props: { navigateToFaq: (id: string) => void }) => React.ReactElement;
}

const questions: Question[] = [
    {
        name: 'age',
        label: 'What is your age?',
        component: 'Input',
        infoLabel: '[understand the connection to cancer]',
        tooltip: ({ navigateToFaq }) => (
            <div>
                <p>
                    Your risk of oral and throat cancer increases as you
                    age. If you're 50 or older, it's important to know
                    that around 85% of new cases of oral cancer are
                    found in people your age.
                    <button
                        onClick={() => navigateToFaq('3')}
                        type="button"
                    >
                        Learn more about oral cancer risks for people
                        over 50 years.
                    </button>
                </p>
                <p>
                    Even if you're younger than 50, there are other
                    specific risk factors you need to keep an eye on.
                    <button
                        onClick={() => navigateToFaq('4')}
                        type="button"
                    >
                        Learn more about risk factors for younger
                        people.
                    </button>
                </p>
            </div>
        ),
    },
    {
        name: 'sexAtBirth',
        label: 'What is your sex at birth?',
        component: 'Radio',
        infoLabel: '[understand the connection to cancer]',
        answers: [
            {
                label: 'Female',
                value: 'Female',
            },
            {
                label: 'Male',
                value: 'Male',
            },
            {
                label: 'Other',
                value: 'Other',
            },
        ],
        tooltip: () => (
            <div>
                <div>
                    <p>
                        Did you know that oral and throat cancers are
                        more than twice as common in men compared to
                        women? To learn more about these gender
                        differences, explore additional information
                        <a
                            href="https://www.cancer.org/cancer/types/oral-cavity-and-oropharyngeal-cancer/about/key-statistics.html#:~:text=These%20cancers%20are%20more%20than,1%20in%20141%20for%20women"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {' '}
                            here
                        </a>
                        .
                    </p>
                </div>
            </div>
        ),
    },
    {
        name: 'tobacco',
        label: 'Have you ever used tobacco (includes smoking, vaping, chewing, etc)?',
        component: 'Select',
        infoLabel: '[how can I modify this risk]',
        answers: [
            {
                label: 'I have never used tobacco',
                value: 'I have never used tobacco',
            },
            {
                label: 'I currently use tobacco',
                value: 'I currently use tobacco',
            },
            {
                label: 'I used tobacco, but I quit 1-2 years ago',
                value: 'I used tobacco, but I quit 1-2 years ago',
            },
            {
                label: 'I used tobacco, but I quit 3-5 years ago',
                value: 'I used tobacco, but I quit 3-5 years ago',
            },

            {
                label: 'I used tobacco, but I quit 6-9 years ago',
                value: 'I used tobacco, but I quit 6-9 years ago',
            },
            {
                label: 'I used tobacco, but I quit 10-14 years ago',
                value: 'I used tobacco, but I quit 10-14 years ago',
            },
            {
                label: 'I used tobacco, but I quit more than 14 years ago',
                value: 'I used tobacco, but I quit more than 14 years ago',
            },
        ],
        tooltip: ({ navigateToFaq }) => (
            <div>
                <p>
                    Did you know that tobacco users face a staggering
                    1000% higher risk of oral cancer compared to those
                    who don't use tobacco?{' '}
                    <button
                        onClick={() => navigateToFaq('5')}
                        type="button"
                    >
                        See the FAQ on tobacco use for more information.
                    </button>
                </p>
            </div>
        ),
    },
    {
        name: 'drinks',
        label: 'How many alcoholic drinks per week do you consume?',
        component: 'Select',
        infoLabel: '[how can I minimize this risk]',
        answers: [
            {
                label: 'I have not consumed any in the last 12 months',
                value: 'I have not consumed any in the last 12 months',
            },
            {
                label: 'Less than 1 drink per week',
                value: 'Less than 1 drink per week',
            },
            {
                label: 'Between 1 and 3 drinks per week',
                value: 'Between 1 and 3 drinks per week',
            },
            {
                label: 'More than 3 drinks per week',
                value: 'More than 3 drinks per week',
            },
        ],
        tooltip: ({ navigateToFaq }) => (
            <div>
                <p>
                    Most people do not realize the impact alcohol has on
                    oral health. Your risk of oral cancer increases
                    substantially if you drink a few drinks a week.
                    <button
                        onClick={() => navigateToFaq('6')}
                        type="button"
                    >
                        See the FAQ on drinking to learn more.
                    </button>
                </p>
            </div>
        ),
    },
    {
        name: 'mouth',
        label: 'Do you have any white patches, lesions, or discolorations in your mouth?',
        component: 'Radio',
        infoLabel: '[how do I understand this risk]',
        answers: [
            {
                label: 'No',
                value: 'No',
            },
            {
                label: 'Yes',
                value: 'Yes',
            },
        ],
        tooltip: ({ navigateToFaq }) => (
            <div>
                <p>
                    Keep an eye on changes in your mouth! If you have
                    white or red patches, your risk of oral cancer goes
                    up a lot, especially within the first year of
                    discovering it.
                    <button
                        onClick={() => navigateToFaq('7')}
                        type="button"
                    >
                        See the FAQ on white and red patches.
                    </button>
                </p>
            </div>
        ),
    },
    {
        name: 'hpv',
        label: "Have you been told that you're infected with HPV (Human papillomavirus) types relevant to Oral or Throat cancers?",
        component: 'Radio',
        infoLabel: '[how do I understand this connection]',
        answers: [
            {
                label: 'No',
                value: 'No',
            },
            {
                label: 'Yes',
                value: 'Yes',
            },
            {
                label: "Don't know",
                value: "Don't know",
            },
        ],
        tooltip: ({ navigateToFaq }) => (
            <div>
                <p>
                    HPV is believed to be responsible for 70% of
                    oropharyngeal (oral and throat) cancers in the
                    United States.
                    <button
                        onClick={() => navigateToFaq('8')}
                        type="button"
                    >
                        See the FAQ on HPV for more information.
                    </button>
                </p>
            </div>
        ),
    },
    {
        name: 'parents',
        label: 'Have your parents, siblings, or children ever been diagnosed with Oral or Throat cancer?',
        component: 'Radio',
        infoLabel: '[how do I understand my genetics]',
        answers: [
            {
                label: 'No',
                value: 'No',
            },
            {
                label: 'Yes',
                value: 'Yes',
            },
        ],
        tooltip: () => (
            <div>
                <p>
                    Oral cancer risk may run in the family. If a close
                    family member like a parent, sibling, or child has
                    had oral cancer, your risk goes up. Learn more about
                    the connection between family history and oral
                    cancer
                    <a
                        href="https://onlinelibrary.wiley.com/doi/10.1002/ijc.23199"
                        target="_blank"
                        rel="noreferrer"
                    >
                        {' '}
                        here
                    </a>
                    .
                </p>
            </div>
        ),
    },
];

export default function RiskAssessmentWrapper({
    children,
}: {
    children: ReactNode;
}) {
    const searchParams = useSearchParams();
    const isLead = searchParams.get('isLead') === 'true';
    const dentistQuery = useDentist();
    const dentist = dentistQuery.data;
    
    const [riskPosTest, setRiskPosTest] = useState<string>('');
    const [riskNegTest, setRiskNegTest] = useState<string>('');
    const [formResults, setFormResults] = useState<React.ReactElement | null>(null);
    const [resultStatus, setResultStatus] = useState<string>('');
    const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
    const [dentistForm, setDentistForm] = useState<any>(null);
    const [faqSelectedKeys, setFaqSelectedKeys] = useState<Selection>(new Set([]));

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            sexAtBirth: '',
            age: '',
            tobacco: '',
            drinks: '',
            mouth: '',
            hpv: '',
            parents: '',
            terms: false,
        },
    });

    const navigateToFaq = (id: string) => {
        // Open the specific FAQ item
        setFaqSelectedKeys(new Set([id]));
        
        // Scroll to the FAQ section
        setTimeout(() => {
            const faqElement = document.getElementById(`faq-${id}`);
            if (faqElement) {
                faqElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    };

    const handleSendToDentist = () => {
        const dentistId = dentist?.id;

        if (!dentistId) {
            return;
        }

        const query = new URLSearchParams();

        query.append('dentistId', dentistId);
        query.append('isLead', isLead.toString());
        query.append('data', JSON.stringify(dentistForm));

        window.open(`${VDP_URL}/qr/patient?${query.toString()}`, '_blank');
    };

    const savePage = () => {
        /**
         * Download page to pdf.
         * workaround to make it work in iOS Safari, Firefox and Chrome
         */
        try {
            const isiOSFirefox = /FxiOS/i.test(navigator.userAgent);
            const isiOSChrome = /CriOS/i.test(navigator.userAgent);
            const isSupported = document.execCommand('print', false);

            if (isiOSFirefox || isiOSChrome || !isSupported) {
                window.print();
            }
        } catch {
            window.print();
        }
    };

    const ppvOneMinusNPVRisks = (prev: number) => {
        const TPR = 0.9;
        const FNR = 1 - TPR;
        const TNR = 0.95;
        const FPR = 1 - TNR;
        const oneMinusPrev = 1 - prev;
        const PT1 = TPR * prev + FPR * oneMinusPrev;
        const ppv = (TPR * prev) / PT1;
        const PT0 = TNR * (1 - prev) + FNR * prev;
        const npv = (TNR * (1 - prev)) / PT0;
        const invNpv = 1 - npv;
        const oneInXForPos = 1 / ppv;
        const oneInXForNeg = 1 / invNpv;

        return {
            oneInXForPos: Math.round(oneInXForPos).toString(),
            oneInXForNeg: Math.round(oneInXForNeg).toString(),
        };
    };

    const prevAgeSexSeer = (sexx: string, ageGrp: string) => {
        if (sexx === 'Female' && ageGrp === '<50') {
            return 0.001;
        }
        if (sexx === 'Female' && ageGrp === '50-64') {
            return 0.001;
        }
        if (sexx === 'Female' && ageGrp === '>=65') {
            return 0.003;
        }
        if (sexx === 'Male' && ageGrp === '<50') {
            return 0.001;
        }
        if (sexx === 'Male' && ageGrp === '50-64') {
            return 0.003;
        }
        if (sexx === 'Male' && ageGrp === '>=65') {
            return 0.007;
        }
        if (sexx === 'Other' && ageGrp === '<50') {
            return 0.001;
        }
        if (sexx === 'Other' && ageGrp === '50-64') {
            return 0.002;
        }
        if (sexx === 'Other' && ageGrp === '>=65') {
            return 0.005;
        }
        return 0;
    };

    const riskHpv = (hpvv: string, sexx: string) => {
        if (sexx === 'Female') {
            return hpvv === 'Yes' ? 1.007 : 0;
        }
        if (sexx === 'Male') {
            return hpvv === 'Yes' ? 1.028 : 0;
        }
        if (sexx === 'Other') {
            return hpvv === 'Yes' ? 1.0175 : 0;
        }
        return 0;
    };

    const sendRiskAssessmentEvent = (eventName: string, data: any) => {
        console.log('Analytics event:', eventName, data);
    };

    const onSubmit = (data: any) => {
        const { sexAtBirth } = data;
        const age = parseInt(data.age, 10);
        const { tobacco } = data;
        const { drinks } = data;
        const { mouth } = data;
        const { hpv } = data;
        const { parents } = data;
        
        let ageGrp: string;
        if (age < 50) {
            ageGrp = '<50';
        } else if (age >= 50 && age <= 64) {
            ageGrp = '50-64';
        } else {
            ageGrp = '>=65';
        }

        const smokingRiskDict: Record<string, number> = {
            'I have never used tobacco': 0,
            'I currently use tobacco': 8.36,
            'I used tobacco, but I quit 1-2 years ago': 6.22,
            'I used tobacco, but I quit 3-5 years ago': 4.53,
            'I used tobacco, but I quit 6-9 years ago': 3.45,
            'I used tobacco, but I quit 10-14 years ago': 1.62,
            'I used tobacco, but I quit more than 14 years ago': 1.42,
        };
        const drinkingRiskDict: Record<string, number> = {
            'I have not consumed any in the last 12 months': 0,
            'Less than 1 drink per week': 1.13,
            'Between 1 and 3 drinks per week': 1.83,
            'More than 3 drinks per week': 5,
        };
        const leukoRiskDict: Record<string, number> = { No: 0, Yes: 1.033 };
        const familyHistoryRiskDict: Record<string, number> = { No: 0, Yes: 3 };
        
        const smokingRisk = smokingRiskDict[tobacco];
        const drinkingRisk = drinkingRiskDict[drinks];
        const leukoRisk = leukoRiskDict[mouth];
        const familyHistoryRisk = familyHistoryRiskDict[parents];
        
        const prevSexAge = prevAgeSexSeer(sexAtBirth, ageGrp);
        const hpvRisk = riskHpv(hpv, sexAtBirth);
        const allRisks =
            drinkingRisk +
            smokingRisk +
            leukoRisk +
            familyHistoryRisk +
            hpvRisk;

        let prevOverall: number;
        if (allRisks === 0) {
            prevOverall = prevSexAge;
        } else {
            prevOverall = prevSexAge * allRisks;
        }

        let oneInPpos = 1 / prevOverall;
        oneInPpos = Math.round(oneInPpos);

        let riskCateText: React.ReactElement;
        let status = '';
        if (oneInPpos < 150) {
            status = 'High';
            riskCateText = (
                <div className="typography-headline3">
                    Your overall quantitative risk for Oral and/or Throat
                    Cancer is 1 out of {oneInPpos} people. With this{' '}
                    <span className="text-red-600">HIGH</span> risk level,
                    we strongly recommend additional screening with
                    CancerDetect saliva testing and a follow-up with your
                    healthcare provider.
                </div>
            );
        } else if (oneInPpos >= 150 && oneInPpos <= 500) {
            status = 'Moderate';
            riskCateText = (
                <div className="typography-headline3">
                    Your overall quantitative risk for Oral and/or Throat
                    Cancer is 1 out of {oneInPpos} people. With this{' '}
                    <span className="text-orange-600">moderate</span> risk
                    level, we recommend additional screening with
                    CancerDetect saliva testing and a discussion with your
                    healthcare provider.
                </div>
            );
        } else {
            status = 'Low';
            riskCateText = (
                <div className="typography-headline3">
                    Your overall quantitative risk for Oral and/or Throat
                    Cancer is 1 out of {oneInPpos} people. You have a
                    relatively <span className="text-green-600">low</span>{' '}
                    risk level. Please talk to your healthcare provider and
                    you may consider testing based on your personal
                    preferences.
                </div>
            );
        }

        const result = ppvOneMinusNPVRisks(prevOverall);

        setRiskPosTest(result.oneInXForPos);
        setRiskNegTest(result.oneInXForNeg);
        const calculationResults = riskCateText;
        setFormResults(calculationResults);
        setResultStatus(status);
        setIsFormSubmitted(true);
        
        setTimeout(() => {
            const resultsElement = document.getElementById('results-content');
            if (resultsElement) {
                window.scrollTo(0, resultsElement.offsetTop);
            }
        }, 100);

        setDentistForm({
            sexAtBirth: data.sexAtBirth,
            age,
            tobacco: data.tobacco,
            drinks: data.drinks,
            mouth: data.mouth,
            hpv: data.hpv,
            parents: data.parents,
            smokingRisk,
            drinkingRisk,
            leukoRisk,
            familyHistoryRisk,
            prevSexAge,
            hpvRisk,
            allRisks,
            prevOverall,
            oneInPpos,
            result,
        });

        sendRiskAssessmentEvent('calculate_risk_assessment', {
            ...dentistForm,
        });
    };

    return (
        <div className="m-auto max-w-[46rem] !font-light light py-4">
            {children}

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-start px-10 pb-16"
            >
                <div className="flex flex-col">
                    <div className="mb-10">
                        <div className="font-TWKLausanne pb-4 text-[2.5rem]">
                            Oral and Throat Cancer Questionnaire
                        </div>

                        <div className="font-TWKLausanne pb-2">
                            Please complete the assessment below
                        </div>

                        <div>
                            Click on the text between [] for more
                            information on each question
                        </div>
                    </div>

                    {questions.map((question) => {
                        const RenderComponent = ({
                            onChange,
                            value,
                        }: {
                            onChange: any;
                            value: any;
                        }) => {
                            const fieldId = `field-${question.name}`;
                            let componentToRender;
                            switch (question.component) {
                                case 'Input':
                                    componentToRender = (
                                        <div>
                                            <Input
                                                id={fieldId}
                                                size="sm"
                                                onValueChange={onChange}
                                                color="default"
                                                value={value}
                                                type="number"
                                                classNames={{
                                                    input: "border-none focus:outline-none",
                                                    inputWrapper: "border border-black rounded-none bg-white hover:bg-[rgb(252,252,252)] focus-within:outline-none focus-within:ring-0",
                                                }}
                                            />
                                        </div>
                                    );
                                    break;

                                case 'Radio':
                                    componentToRender = (
                                        <div>
                                            <RadioGroup
                                                id={fieldId}
                                                orientation="horizontal"
                                                onChange={onChange}
                                                value={value}
                                                color="default"
                                                classNames={{
                                                    wrapper: "[&_*]:focus:outline-none [&_*]:focus-visible:outline-none gap-0",
                                                    base: "gap-0",
                                                }}
                                            >
                                                {(question.answers ?? []).map(
                                                    (answer) => (
                                                        <Radio
                                                            key={
                                                                answer.value
                                                            }
                                                            value={
                                                                answer.value
                                                            }
                                                            classNames={{
                                                                base: "focus:outline-none focus-visible:outline-none",
                                                                wrapper: "focus:outline-none focus-visible:outline-none",
                                                            }}
                                                        >
                                                            {answer.label}
                                                        </Radio>
                                                    ),
                                                )}
                                            </RadioGroup>
                                        </div>
                                    );
                                    break;

                                case 'Select':
                                    componentToRender = (
                                        <div>
                                            <Select
                                                id={fieldId}
                                                placeholder="-- Select an option --"
                                                onChange={onChange}
                                                selectedKeys={
                                                    value ? [value] : []
                                                }
                                                classNames={{
                                                    trigger: "border border-black rounded-none bg-white hover:bg-[rgb(252,252,252)] focus:outline-none focus-within:outline-none relative",
                                                    popoverContent: "bg-white shadow-xl border border-gray-200",
                                                    listbox: "bg-white",
                                                    selectorIcon: "!absolute !right-3",
                                                }}
                                            >
                                                {(question.answers ?? []).map(
                                                    (answer) => (
                                                        <SelectItem
                                                            key={
                                                                answer.value
                                                            }
                                                            value={
                                                                answer.value
                                                            }
                                                            textValue={
                                                                answer.label
                                                            }
                                                        >
                                                            <div className="mr-10 whitespace-break-spaces">
                                                                {
                                                                    answer.label
                                                                }
                                                            </div>
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </Select>
                                        </div>
                                    );
                                    break;

                                default:
                                    componentToRender = <div />;
                            }
                            return componentToRender;
                        };

                        return (
                            <div key={question.name}>
                                <div className="mb-10">
                                    <label 
                                        className="mb-2 flex flex-col items-start gap-1 md:flex-row md:gap-2"
                                        htmlFor={`field-${question.name}`}
                                    >
                                        <div>
                                            <strong className="font-TWKLausanne text-[1.2rem] font-light leading-6 break-words">
                                                {question.label}
                                            </strong>
                                        </div>
                                        <div className="relative">
                                            <Popover
                                                placement="top-end"
                                                classNames={{
                                                    content: "bg-white text-black text-[0.8em] shadow-lg border border-gray-200",
                                                }}
                                            >
                                                <PopoverTrigger>
                                                    <span className="cursor-pointer whitespace-nowrap text-sm text-gray-500">
                                                        {question.infoLabel}
                                                    </span>
                                                </PopoverTrigger>
                                                <PopoverContent className="max-w-md bg-white shadow-xl">
                                                    <div className="px-4 py-3 text-xl [&_a]:text-blue-600 [&_button]:p-0 [&_button]:border-none [&_button]:bg-transparent [&_button]:text-blue-600 [&_button]:cursor-pointer [&_button]:underline [&_p]:mb-[10px] [&_p]:font-TWKLausanne [&_p]:indent-5">
                                                        <div className="text-sm">
                                                            {question.tooltip(
                                                                {
                                                                    navigateToFaq,
                                                                },
                                                            )}
                                                        </div>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </label>
                                    <Controller
                                        name={question.name as any}
                                        control={control}
                                        rules={{ 
                                            required: 'This field is required',
                                            ...(question.component === 'Input' && {
                                                validate: (value: any) => {
                                                    const num = Number(value);
                                                    return (num >= 18 && num <= 120) || 'Value must be between 18 and 120';
                                                }
                                            })
                                        }}
                                        render={({
                                            field: {
                                                onChange,
                                                value,
                                            },
                                        }) => (
                                            <RenderComponent
                                                onChange={onChange}
                                                value={value}
                                            />
                                        )}
                                    />
                                    {errors[question.name as keyof typeof errors] && (
                                        <div className="text-red-500">
                                            {errors[question.name as keyof typeof errors]?.message
                                                ? String(errors[question.name as keyof typeof errors]?.message)
                                                : 'This field is required'}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mb-6 flex items-center">
                    <Button
                        type="submit"
                        color="warning"
                        className="border border-[hsl(0deg_0%_80%)] rounded-none bg-black text-white font-TWKLausanne text-base px-6 py-2 hover:bg-[hsl(0deg_0%_12%)]"
                    >
                        Calculate my quantitative risk
                    </Button>
                </div>

                <div className="text-base text-gray-600">
                    Please note: The purpose of this assessment is to
                    calculate your personal quantitative risk level and
                    compare it to the general population, where the
                    prevalence of oral and throat cancers is approximately 1
                    in 1000 people.
                </div>
            </form>

            {isFormSubmitted && formResults && (
                <div id="results-content">
                    <div
                        className={classNames(
                            "bg-gradient-to-br from-10% via-30% to-white to-90% px-10 py-16",
                            {
                                'from-red-100 via-red-50': resultStatus === 'High',
                                'from-yellow-100 via-yellow-50': resultStatus === 'Moderate',
                                'from-green-100 via-green-50': resultStatus === 'Low',
                            }
                        )}
                    >
                        <p className="typography-paragraph1 mb-4">
                            Your overall quantitative risk level for Oral and/or Throat Cancer is
                        </p>
                        <h2
                            className={classNames(
                                'typography-display2 mb-4',
                                {
                                    'text-red-600': resultStatus === 'High',
                                    'text-yellow-600': resultStatus === 'Moderate',
                                    'text-green-600': resultStatus === 'Low',
                                }
                            )}
                        >
                            {resultStatus}
                        </h2>
                        <div className="text-lg mb-6">
                            {formResults}
                            <p className="typography-headline3 mt-3">Once you obtain the CancerDetect saliva test, we can provide you with a more accurate personal risk assessment.</p>
                        </div>

                        <div className="mb-4 text-lg">
                            <span>
                                Please see the{' '}
                                <button
                                    className="font-inherit cursor-pointer border-none bg-none p-0 text-blue-500 underline outline-none"
                                    onClick={() => navigateToFaq('2')}
                                    type="button"
                                >
                                    FAQ about the risk levels
                                </button>{' '}
                                for more information. If you are a
                                generally healthy person 50 years or
                                older,{' '}
                                <button
                                    className="font-inherit cursor-pointer border-none bg-none p-0 text-blue-500 underline outline-none"
                                    onClick={() => navigateToFaq('3')}
                                    type="button"
                                >
                                    please see the following FAQ
                                </button>
                                . Please also see the FAQs for other
                                risk factors such as{' '}
                                <button
                                    className="font-inherit cursor-pointer border-none bg-none p-0 text-blue-500 underline outline-none"
                                    onClick={() => navigateToFaq('5')}
                                    type="button"
                                >
                                    tobacco use
                                </button>
                                ,{' '}
                                <button
                                    className="font-inherit cursor-pointer border-none bg-none p-0 text-blue-500 underline outline-none"
                                    onClick={() => navigateToFaq('6')}
                                    type="button"
                                >
                                    {' '}
                                    alcohol consumption
                                </button>
                                ,{' '}
                                <button
                                    className="font-inherit cursor-pointer border-none bg-none p-0 text-blue-500 underline outline-none"
                                    onClick={() => navigateToFaq('7')}
                                    type="button"
                                >
                                    {' '}
                                    pre-malignant lesions
                                </button>
                                , and{' '}
                                <button
                                    className="font-inherit cursor-pointer border-none bg-none p-0 text-blue-500 underline outline-none"
                                    onClick={() => navigateToFaq('8')}
                                    type="button"
                                >
                                    {' '}
                                    HPV infection
                                </button>
                                .
                            </span>
                        </div>

                        <div className="mt-6 flex w-full flex-col gap-4 md:flex-row">
                            {dentist?.id && (
                                <Button
                                    type="button"
                                    onPress={handleSendToDentist}
                                    color="warning"
                                    className="border border-[hsl(0deg_0%_80%)] rounded-none bg-black text-white font-TWKLausanne text-base px-6 py-2 hover:bg-[hsl(0deg_0%_12%)]"
                                >
                                    {isLead ? 'Find a Dentist' : 'Register with dentist'}
                                </Button>
                            )}

                            <Button
                                type="button"
                                onPress={savePage}
                                color="warning"
                                className="border border-[hsl(0deg_0%_80%)] rounded-none bg-black text-white font-TWKLausanne text-base px-6 py-2 hover:bg-[hsl(0deg_0%_12%)]"
                            >
                                Save for myself
                            </Button>
                        </div>

                        <div className="mt-8">
                            <hr className="border-t border-gray-300 mb-8" />

                            <div className="mb-8 flex items-start gap-6">
                                <div className="flex-shrink-0">
                                    <PositiveIcon />
                                </div>

                                <div>
                                    <div className="mb-6 text-3xl">
                                        If your test is{' '}
                                        <span className="text-red-500">
                                            positive
                                        </span>
                                    </div>

                                    <div>
                                        1 out of {riskPosTest} people
                                        with your risk factors develop
                                        Oral and/or Throat Cancer over
                                        the course of their lifetimes.
                                        We strongly recommend you to
                                        speak to your healthcare
                                        provider.
                                    </div>
                                </div>
                            </div>

                            <hr className="border-t border-gray-300 my-8" />

                            <div className="mb-8 flex items-start gap-6">
                                <div className="flex-shrink-0">
                                    <NegativeIcon />
                                </div>

                                <div>
                                    <div className="mb-6 text-3xl">
                                        If your test is{' '}
                                        <span className="text-green-500">
                                            negative
                                        </span>
                                    </div>

                                    <div className="mb-6">
                                        1 out of {riskNegTest} people
                                        with your risk factors develop
                                        Oral and/or Throat Cancer over
                                        the course of their lifetimes.
                                    </div>

                                    <div>
                                        We will only know your precise
                                        risk profile after you take the
                                        test!
                                    </div>
                                </div>
                            </div>

                            <hr className="border-t border-gray-300 mt-8" />
                        </div>
                    </div>
                </div>
            )}
            
            <RiskAssessmentFaqs 
                selectedKeys={faqSelectedKeys}
                setSelectedKeys={setFaqSelectedKeys}
            />
            
            <div className="bg-[#F4F4F5] px-10">
                <hr className="border-t-3"/>

                <div className="flex flex-col items-start">
                    <div>
                        <div className="font-TWKLausanne py-10 text-center text-[2.5rem] font-light">
                            Legal disclaimer
                        </div>
                        <p className="mb-8">
                            The information in this website is a best effort
                            as a public health initiative based on available
                            literature and relevant epidemiological data.
                            This is not intended to be comprehensive.
                            Specifically, a determination of a lower
                            quantitative risk level according to this
                            website does not preclude the presence of other
                            unknown risk factors. A recommendation of
                            salivary molecular testing is intended for
                            further detection of biomarkers and potential
                            follow-up. Use of the information and
                            recommendations in this website are at the
                            discretion of individuals, and the creators bear
                            no responsibility for misuse.
                        </p>
                    </div>

                    <hr className="border-t-3" />

                    <div className="pb-10">
                        <div className="font-TWKLausanne py-10 text-center text-[2.5rem] font-light">
                            References
                        </div>
                        <ol className="list-none space-y-4">
                            <li>
                                1. Banavar, G., Ogundijo, O., Julian, C.,
                                Toma, R., Camacho, F., Torres, P.J., Hu, L.,
                                Chandra, T., Piscitello, A., Kenny, L. and
                                Vasani, S., 2023. Detecting salivary host
                                and microbiome RNA signature for aiding
                                diagnosis of oral and throat cancer.{' '}
                                <i>Oral Oncology</i>, 145, p.106480.
                            </li>
                            <li>
                                2. National Cancer Institute Surveillance,
                                Epidemiology and End Results Program; 2021.{' '}
                                <i>
                                    Cancer Stat Facts: Oral Cavity and
                                    Pharynx Cancer
                                </i>
                                .
                            </li>
                            <li>
                                3. ACS, 2024.{' '}
                                <i>
                                    Key Statistics for Oral Cavity and
                                    Oropharyngeal Cancers
                                </i>
                                .
                            </li>
                            <li>
                                4. CDC, 2022. <i>HPV Fact Sheet</i>.
                            </li>
                            <li>
                                5. La Vecchia, C., Franceschi, S., Bosetti,
                                C., Levi, F., Talamini, R. and Negri, E.,
                                1999. Time since stopping smoking and the
                                risk of oral and pharyngeal cancers.{' '}
                                <i>
                                    Journal of the National Cancer Institute
                                </i>
                                , 91(8), pp.726a-728.
                            </li>
                            <li>
                                6. Ghasemiesfe, M., Barrow, B., Leonard, S.,
                                Keyhani, S. and Korenstein, D., 2019.
                                Association between marijuana use and risk
                                of cancer: a systematic review and
                                meta-analysis. <i>JAMA network open</i>,
                                2(11), pp.e1916318-e1916318.
                            </li>
                            <li>
                                7. US Department of Health and Human
                                Services. 2004.{' '}
                                <i>
                                    The Health Consequences of Smoking: A
                                    Report of the Surgeon General
                                </i>
                                . Atlanta: U.S. Department of Health and
                                Human Services, Centers for Disease Control
                                and Prevention, National Center for Chronic
                                Disease Prevention and Health Promotion,
                                Office on Smoking and Health.
                            </li>
                            <li>
                                8. Bagnardi, V., Rota, M., Botteri, E.,
                                Tramacere, I., Islami, F., Fedirko, V.,
                                Scotti, L., Jenab, M., Turati, F., Pasquali,
                                E. and Pelucchi, C., 2015. Alcohol
                                consumption and site-specific cancer risk: a
                                comprehensive dose–response meta-analysis.{' '}
                                <i>British journal of cancer</i>, 112(3),
                                pp.580-593.
                            </li>
                            <li>
                                9. Chaturvedi, A.K., Udaltsova, N., Engels,
                                E.A., Katzel, J.A., Yanik, E.L., Katki,
                                H.A., Lingen, M.W. and Silverberg, M.J.,
                                2020. Oral leukoplakia and risk of
                                progression to oral cancer: a
                                population-based cohort study.{' '}
                                <i>
                                    JNCI: Journal of the National Cancer
                                    Institute
                                </i>
                                , 112(10), pp.1047-1054.
                            </li>
                            <li>
                                10. Gupta, S. and Kaur Jawanda, M., 2015.
                                Oral Lichen Planus: An Update on Etiology,
                                Pathogenesis, Clinical Presentation,
                                Diagnosis and Management.{' '}
                                <i>Indian Journal of Dermatology</i>, 60(3):
                                222–229.
                            </li>
                            <li>
                                11. CDC, 2023. <i>HPV and Cancer</i>.
                            </li>
                            <li>
                                12. Garavello, W., Foschi, R., Talamini, R.,
                                La Vecchia, C., Rossi, M., Dal Maso, L.,
                                Tavani, A., Levi, F., Barzan, L.,
                                Ramazzotti, V. and Franceschi, S., 2008.
                                Family history and the risk of oral and
                                pharyngeal cancer.{' '}
                                <i>International journal of cancer</i>,
                                122(8), pp.1827-1831.
                            </li>
                            <li>
                                13. D' Souza, G., McNeel, T.S. and Fakhry,
                                C., 2017. Understanding personal risk of
                                oropharyngeal cancer: risk-groups for
                                oncogenic oral HPV infection and
                                oropharyngeal cancer.{' '}
                                <i>Annals of Oncology</i>, 28(12),
                                pp.3065-3069.
                            </li>
                            <li>
                                14. National Institutes of Health, 2018.{' '}
                                <i>
                                    Oral cancer incidence (new cases) by
                                    age, race, and gender
                                </i>
                                .
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}

