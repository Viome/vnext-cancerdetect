// Exact migration from utils/constants.js
export const KLAVIYO = {
  EMBED_FOOTER_SIGNUP_FORM_ID: "UsRwXb",
  EMBED_BLOG_SIGNUP_FORM_ID: "WfuKn6",
  PROVIDER_FORM_ID: "WnWq9f",
  EMPLOYER_FORM_ID: "XitDQc",
  SIGN_UP_FORM_ID: "UdMJRv",
};

export const NEXT_API_FOLDER = "api";
export const API_DOMAIN_V1 =
  process.env.NEXT_PUBLIC_API_DOMAIN_V1 || "https://api.example.com/v1";

export const ELEGIBILITY_STEPS = {
  MAX_STEPS: 15,
  MAX_STEPS_QUESTIONNAIRE: 12,
  PERSONAL_INFO_STEP: 0,
  CONTACT_DETAILS_STEP: 1,
  TOBACCO_USE_STEP: 2,
  TOBACCO_USE_PREVIOUS_STEP_PREVIOUS: 3,
  TOBACCO_USE_TYPES: 4,
  TOBACCO_USE_YEARS: 5,
  TOBACCO_USE_DAY_CONSUME: 6,
  HPV_STEP: 7,
  PRIMARY_REASON_STEP: 8,
  ETHNICITY_STEP: 9,
  YOU_OR_FAMILY_CANCER: 10,
  YOU_CANCER: 11,
  YOU_CANCER_AGE: 12,
  YOUR_FAMILY_CANCER: 13,
  FAMILY_MEMBERS_STEP: 14,
  CONFIRMATION_DETAILS_STEP: 15,
  RESULTS_STEP_PRE_APPROVED: -3,
  RESULTS_STEP_NOT_ELIGIBLE: -4,
  REGISTER_STEP_ACKNOWLEDGE: -2,
  REGISTER_STEP_EMAIL: -1,
  DENTIST_INFO_STEP: -5,
};

export const ELIGIBILITTY_GA_EVENTS = {
  STEP_PAGE_VIEW: "eligibility_step_view",
  RESULT_PRE_APPROVED: "eligibility_result_pre_approved",
  RESULT_NOT_ELIGIBLE: "eligibility_result_not_eligible",
  CLICK_BUY: "eligibility_click_buy",
  CLICK_ACKNOWLEDGE: "eligibility_click_acknowledge",
  CLICK_CONFIRM: "eligibility_click_confirm",
  CLICK_ORDER_THE_TEST_NOW: "eligibility_click_order_the_test_now",
};

export const SUPPORT_PAGE_URL = {
  register:
    "https://support.viome.com/en_us/cancerdetect-may-i-purchase-viome-as-a-gift-H1wcZOFa9",
  personalInformation:
    "https://support.viome.com/en_us/cancerdetect-multiple-kits-in-the-same-household-HyvP3PKaq",
  contactInformation:
    "https://support.viome.com/en_us/cancerdetect-multiple-kits-in-the-same-household-HyvP3PKaq",
  notEligiblePage: "https://support.viome.com/en_us/cdot-about-BkVlgc59c",
};

const {
  NEXT_PUBLIC_API_DOMAIN: apiDomain,
  NEXT_PUBLIC_APP_URL: appUrl,
  NEXT_PUBLIC_VIOME_APP_URL: viomeAppUrl,
} = process.env;

export const LOGIN_PAGE_URL = `${viomeAppUrl}/login`;

export const APP_URL = appUrl;

export const NEXT_PUBLIC_API_DOMAIN =
  process.env.NODE_ENV === "production"
    ? "https://my.viome.com/app"
    : "https://test.viome.com/app";

export const QUESTIONS_IDS = {
  REASON_FOR_TESTING: 11,
  REASON_FOR_TESTING_OTHER: 111, // ASK
  ETHNICITY: 12,
  YOU_OR_FAMILY_MEMBER_CANCER: 3,
  YOU_CANCER: 301,
  YOU_AGE_CANCER: 311,
  FAMILY_MEMBER_CANCER: 302,
  FAMILY_MEMBER_CANCER_LIST_NAME: 321,
  FAMILY_MEMBER_CANCER_LIST_AGE: 322,
  TOBACCO_USE: 4,
  TOBACCO_YEARS: 411,
  TOBACCO_TYPES: 412,
  TOBACCO_DAY: 413,
  HPV: 15,
};

export const ELIGIBILITY_PAGE_TITLE = {
  main: 'CD Eligibility',
  register: 'Register',
  personalDetails: 'Personal Details',
  contactDetails: 'Contact Details',
};

export const ELEGIBILITY_STEPS_PAGE_TITLES_AND_PATHS = {
  PERSONAL_INFO_STEP: {
    title: "Personal Information",
    path: "/eligibility/personal-information",
  },
  CONTACT_DETAILS_STEP: {
    title: "Contact Information",
    path: "/eligibility/contact-information",
  },
  TOBACCO_USE_STEP: {
    title: "Current Tobacco Use",
    path: "/eligibility/current-tobacco-use",
  },
  TOBACCO_USE_PREVIOUS_STEP_PREVIOUS: {
    title: "Previous Tobacco Use",
    path: "/eligibility/previous-tobacco-use",
  },
  TOBACCO_USE_TYPES: {
    title: "Tobaacco Use Types",
    path: "/eligibility/tobaacco-use-types",
  },
  TOBACCO_USE_YEARS: {
    title: "Tobaacco Use Years",
    path: "/eligibility/tobaacco-use-years",
  },
  TOBACCO_USE_DAY_CONSUME: {
    title: "Tobaacco Use Day Consume",
    path: "/eligibility/tobaacco-use-day-consume",
  },
  HPV_STEP: {
    title: "Personal and family history - HPV",
    path: "/eligibility/hpv",
  },
  PRIMARY_REASON_STEP: {
    title: "Purchasing Reason",
    path: "/eligibility/purshasing-reason",
  },
  ETHNICITY_STEP: {
    title: "Ethnicity",
    path: "/eligibility/ethnicity",
  },
  YOU_OR_FAMILY_CANCER: {
    title: "Personal and Family History - Cancer",
    path: "/eligibility/cancer-you-or-family",
  },
  YOU_CANCER: {
    title: "Personal and Family History - Cancer - You",
    path: "/eligibility/cancer-you",
  },
  YOU_CANCER_AGE: {
    title: "Personal and Family History - Cancer - Age",
    path: "/eligibility/cancer-you-age",
  },
  YOUR_FAMILY_CANCER: {
    title: "Personal and Family History - Cancer - Your Family",
    path: "/eligibility/cancer-your-family",
  },
  FAMILY_MEMBERS_STEP: {
    title: "Personal and Family History - Cancer - Family Members",
    path: "/eligibility/cancer-family-members",
  },
  CONFIRMATION_DETAILS_STEP: {
    title: "Confirmation Details",
    path: "/eligibility/confirmation-details",
  },
  MAX_STEPS: {
    title: "Confirmation Details",
    path: "/eligibility/confirmation-details",
  },
  REGISTER_STEP_EMAIL: {
    title: "Register - Email",
    path: "/eligibility/register",
  },
  REGISTER_STEP_ACKNOWLEDGE: {
    title: "Register - Acknowledgement",
    path: "/eligibility/register",
  },
  RESULTS_STEP_NOT_ELIGIBLE: {
    title: "Results - Not Eligible",
    path: "/eligibility/results-not-eligible",
  },
  RESULTS_STEP_PRE_APPROVED: {
    title: "Results - Pre-Approved",
    path: "/eligibility/results-pre-approved",
  },
};

export const LOCAL_STORAGE_CD_ELEGIBILITY = "cd-eligibility-form";
export const USER_GENDER_QUESTION_ID = 1;

export const VDP_URL = process.env.NEXT_PUBLIC_VDP_URL || "https://vdp.viome.com";
export const GOOGLE_TAG_MANAGER_CONTAINER =
    process.env.NODE_ENV === 'production' ? 'GTM-WMJPZ4P' : 'GTM-N9SRJ6X';

export const ELIGIBILITY_DEFAULT_VALUES_NOT_REQUIRED = [
  "familyMembers",
  "apartmentSuitNo",
  "tobaccoPrevious",
  "tobaccoTypes",
  "tobaccoYears",
  "tobaccoDay",
  "ethnicity",
];

export const ELIGIBILITY_DEFAULT_VALUES = {
  firstName: "",
  lastName: "",
  dob: "",
  gender: "",
  email: "",
  streetAddress: "",
  apartmentSuitNo: "",
  city: "",
  phoneNumberCountryCode: "1",
  phoneNumber: "",
  country: "United States",
  state: "",
  zipCode: "",
  tobaccoCurrent: "",
  tobaccoPrevious: "",
  tobaccoTypes: "",
  tobaccoYears: "",
  tobaccoDay: "",
  hpv: "",
  reasonForTesting: "",
  ethnicity: [],
  familyCancerYouOrCloseFamilyMember: "",
  familyCancerYou: "",
  familyCancerYouAge: "",
  familyCancerYourFamily: "",
  familyMembers: {},
};
