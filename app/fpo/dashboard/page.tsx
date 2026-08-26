import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { Dashboard } from '@/components/dashboard'
export default async function FpoDashboard() { const session = await auth.api.getSession({ headers: await headers() }); if (!session?.user) redirect('/login/fpo'); return <Dashboard role="fpo" name={session.user.name} /> }
