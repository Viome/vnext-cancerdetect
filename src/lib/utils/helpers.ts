export const calculateAge = (dateOfBirth: string | Date): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
};

export const scrollToTopDiv = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollTop = 0;
    }
};

interface AnswerOption {
    value: string;
    text: string;
    [key: string]: any;
}

export const getAnswerText = (arr: AnswerOption[], value: string): string => {
    const answer = arr.find((answer) => answer.value === value);
    return answer?.text || '';
};

interface PhoneCodeOption {
    phoneCode: string;
    [key: string]: any;
}

export const getPhoneNumberByCode = (arr: PhoneCodeOption[], value: string): string => {
    const answer = arr.find((answer) => answer.phoneCode === value);
    return `+${answer?.phoneCode || '1'}`;
};

