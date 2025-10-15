import { NEXT_PUBLIC_API_DOMAIN } from './constants';

interface UserDataResponse {
    error?: boolean;
    [key: string]: any;
}

export const getUserData = async (): Promise<UserDataResponse> => {
    try {
        const results = await fetch(
            `${NEXT_PUBLIC_API_DOMAIN}/external/user/profile`,
            {
                method: 'GET',
                credentials: 'include',
            },
        )
            .then((response) => {
                if (response.status !== 200) {
                    return { error: true };
                }
                return response.json();
            })
            .then((res) => {
                if (res.error) {
                    return { error: true };
                }
                return res;
            });
        return results;
    } catch (error) {
        return { error: true };
    }
};

export default getUserData;

