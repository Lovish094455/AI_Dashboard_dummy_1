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
      usd: { code: 'USD', symbol: '$', locale: 'en-US' },
      eur: { code: 'EUR', symbol: '€', locale: 'de-DE' },
      gbp: { code: 'GBP', symbol: '£', locale: 'en-GB' },
      cad: { code: 'CAD', symbol: 'C$', locale: 'en-CA' },
      inr: { code: 'INR', symbol: '₹', locale: 'en-IN' }
    };

    const currency = currencyMap[regional.currency as keyof typeof currencyMap] || currencyMap.usd;
    
    try {
      // For compact display (millions/thousands)
      if (amount >= 1000000) {
        const value = amount / 1000000;
        return `${currency.symbol}${value.toFixed(1)}M`;
      } else if (amount >= 1000) {
        const value = amount / 1000;
        return `${currency.symbol}${value.toFixed(1)}K`;
      }
      
      // For regular amounts
      return new Intl.NumberFormat(currency.locale, {
        style: 'currency',
        currency: currency.code,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    } catch (error) {
      // Fallback for unsupported currencies
      if (amount >= 1000000) {
        return `${currency.symbol}${(amount / 1000000).toFixed(1)}M`;
      } else if (amount >= 1000) {
        return `${currency.symbol}${(amount / 1000).toFixed(1)}K`;
      }
      return `${currency.symbol}${amount.toLocaleString()}`;
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