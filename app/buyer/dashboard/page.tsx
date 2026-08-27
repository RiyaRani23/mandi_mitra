import { Dashboard } from '@/components/dashboard'

// Buyer marketplace is a self-contained SIH demo flow; the existing Farmer auth flow remains protected.
export default function BuyerDashboard() {
  return <Dashboard role="buyer" name="Buyer" />
}
