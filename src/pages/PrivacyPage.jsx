import LegalPage from '../components/legal/LegalPage'
import { PRIVACY_LAST_UPDATED, PRIVACY_SECTIONS } from '../data/privacyPolicy'

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated={PRIVACY_LAST_UPDATED}
      sections={PRIVACY_SECTIONS}
    />
  )
}
