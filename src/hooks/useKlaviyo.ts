import { useCallback } from 'react';

/**
 * Hook for programmatically opening Klaviyo forms
 * @returns {Object} Object containing openForm function
 */
export const useKlaviyo = () => {
    const openForm = useCallback((formId: string) => {
        if (typeof window === 'undefined' || !formId) {
            console.warn('Klaviyo: Cannot open form - invalid formId or window not available');
            return;
        }

        // Initialize _klOnsite array if it doesn't exist
        if (!window._klOnsite) {
            window._klOnsite = [];
        }

        // Push the openForm command
        window._klOnsite.push(['openForm', formId]);
    }, []);

    return { openForm };
};

