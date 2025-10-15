'use client';

import Field from '@/components/Form/Field';

export default function Step10() {
    return (
        <section>
            <div className="sm:max-w-cd-content">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-4">Personal and family history</h1>
                    <p className="text-gray-600">
                        Have you ever tested positive for HPV (human papillomavirus)?
                    </p>
                </div>
            </div>
            <div className="sm:max-w-cd-form">
                <Field
                    name="hpv"
                    type="radioGroup"
                    values={[
                        { value: 'yes', text: 'Yes' },
                        { value: 'no', text: 'No' },
                        { value: 'not_sure', text: 'Not Sure' },
                    ]}
                    tooltip={{
                        position: 'bottom',
                        title: 'What is HPV (human papillomavirus)?',
                        content: (
                            <>
                                <p className="mb-5">
                                    HPV is a group of more than 200 related viruses, some of which
                                    are spread through vaginal, anal, or oral sex. Sexually
                                    transmitted HPV types fall into two groups, low risk and high
                                    risk.
                                </p>
                                <p className="mb-2">
                                    Low-risk HPVs mostly cause no disease. However, a few low-risk
                                    HPV types can cause warts on or around the genitals, anus,
                                    mouth, or throat.
                                </p>
                                <p className="mb-5">
                                    High-risk HPVs can cause several types of cancer. There are
                                    about 14 high-risk HPV types including HPV 16, 18, 31, 33, 35,
                                    39, 45, 51, 52, 56, 58, 59, 66, and 68. Two of these, HPV16 and
                                    HPV18, are responsible for most HPV-related cancers.
                                </p>
                            </>
                        ),
                    }}
                />
            </div>
        </section>
    );
}

