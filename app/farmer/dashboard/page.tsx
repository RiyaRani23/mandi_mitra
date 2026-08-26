import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { Dashboard } from '@/components/dashboard'
export default async function FarmerDashboard() { const session = await auth.api.getSession({ headers: await headers() }); if (!session?.user) redirect('/login/farmer'); return <Dashboard role="farmer" name={session.user.name} /> }
