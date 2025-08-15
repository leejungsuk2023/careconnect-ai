// Channel Talk TypeScript Definitions
interface Window {
  ChannelIO?: (method: string, ...args: any[]) => void;
  ChannelIOInitialized?: boolean;
}

interface ChannelIOSettings {
  pluginKey: string;
  customLauncherSelector?: string;
  hideChannelButtonOnBoot?: boolean;
  language?: 'ko' | 'en' | 'ja';
  appearance?: 'light' | 'dark' | 'system';
  zIndex?: number;
  profile?: {
    name?: string;
    email?: string;
    mobileNumber?: string;
    avatarUrl?: string;
  };
  customAttributes?: Record<string, any>;
}

declare global {
  interface Window {
    ChannelIO?: (method: string, settings?: ChannelIOSettings | any) => void;
    ChannelIOInitialized?: boolean;
  }
}