'use client'

import useSWR from 'swr'
import { RefreshCw, Wifi } from 'lucide-react'

type PriceRecord = { market: string; district: string; state: string; variety: string; min: number; max: number; modal: number; arrivalDate: string }
type PriceResponse = { source: string; fetchedAt: string; records: PriceRecord[]; error?: string }

const fetcher = (url: string) => fetch(url).then((response) => response.json()) as Promise<PriceResponse>
const formatPrice = (value: number) => value ? `₹${value.toLocaleString('en-IN')}` : '—'

export function LiveMandiPrices() {
  const { data, error, isLoading, mutate } = useSWR('/api/mandi-prices?commodity=Onion&state=Maharashtra', fetcher, { revalidateOnFocus: false })
  const records = data?.records ?? []

  return <section className="live-mandi-card" id="market-prices">
    <div className="live-mandi-heading">
      <div><p className="dashboard-eyebrow">OFFICIAL MARKET DATA</p><h2>Live Mandi Prices</h2><p>Today&apos;s modal prices from Maharashtra markets, updated from Data.gov.in / AGMARKNET.</p></div>
      <button className="secondary-action" onClick={() => mutate()} disabled={isLoading}><RefreshCw size={15} className={isLoading ? 'spin' : ''} /> Refresh</button>
    </div>
    {isLoading && <div className="price-loading">Loading official mandi prices…</div>}
    {!isLoading && (error || data?.error) && <div className="price-empty"><Wifi size={18} /><span>Official prices are temporarily unavailable. Try refreshing.</span></div>}
    {!isLoading && !error && !data?.error && records.length === 0 && <div className="price-empty"><Wifi size={18} /><span>No Maharashtra onion records were returned today.</span></div>}
    {records.length > 0 && <div className="live-price-table"><div className="live-price-row live-price-header"><span>Market</span><span>Variety</span><span>Min</span><span>Modal</span><span>Max</span></div>{records.slice(0, 6).map((record) => <div className="live-price-row" key={`${record.market}-${record.variety}`}><span><b>{record.market}</b><small>{record.district || record.state}</small></span><span>{record.variety || 'All varieties'}</span><strong>{formatPrice(record.min)}</strong><strong className="modal-price">{formatPrice(record.modal)}</strong><strong>{formatPrice(record.max)}</strong></div>)}</div>}
    {data?.fetchedAt && <small className="price-source">Fetched {new Date(data.fetchedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} · Illustrative dashboard recommendations remain separate from official market data.</small>}
  </section>
}
