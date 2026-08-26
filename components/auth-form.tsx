'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Building2, Eye, EyeOff, Handshake, Leaf, LoaderCircle } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

const fields = {
  farmer: ['Full Name', 'Mobile Number', 'Email', 'Password', 'Confirm Password', 'State', 'District', 'Village', 'Main Crop / Crops', 'Land Area', 'Preferred Language'],
  buyer: ['Full Name / Business Name', 'Mobile Number', 'Email', 'Password', 'Confirm Password', 'Business Type', 'State', 'District', 'Required Commodities', 'Approximate Purchase Quantity'],
  fpo: ['FPO Name', 'Authorized Representative Name', 'Mobile Number', 'Email', 'Password', 'Confirm Password', 'State', 'District', 'Registration Number', 'Number of Associated Farmers', 'Major Crops', 'FPO Address'],
} as const

export function AuthForm({ role, mode }: { role: 'farmer' | 'buyer' | 'fpo'; mode: 'login' | 'register' }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const title = role === 'fpo' ? 'FPO' : role[0].toUpperCase() + role.slice(1)
  const RoleIcon = role === 'farmer' ? Leaf : role === 'buyer' ? Handshake : Building2
  const roleDescription = role === 'farmer' ? 'Better prices for every harvest.' : role === 'buyer' ? 'Trusted produce, direct from the source.' : 'Stronger connections for farming communities.'
  const loginFields = role === 'fpo' ? ['Email / Mobile Number', 'Password'] : ['Mobile Number / Email', 'Password']
  const inputType = (label: string) => label.toLowerCase().includes('password') ? (showPassword ? 'text' : 'password') : label.toLowerCase().includes('email') ? 'email' : 'text'
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setLoading(true)
    const data = Object.fromEntries(new FormData(event.currentTarget).entries())
    if (mode === 'register' && data.Password !== data['Confirm Password']) { setError('Passwords do not match.'); setLoading(false); return }
    const email = String(data.Email || data['Mobile Number / Email'] || data['Email / Mobile Number'] || '').trim()
    const password = String(data.Password || '')
    const result = mode === 'login' ? await authClient.signIn.email({ email, password }) : await authClient.signUp.email({ email, password, name: String(data['Full Name'] || data['Full Name / Business Name'] || data['Authorized Representative Name'] || data['FPO Name'] || title) })
    if (result.error) { setError('We could not complete that request. Please check your details and try again.'); setLoading(false); return }
    router.push(`/${role}/dashboard`); router.refresh()
  }
  const shownFields = mode === 'login' ? loginFields : fields[role]
  return <main className="auth-page"><div className="auth-wrap auth-form-wrap"><Link href="/" className="auth-brand"><span className="brand-mark"><Leaf size={20} /></span><span>Mandi<span className="brand-accent">Mitra</span><small>Sahi Mandi, Sahi Daam.</small></span></Link><Link href={`/${mode}`} className="back-link form-back"><ArrowLeft size={15} /> Back to role selection</Link><div className="auth-form-card"><div className="role-hero"><div className="role-hero-icon"><RoleIcon size={34} /></div><div><span className="role-hero-label">MandiMitra for</span><strong>{title}</strong><p>{roleDescription}</p></div></div><div className="section-kicker">{mode === 'login' ? 'SECURE ACCESS' : 'YOUR MARKET JOURNEY STARTS HERE'}</div><h1>{mode === 'login' ? `${title} Login` : role === 'fpo' ? 'Register Your FPO' : `Create ${title} Account`}</h1><p className="form-intro">{mode === 'login' ? 'Sign in to continue to your MandiMitra dashboard.' : 'Tell us a little about yourself so we can tailor your market experience.'}</p><form onSubmit={submit}><div className="form-grid">{shownFields.map(label => <label key={label}>{label}<span className="required">*</span><div className="input-wrap"><input required name={label} type={inputType(label)} placeholder={label} />{label.toLowerCase().includes('password') && <button type="button" className="password-toggle" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button>}</div></label>)}</div>{mode === 'register' && <label className="consent"><input required type="checkbox" name="consent" /> <span>I agree to the <a href="#terms">Terms & Conditions</a> and <a href="#privacy">Privacy Policy</a>.</span></label>}{error && <p className="form-error" role="alert">{error}</p>}<button className="auth-submit" disabled={loading}>{loading ? <LoaderCircle className="spin" size={18} /> : null}{mode === 'login' ? 'Login' : role === 'fpo' ? 'Register FPO' : `Create ${title} Account`}</button></form>{mode === 'login' ? <><Link className="forgot" href="#forgot-password">Forgot Password?</Link><p className="auth-switch">Don&apos;t have an account? <Link href={`/register/${role}`}>Register as {title}</Link></p></> : <p className="auth-switch">Already have an account? <Link href={`/login/${role}`}>Login as {title}</Link></p>}</div></div></main>
}
