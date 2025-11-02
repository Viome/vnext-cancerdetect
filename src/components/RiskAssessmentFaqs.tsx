import {
    Accordion,
    AccordionItem,
    Card,
    CardBody,
    Tab,
    Tabs,
} from '@nextui-org/react';
import type { Selection } from '@nextui-org/react';
import Link from 'next/link';

interface RiskAssessmentFaqsProps {
    selectedKeys: Selection;
    setSelectedKeys: (keys: Selection) => void;
}

const ChevronDownIcon = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-200"
    >
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);

export default function RiskAssessmentFaqs({
    selectedKeys,
    setSelectedKeys,
}: RiskAssessmentFaqsProps) {
    const faqs = [
        {
            title: 'What is the overall purpose of this AI-driven questionnaire?',
            content: (
                <div>
                    As health providers, nothing is more important to us
                    than to have you avoid cancer. As thought leaders in
                    dentistry, this assessment questionnaire is an
                    artificial intelligence (Bayesian modeling) driven risk
                    assessment instrument to determine your personal risk of
                    oral and throat cancer, based on your individual
                    demographic and clinical characteristics. Using the
                    information you provide, this algorithm will determine
                    whether a state-of-the-art molecular saliva test called
                    CancerDetect is recommended. We also show you the more
                    precise personal risk assessment you obtain if you
                    proceed with the recommended Viome CancerDetect
                    <sup>®</sup> test.
                </div>
            ),
        },
        {
            title: 'What is the prevalence of oral and throat cancer?',
            content: (
                <div>
                    According to the American Cancer Society, more than
                    54,000 new oral and throat cancer cases are diagnosed
                    yearly in the US. Unfortunately, early detection
                    technology was limited in the past, resulting in only
                    28% of patients receiving an early diagnosis. This is a
                    significant concern, given that those diagnosed in the
                    early stages have a 44% higher survival rate than those
                    diagnosed in the late stages. About 11.5 adults per
                    100,000 will develop oral cancer, but the prevalence of
                    oral cancers is expected to increase by almost
                    two-thirds by 2035. Unfortunately, current early
                    detection methods are limited, resulting in significant
                    morbidity and mortality, as most people are asymptomatic
                    and diagnosed in the late stages of the disease.
                    However, with new technology emerging, we can now detect
                    oral and throat cancer earlier than ever before, which
                    can help prevent the disease from progressing to a late
                    stage.
                </div>
            ),
        },
        {
            title: 'What does my risk level mean? What should I do?',
            content: (
                <div>
                    <ul>
                        <li>
                            If your risk is determined to be{' '}
                            <span className="text-green-600">LOW</span> (1
                            in more than 500), this means you have a reduced
                            likelihood to develop oral or throat cancer. In
                            this case, salivary testing is generally not
                            recommended. However, you may still consider
                            talking to your healthcare provider to pursue
                            testing based on your personal preferences.
                        </li>

                        <li>
                            If your risk is determined to be{' '}
                            <span className="text-orange-600">
                                MODERATE
                            </span>{' '}
                            (1 in 200 to 500), our recommendation is to take
                            advantage of a simple salivary test to get a
                            more precise risk determination. With this
                            moderate risk level, we recommend CancerDetect
                            saliva testing and a discussion with your
                            healthcare provider.
                        </li>

                        <li>
                            If your risk is determined to be{' '}
                            <span className="text-red-600">HIGH</span> (1 in
                            less than 200), our strong recommendation is to
                            take the salivary test below ASAP and discuss
                            with your healthcare provider. With this HIGH
                            risk level, we strongly recommend CancerDetect
                            saliva testing and a follow-up with your
                            healthcare provider.
                        </li>
                    </ul>
                </div>
            ),
        },
        {
            title: "I'm a healthy person over 50 years - why am I getting a moderate or high risk?",
            content: (
                <div>
                    <p>
                        It is important to understand that increasing age
                        alone is an important risk factor even if there are
                        no other risk factors. The NIH states that the
                        increase in incidence becomes more rapid after age
                        50, particularly for adults aged 65 years and older
                        (based on the Surveillance, Epidemiology, and End
                        Results (SEER) program). The American Cancer Society
                        identifies age as a risk factor, and states that
                        most patients with these cancers are older than 55
                        when the cancers are first found. Accordingly, oral
                        cancer screening is recommended for early detection
                        in people over 50 years of age.
                    </p>
                    <p>
                        The situation with oral and throat cancer is similar
                        to the higher incidence of Colorectal cancer for
                        adults over 45 years, for whom the American Cancer
                        Society recommends regular screening starting at age
                        45.
                    </p>
                </div>
            ),
        },
        {
            title: 'As a young person, what are my risks of Oral and Throat Cancer?',
            content: (
                <div>
                    <p>
                        Regardless of your age, the risk factors for oral
                        and throat cancer include tobacco use, consuming
                        alcoholic drinks, and HPV infection.
                    </p>
                    <p>
                        Tobacco use in all its forms such as vaping, tobacco
                        pouches, and use of other tobacco products increase
                        your risk of oral and throat cancer. See the FAQ on
                        tobacco use for more information.
                    </p>
                    <p>
                        Consuming alcoholic drinks also increases your risk
                        – consuming moderately, up to four drinks a week,
                        can increase your risk substantially, and heavy
                        drinking increases your risk by a lot. See the FAQ
                        on alcoholic drinks for more information.
                    </p>
                    <p>
                        Another risk factor is HPV infection. HPV is
                        believed to be responsible for 70% of oropharyngeal
                        (oral and throat) cancers in the United States. See
                        the FAQ on HPV infection for more information.
                    </p>
                </div>
            ),
        },
        {
            title: 'I currently smoke or use tobacco products, or I stopped some time ago — should I get tested?',
            content: (
                <div>
                    <p>
                        Yes, it is generally recommended that you get
                        tested. Tobacco users face a staggering 1000% higher
                        risk of oral cancer compared to those who don't use
                        tobacco. The surgeon general's report concluded that
                        the evidence is sufficient to infer a causal
                        relationship between smoking and oral, and throat
                        cancer.
                        <a
                            href="https://www.ncbi.nlm.nih.gov/books/NBK53010/#:~:text=The%202004%20Surgeon%20General%27s%20report,oral%20cavity%2C%20pharynx%2C%20esophagus%2C"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 underline hover:text-blue-700"
                        >
                            {' '}
                            Learn more here.
                        </a>
                    </p>
                    <p>
                        Tobacco use includes smoking, vaping, sucking,
                        chewing or snuffing any tobacco product, including
                        cigarettes, cigars, and any product entirely or
                        partly made of leaf tobacco as raw material.
                    </p>
                    <p>
                        About smoking marijuana (cannabis, weed, or pot).
                        With the evidence we have today, the risk of smoking
                        weed for oral and throat cancer
                        <a
                            href="https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2755855"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 underline hover:text-blue-700"
                        >
                            {' '}
                            is as yet inconclusive
                        </a>
                        . However, marijuana smoke contains many of the same
                        cancer-causing substances as tobacco smoke. And
                        people who smoke marijuana tend to inhale more smoke
                        per puff and hold it in their lungs for longer than
                        people who smoke tobacco cigarettes.
                    </p>
                    <p>
                        The good news is, if you quit smoking, the risk goes
                        down over time. For example, your risk of cancer
                        drops by almost 50% after quitting for 6-9 years.
                        <a
                            href="https://academic.oup.com/jnci/article/91/8/726a/2519464?login=false"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 underline hover:text-blue-700"
                        >
                            {' '}
                            Learn more about the positive impact of quitting
                            here
                        </a>
                        , and tools and resources for quitting smoking.
                    </p>
                </div>
            ),
        },
        {
            title: 'Does consuming alcoholic beverages have an impact on my risk of oral or throat cancer?',
            content: (
                <div>
                    <a
                        href="https://www.nature.com/articles/bjc2014579"
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 underline hover:text-blue-700"
                    >
                        There is clear evidence{' '}
                    </a>
                    that alcohol consumption is a risk factor for oral and
                    throat cancer, and other cancers as well. Even if you
                    have less than one drink a week, your risk of oral
                    cancer goes up by 13%. If you drink moderately (up to
                    four drinks a week), the risk spikes to 83%. Heavy
                    drinkers with more than four drinks a week face a
                    whopping 500% higher risk.
                </div>
            ),
        },
        {
            title: 'Do white or red lesions, or other pre-malignancies, in my mouth affect my risk of oral cancer?',
            content: (
                <div>
                    <div className="pb-5">
                        There are many types of white and red patches.
                        Please click on the tabs below to learn about each
                        type.
                    </div>
                    <div className="flex w-full flex-col text-sm overflow-x-auto">
                        <Tabs 
                            size="sm" 
                            aria-label="Options"
                            classNames={{
                                base: "",
                                tabList: "overflow-x-auto overflow-y-hidden flex-nowrap gap-0",
                                tab: "flex-shrink-0 px-2 py-1.5 min-w-0 w-auto",
                            }}
                        >
                            <Tab key="leukoplakia" title="Leukoplakia">
                                <Card>
                                    <CardBody>
                                        <div className="flex">
                                            <div>
                                                A white patch that was not
                                                caused by injury from
                                                accidental biting, lip
                                                biting or sucking, or by
                                                hand-held implements (e.g.
                                                toothpick, pencil, tooth
                                                brush). The prevalence of
                                                leukoplakia in the
                                                population is 4.1%, and the
                                                risk of progression to oral
                                                cancer in the next 5 years
                                                is 3.3%.
                                            </div>
                                            <div className="flex items-center">
                                                <img
                                                    src="https://strapi.azure.viome.com/viome-strapi/uploads/imgi_1_leukoplakia_44251d20da.webp"
                                                    alt="leukoplakia"
                                                />
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Tab>
                            <Tab key="erythroplakia" title="Erythroplakia">
                                <Card>
                                    <CardBody>
                                        <div className="flex">
                                            <div>
                                                A red pebbly, granular
                                                plaque or patch on the
                                                tongue, inner cheeks or
                                                floor of the mouth.
                                                Prevalence of erythroplakia
                                                varies between 0.02% and
                                                0.83%, but the
                                                transformation rate to oral
                                                cancer is very high, varying
                                                from 14% to 50% depending on
                                                other risk factors.
                                            </div>
                                            <div className="flex items-center">
                                                <img
                                                    src="https://strapi.azure.viome.com/viome-strapi/uploads/imgi_1_erythroplakia_35594b4ddb.webp"
                                                    alt="erythroplakia"
                                                />
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Tab>
                            <Tab
                                key="submucousFibrosis"
                                title="Submucous Fibrosis"
                            >
                                <Card>
                                    <CardBody>
                                        <div className="flex">
                                            <div>
                                                A chronic disease
                                                characterized by
                                                inflammation and progressive
                                                fibrosis of the submucosal
                                                tissues resulting in marked
                                                rigidity and muscle spasms
                                                on your jaw. It is generally
                                                characterised by patients
                                                reporting a burning
                                                sensation of the oral mucosa
                                                and intolerance to spicy
                                                foods. Oral submucous
                                                fibrosis is the most
                                                prevalent oral potentially
                                                malignant disorder with a 5%
                                                prevalence in the general
                                                population. The risk of
                                                malignant transformation is
                                                6.2%.
                                            </div>
                                            <div className="flex items-center">
                                                <img
                                                    src="https://strapi.azure.viome.com/viome-strapi/uploads/imgi_1_oralsubmucousfibrosis_92c0adea11.webp"
                                                    alt="Oral submucous
                                                fibrosis"
                                                />
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Tab>
                            <Tab key="lichenPlanus" title="Lichen Planus">
                                <Card>
                                    <CardBody>
                                        <div className="flex">
                                            <div>
                                                Bilateral white reticular
                                                patches affecting the buccal
                                                mucosa, tongue, and
                                                gingivae. More severe
                                                presentations include
                                                erosions/ areas of atrophy
                                                and ulceration. The
                                                prevalence of oral lichen
                                                planus varies from 0.1 to 4
                                                %. Approximately 1.1% of
                                                these lesions progress into
                                                oral cancer, but that number
                                                increases up to 10% in
                                                smokers, alcohol users, and
                                                in those infected with
                                                hepatitis C virus.
                                            </div>
                                            <div className="items-center">
                                                <img
                                                    src="https://strapi.azure.viome.com/viome-strapi/uploads/imgi_1_orallichenplanus_9b6af0479a.webp"
                                                    alt="Lichen Planus"
                                                />
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Tab>
                            <Tab
                                key="actinicKeratosis"
                                title="Actinic Keratosis"
                            >
                                <Card>
                                    <CardBody>
                                        <div className="flex">
                                            <div>
                                                A rough, scaly patch on the
                                                skin that develops from
                                                years of sun exposure,
                                                predominantly found in the
                                                lips. With a prevalence of
                                                2.1%, the risk of
                                                transformation into oral
                                                squamous cell carcinoma is
                                                the major concern. Data
                                                about the risk of
                                                transformation of a single
                                                actinic keratosis to oral
                                                cancer ranges from 0.1% to
                                                16%.
                                            </div>
                                            <div className="flex items-center">
                                                <img
                                                    src="https://strapi.azure.viome.com/viome-strapi/uploads/imgi_1_actinickeratosis_6d7dea2574.webp"
                                                    alt="actinic keratosis"
                                                />
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Tab>
                            <Tab
                                key="lichenoidLesions"
                                title="Lichenoid Lesions"
                            >
                                <Card>
                                    <CardBody>
                                        <div className="flex">
                                            <div>
                                                Inflammatory disease
                                                characterized as dotted
                                                grey-white streaks,
                                                reticulated and plaque-like
                                                keratotic papules,
                                                accompanied by mucosal
                                                congestion, erosion,
                                                ulceration, atrophy and
                                                blistering. They can occur
                                                as a consequence of dental
                                                restorative material or
                                                effect of any drug or
                                                medication. The prevalence
                                                in the general population is
                                                not clear, but malignant
                                                transformation rate is 2.1%.
                                            </div>
                                            <div className="flex items-center">
                                                <img
                                                    src="https://strapi.azure.viome.com/viome-strapi/uploads/imgi_1_orallichenoidlesions_5796d4806c.webp"
                                                    alt="Lichenoid Lesions"
                                                />
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            ),
        },
        {
            title: 'What is the connection between HPV infection and oral or throat cancer?',
            content: (
                <div>
                    Human Papillomavirus (HPV) is the most common sexually
                    transmitted infection in the United States. HPV can
                    infect the mouth and throat and cause cancer. There are
                    more than a 100 subtypes, but the ones that are relevant
                    to oral & throat cancer include HPV6, HPV11, HPV16,
                    HPV18, HPV31, HPV33, and HPV35 variants. Also, your
                    dentist may be able to identify intra-oral papillomas.
                    To dive deeper into the connection between HPV and these
                    cancers,
                    <a
                        href="https://www.cdc.gov/cancer/hpv/basic_info/hpv_oropharyngeal.htm"
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 underline hover:text-blue-700"
                    >
                        {' '}
                        you can learn more here.
                    </a>
                </div>
            ),
        },
        {
            title: 'What should I do if I have Oral pain, difficulty in swallowing, or lumps in my neck?',
            content: (
                <div>
                    Symptoms of oral and throat cancer can include
                    difficulty swallowing, persistent pain in the ear, and a
                    lump on the throat or neck. Talk to your healthcare
                    provider for a complete clinical examination and
                    follow-up.
                </div>
            ),
        },
        {
            title: "What is the Viome's Oral Health Pro with CancerDetect test?",
            content: (
                <div>
                    <a
                        href="https://www.viomepro.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 underline hover:text-blue-700"
                    >
                        Viome's Oral Health Pro with CancerDetect{' '}
                    </a>
                    test is a simple and revolutionary saliva-based cancer
                    biomarker detection test that has been granted FDA
                    breakthrough designation for accelerated review. This
                    screening test is intended as a diagnostic aid for
                    clinicians suspecting oral squamous cell cancer and
                    oropharyngeal squamous cell carcinoma, who may benefit
                    from follow-up early diagnosis and treatment. It is not
                    intended to provide a definitive diagnosis. Please note
                    that based on your personal risk factors and your
                    consent, only a licensed healthcare provider can order
                    the CancerDetect<sup>®</sup> saliva testing.
                </div>
            ),
        },
        {
            title: "What is the cost of testing using Viome's CancerDetect?",
            content: (
                <div>
                    The current price of testing using Viome's CancerDetect
                    is $299. Viome has partnered with TrueMed to allow you
                    to use your Health Savings Account (HSA) or Flexible
                    Spending Account (FSA) pre-tax dollars when you check
                    out at Viome (a savings of up to 40%!)—no extra fee
                    required.{' '}
                    <a
                        href="https://www.viome.com/true-med"
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 underline hover:text-blue-700"
                    >
                        Please click here to find more information
                    </a>
                    . HSAs and FSAs were created for you to spend
                    tax-advantaged dollars on products and services that can
                    treat or prevent medical conditions.
                </div>
            ),
        },
        {
            title: 'What does it mean if I test negative or "NOT DETECTED"?',
            content: (
                <div>
                    A result of "NOT DETECTED" does not eliminate the
                    possibility that a cancer is present or will occur in
                    the future. Individuals who receive a "NOT DETECTED"
                    result should continue with all recommended cancer
                    screening options at intervals appropriate for the
                    individual. The use of the CancerDetect test should not
                    replace, supersede, or otherwise alter the use or
                    frequency of standard of care cancer screening or
                    detection modalities. False-negative (a cancer signal
                    not detected when cancer is present) test results do
                    occur.
                </div>
            ),
        },
        {
            title: 'What does it mean if I test positive or "DETECTED"?',
            content: (
                <div>
                    A result of "DETECTED" is not a diagnosis of cancer. The
                    results of the CancerDetect test must be confirmed by
                    diagnostic evaluation suggested by qualified specialist
                    health care professionals in accordance with standard
                    medical practice, usually in secondary care centers.
                    This is typically performed with additional medical
                    procedures such as biopsy, imaging, or other methods.
                    <Link
                        href="/secondarycare"
                        target="_blank"
                        className="text-blue-500 underline hover:text-blue-700"
                    >
                        {' '}
                        Please click here for more information
                    </Link>
                    . These results should be interpreted in the context of
                    the individual's clinical risk factors. Diagnostic
                    decisions are the responsibility of the treating
                    physician. False-positive (a cancer signal detected when
                    cancer is not present) test results do occur.
                </div>
            ),
        },
        {
            title: 'If I get a "DETECTED" result and am referred to a secondary care specialist, what information should I provide the specialist?',
            content: (
                <div>
                    Please click on the link below if you received a
                    "DETECTED" result from the test, and have been referred
                    to a secondary care specialist for follow-up diagnosis
                    and treatment.
                    <br />
                    <Link
                        href="/secondarycare"
                        target="_blank"
                        className="text-blue-500 underline hover:text-blue-700"
                    >
                        Secondary care follow-up information if the test
                        result is "DETECTED"
                    </Link>
                    .
                </div>
            ),
        },
    ];

    return (
        <div className="bg-[#F4F4F5] px-0 md:px-10 py-20">
            <h4 className="font-TWKLausanne py-10 text-center text-[2.5rem] font-light">
                Frequently Asked Questions
            </h4>

            <div className="flex flex-col gap-4">
                <Accordion
                    selectionMode="multiple"
                    variant="splitted"
                    selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys}
                >
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            id={`faq-${index}`}
                            key={index}
                            aria-label={`Accordion ${index}`}
                            title={faq.title}
                            className="border-t border-black !bg-transparent shadow-none text-base"
                            classNames={{
                                title: "text-left",
                                trigger: "text-left",
                                indicator: "data-[open=true]:rotate-180 transition-transform",
                            }}
                            indicator={<ChevronDownIcon />}
                        >
                            {faq.content}
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}

