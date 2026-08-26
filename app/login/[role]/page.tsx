import { notFound } from 'next/navigation'
import { AuthForm } from '@/components/auth-form'

const roles = ['farmer', 'buyer', 'fpo'] as const
export default async function RoleLoginPage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params
  if (!roles.includes(role as (typeof roles)[number])) notFound()
  return <AuthForm role={role as (typeof roles)[number]} mode="login" />
}
