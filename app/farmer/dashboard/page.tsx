import { Dashboard } from '@/components/dashboard'

export default function FarmerDashboard() {
  // The SIH prototype uses simulated login, so the farmer workspace is available after demo login.
  return <Dashboard role="farmer" name="Farmer" />
}
