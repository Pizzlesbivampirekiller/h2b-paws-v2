import LegalPage from '../components/legal/LegalPage'
import { TERMS_LAST_UPDATED, TERMS_SECTIONS } from '../data/termsOfService'

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      lastUpdated={TERMS_LAST_UPDATED}
      sections={TERMS_SECTIONS}
    />
  )
}
