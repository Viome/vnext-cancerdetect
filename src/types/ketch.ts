/**
 * TypeScript definitions for Ketch consent management
 */

declare global {
    interface Window {
      ketch: KetchFunction;
      semaphore: any[];
    }
  }
  
  export type KetchFunction = {
    (command: 'showPreferences'): void;
    (command: 'on', event: 'regionInfo', callback: (regionInfo: string) => void): void;
    (command: 'on', event: 'jurisdiction', callback: (jurisdiction: string) => void): void;
    (...args: any[]): void;
  };
  
  export interface KetchRegionInfo {
    region: string;
    jurisdiction: string;
  }
  
  export interface KetchConfig {
    property: string;
    src: string;
  }
  