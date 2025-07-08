import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  avatar?: string;
  jobTitle: string;
  bio: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  weeklyReports: boolean;
  monthlyReports: boolean;
  budgetAlerts: boolean;
  paymentReminders: boolean;
  systemUpdates: boolean;
  marketingEmails: boolean;
}

interface AppearanceSettings {
  theme: 'light' | 'dark' | 'auto';
  fontSize: 'small' | 'medium' | 'large';
  compactMode: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  colorScheme: 'blue' | 'green' | 'purple' | 'orange';
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: number;
  loginAlerts: boolean;
  deviceTracking: boolean;
  passwordExpiry: number;
  ipWhitelist: string[];
}

interface PrivacySettings {
  dataCollection: boolean;
  analytics: boolean;
  cookies: boolean;
  thirdPartySharing: boolean;
  profileVisibility: 'public' | 'private' | 'team';
  activityTracking: boolean;
}

interface IntegrationSettings {
  slackIntegration: boolean;
  teamsIntegration: boolean;
  emailIntegration: boolean;
  calendarSync: boolean;
  apiAccess: boolean;
  webhooks: boolean;
}

interface RegionalSettings {
  language: string;
  currency: string;
  timezone: string;
  dateFormat: string;
  numberFormat: string;
}

interface SettingsContextType {
  profile: UserProfile;
  regional: RegionalSettings;
  notifications: NotificationSettings;
  appearance: AppearanceSettings;
  security: SecuritySettings;
  privacy: PrivacySettings;
  integrations: IntegrationSettings;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateRegional: (updates: Partial<RegionalSettings>) => void;
  updateNotifications: (updates: Partial<NotificationSettings>) => void;
  updateAppearance: (updates: Partial<AppearanceSettings>) => void;
  updateSecurity: (updates: Partial<SecuritySettings>) => void;
  updatePrivacy: (updates: Partial<PrivacySettings>) => void;
  updateIntegrations: (updates: Partial<IntegrationSettings>) => void;
  formatCurrency: (amount: number) => string;
  formatDateTime: (date: Date) => string;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : {
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@university.edu',
      phone: '+1 (555) 123-4567',
      department: 'finance',
      jobTitle: 'Financial Officer',
      bio: 'Experienced financial professional with expertise in university financial management.'
    };
  });

  const [regional, setRegional] = useState<RegionalSettings>(() => {
    const saved = localStorage.getItem('regionalSettings');
    return saved ? JSON.parse(saved) : {
      language: 'en',
      currency: 'usd',
      timezone: 'est',
      dateFormat: 'mm/dd/yyyy',
      numberFormat: 'us'
    };
  });

  const [notifications, setNotifications] = useState<NotificationSettings>(() => {
    const saved = localStorage.getItem('notificationSettings');
    return saved ? JSON.parse(saved) : {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      weeklyReports: true,
      monthlyReports: true,
      budgetAlerts: true,
      paymentReminders: true,
      systemUpdates: true,
      marketingEmails: false
    };
  });

  const [appearance, setAppearance] = useState<AppearanceSettings>(() => {
    const saved = localStorage.getItem('appearanceSettings');
    return saved ? JSON.parse(saved) : {
      theme: 'light',
      fontSize: 'medium',
      compactMode: false,
      highContrast: false,
      reducedMotion: false,
      colorScheme: 'blue'
    };
  });

  const [security, setSecurity] = useState<SecuritySettings>(() => {
    const saved = localStorage.getItem('securitySettings');
    return saved ? JSON.parse(saved) : {
      twoFactorAuth: false,
      sessionTimeout: 30,
      loginAlerts: true,
      deviceTracking: true,
      passwordExpiry: 90,
      ipWhitelist: []
    };
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>(() => {
    const saved = localStorage.getItem('privacySettings');
    return saved ? JSON.parse(saved) : {
      dataCollection: true,
      analytics: true,
      cookies: true,
      thirdPartySharing: false,
      profileVisibility: 'team',
      activityTracking: true
    };
  });

  const [integrations, setIntegrations] = useState<IntegrationSettings>(() => {
    const saved = localStorage.getItem('integrationSettings');
    return saved ? JSON.parse(saved) : {
      slackIntegration: false,
      teamsIntegration: false,
      emailIntegration: true,
      calendarSync: false,
      apiAccess: false,
      webhooks: false
    };
  });

  // Save to localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('regionalSettings', JSON.stringify(regional));
  }, [regional]);

  useEffect(() => {
    localStorage.setItem('notificationSettings', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('appearanceSettings', JSON.stringify(appearance));
  }, [appearance]);

  useEffect(() => {
    localStorage.setItem('securitySettings', JSON.stringify(security));
  }, [security]);

  useEffect(() => {
    localStorage.setItem('privacySettings', JSON.stringify(privacy));
  }, [privacy]);

  useEffect(() => {
    localStorage.setItem('integrationSettings', JSON.stringify(integrations));
  }, [integrations]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const updateRegional = (updates: Partial<RegionalSettings>) => {
    setRegional(prev => ({ ...prev, ...updates }));
  };

  const updateNotifications = (updates: Partial<NotificationSettings>) => {
    setNotifications(prev => ({ ...prev, ...updates }));
  };

  const updateAppearance = (updates: Partial<AppearanceSettings>) => {
    setAppearance(prev => ({ ...prev, ...updates }));
  };

  const updateSecurity = (updates: Partial<SecuritySettings>) => {
    setSecurity(prev => ({ ...prev, ...updates }));
  };

  const updatePrivacy = (updates: Partial<PrivacySettings>) => {
    setPrivacy(prev => ({ ...prev, ...updates }));
  };

  const updateIntegrations = (updates: Partial<IntegrationSettings>) => {
    setIntegrations(prev => ({ ...prev, ...updates }));
  };

  const formatCurrency = (amount: number): string => {
    const currencyMap = {
      usd: { 
        code: 'USD', 
        symbol: '$', 
        locale: 'en-US',
        units: { million: 'M', thousand: 'K', billion: 'B' }
      },
      eur: { 
        code: 'EUR', 
        symbol: '€', 
        locale: 'de-DE',
        units: { million: 'M', thousand: 'K', billion: 'Mrd' }
      },
      gbp: { 
        code: 'GBP', 
        symbol: '£', 
        locale: 'en-GB',
        units: { million: 'M', thousand: 'K', billion: 'B' }
      },
      cad: { 
        code: 'CAD', 
        symbol: 'C$', 
        locale: 'en-CA',
        units: { million: 'M', thousand: 'K', billion: 'B' }
      },
      inr: { 
        code: 'INR', 
        symbol: '₹', 
        locale: 'en-IN',
        units: { crore: 'Cr', lakh: 'L', thousand: 'T', billion: 'B' }
      }
    };

    const currency = currencyMap[regional.currency as keyof typeof currencyMap] || currencyMap.usd;
    
    // Convert USD amounts to other currencies (simplified conversion rates)
    const conversionRates = {
      usd: 1,
      eur: 0.85,
      gbp: 0.73,
      cad: 1.25,
      inr: 83.12
    };
    
    const convertedAmount = amount * conversionRates[regional.currency as keyof typeof conversionRates];
    
    try {
      // Special formatting for INR
      if (regional.currency === 'inr') {
        if (convertedAmount >= 10000000) { // 1 crore
          const value = convertedAmount / 10000000;
          return `${currency.symbol}${value.toFixed(1)} ${currency.units.crore}`;
        } else if (convertedAmount >= 100000) { // 1 lakh
          const value = convertedAmount / 100000;
          return `${currency.symbol}${value.toFixed(1)} ${currency.units.lakh}`;
        } else if (convertedAmount >= 1000) { // 1 thousand
          const value = convertedAmount / 1000;
          return `${currency.symbol}${value.toFixed(1)} ${currency.units.thousand}`;
        }
      } else {
        // Standard formatting for other currencies
        if (convertedAmount >= 1000000000) { // 1 billion
          const value = convertedAmount / 1000000000;
          return `${currency.symbol}${value.toFixed(1)} ${currency.units.billion}`;
        } else if (convertedAmount >= 1000000) { // 1 million
          const value = convertedAmount / 1000000;
          return `${currency.symbol}${value.toFixed(1)} ${currency.units.million}`;
        } else if (convertedAmount >= 1000) { // 1 thousand
          const value = convertedAmount / 1000;
          return `${currency.symbol}${value.toFixed(1)} ${currency.units.thousand}`;
        }
      }
      
      // For regular amounts
      return new Intl.NumberFormat(currency.locale, {
        style: 'currency',
        currency: currency.code,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(convertedAmount);
    } catch (error) {
      // Fallback for unsupported currencies
      if (regional.currency === 'inr') {
        if (convertedAmount >= 10000000) {
          return `${currency.symbol}${(convertedAmount / 10000000).toFixed(1)} Cr`;
        } else if (convertedAmount >= 100000) {
          return `${currency.symbol}${(convertedAmount / 100000).toFixed(1)} L`;
        } else if (convertedAmount >= 1000) {
          return `${currency.symbol}${(convertedAmount / 1000).toFixed(1)} T`;
        }
      } else {
        if (convertedAmount >= 1000000) {
          return `${currency.symbol}${(convertedAmount / 1000000).toFixed(1)}M`;
        } else if (convertedAmount >= 1000) {
          return `${currency.symbol}${(convertedAmount / 1000).toFixed(1)}K`;
        }
      }
      return `${currency.symbol}${convertedAmount.toLocaleString()}`;
    }
  };

  const formatDateTime = (date: Date): string => {
    const timezoneMap = {
      est: 'America/New_York',
      pst: 'America/Los_Angeles',
      utc: 'UTC',
      cet: 'Europe/Berlin',
      ist: 'Asia/Kolkata'
    };

    const timezone = timezoneMap[regional.timezone as keyof typeof timezoneMap] || 'America/New_York';

    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    } catch (error) {
      return date.toLocaleString();
    }
  };

  return (
    <SettingsContext.Provider value={{
      profile,
      regional,
      notifications,
      appearance,
      security,
      privacy,
      integrations,
      updateProfile,
      updateRegional,
      updateNotifications,
      updateAppearance,
      updateSecurity,
      updatePrivacy,
      updateIntegrations,
      formatCurrency,
      formatDateTime
    }}>
      {children}
    </SettingsContext.Provider>
  );
};