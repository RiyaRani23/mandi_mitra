'use client'

import Link from 'next/link'
import { Building2, Handshake, Leaf, ArrowRight } from 'lucide-react'

const roles = [
  { key: 'farmer', title: 'Farmer', icon: Leaf, description: 'Compare mandi prices, discover buyers and sell your produce at the right price.' },
  { key: 'buyer', title: 'Buyer', icon: Handshake, description: 'Find quality agricultural produce directly from verified farmers and FPOs.' },
  { key: 'fpo', title: 'FPO', icon: Building2, description: 'Aggregate farmer produce and connect with bulk buyers for better market opportunities.' },
]

export function RoleSelection({ mode }: { mode: 'login' | 'register' }) {
  return <main className="auth-page"><div className="auth-wrap"><Link href="/" className="auth-brand"><span className="brand-mark"><Leaf size={20} /></span><span>Mandi<span className="brand-accent">Mitra</span><small>Sahi Mandi, Sahi Daam.</small></span></Link><div className="auth-heading"><div className="section-kicker">{mode === 'login' ? 'WELCOME BACK' : 'JOIN MANDIMITRA'}</div><h1>How would you like to continue?</h1><p>Select your role to access your MandiMitra account.</p></div><div className="role-grid">{roles.map(({ key, title, icon: Icon, description }) => <article className="role-select-card" key={key}><div className="role-icon"><Icon size={28} /></div><h2>{title}</h2><p>{description}</p><div className="role-actions"><Link className="auth-primary" href={`/${mode}/${key}`}>{mode === 'login' ? `Login as ${title}` : `Register as ${title}`} <ArrowRight size={15} /></Link><Link className="auth-secondary" href={`/${mode === 'login' ? 'register' : 'login'}/${key}`}>{mode === 'login' ? `Register as ${title}` : `Login as ${title}`}</Link></div></article>)}</div><Link className="back-link" href="/">← Back to MandiMitra</Link></div></main>
}
