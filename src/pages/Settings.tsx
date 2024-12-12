import React from 'react'
import SettingsLayout from '../components/settings-layout'
import PersonalInfoSection from '../components/personal-info-section'
import SecuritySection from '../components/security-section'
import AccountSection from '../components/account-section'
import AppPreferencesSection from '../components/app-preferences-section'
import Header from '../components/Header'

export default function SettingsPage() {
  return (
    <div>
        <Header />
        <SettingsLayout>
          <PersonalInfoSection />
          <SecuritySection />
          <AccountSection />
          <AppPreferencesSection />
        </SettingsLayout>
    </div>  
  )
}

