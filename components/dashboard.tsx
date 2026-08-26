'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Leaf, LogOut, Store, TrendingUp, Users } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

export function Dashboard({ role, name }: { role: 'farmer' | 'buyer' | 'fpo'; name: string }) {
  const router = useRouter(); const title = role === 'fpo' ? 'FPO' : role[0].toUpperCase() + role.slice(1)
  const copy = role === 'farmer' ? 'Discover better prices and sell with confidence.' : role === 'buyer' ? 'Source quality produce from trusted partners.' : 'Coordinate produce and unlock better opportunities.'
  return <main className="dashboard-page"><header className="dashboard-nav"><Link href="/" className="auth-brand"><span className="brand-mark"><Leaf size={20} /></span><span>Mandi<span className="brand-accent">Mitra</span><small>Sahi Mandi, Sahi Daam.</small></span></Link><button className="logout-button" onClick={async () => { await authClient.signOut(); router.push('/'); router.refresh() }}><LogOut size={16} /> Sign out</button></header><section className="dashboard-content"><div className="dashboard-kicker">{title.toUpperCase()} DASHBOARD</div><h1>Namaste, {name}.</h1><p>{copy}</p><div className="dashboard-grid"><article><Store size={22} /><b>Market opportunities</b><span>Explore current mandi and buyer signals.</span></article><article><TrendingUp size={22} /><b>Price insights</b><span>Compare estimated net realization.</span></article><article><Users size={22} /><b>Trusted network</b><span>Connect with verified marketplace participants.</span></article></div><Link href="/#prices" className="dashboard-link">Explore MandiMitra <span>→</span></Link></section></main>
}
