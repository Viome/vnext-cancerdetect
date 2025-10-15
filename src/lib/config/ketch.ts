/**
 * Ketch configuration for consent management
 */

export const KETCH_CONFIG = {
  // Base URL for Ketch CDN
  baseUrl: 'https://global.ketchcdn.com/web/v2/config/viome/',

  // Default property name
  defaultProperty: 'website_smart_tag',

  // Custom text regions (e.g., for CCPA compliance)
  customTextRegions: ['US-CA'] as const,

  // Jurisdictions where privacy link should be hidden
  excludedJurisdictions: ['default'] as const,

  // Privacy link text variations
  privacyText: {
    default: 'Your privacy choices',
    ccpa: 'Do Not Sell My Personal Information',
  },

  // Script loading configuration
  script: {
    strategy: 'beforeInteractive' as const,
    defer: true,
    async: true,
  },
} as const;

export type KetchConfig = typeof KETCH_CONFIG;
