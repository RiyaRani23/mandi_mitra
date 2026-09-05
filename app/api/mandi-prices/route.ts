import { NextResponse } from 'next/server'

const RESOURCE_ID = '9ef84268-d588-465a-a308-a864a43d0070'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const commodity = searchParams.get('commodity') || 'Onion'
  const state = searchParams.get('state') || 'Maharashtra'
  const apiKey = process.env.DATA_GOV_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: 'Mandi price service is not configured.' }, { status: 503 })
  }

  const params = new URLSearchParams({
    'api-key': apiKey,
    format: 'json',
    limit: '50',
    'filters[commodity]': commodity,
    'filters[state]': state,
  })

  try {
    const response = await fetch(`https://api.data.gov.in/resource/${RESOURCE_ID}?${params}`, {
      next: { revalidate: 900 },
    })
    if (!response.ok) return NextResponse.json({ error: 'Official mandi data is unavailable.' }, { status: 502 })
    const payload = await response.json()
    const records = Array.isArray(payload.records) ? payload.records : []
    return NextResponse.json({
      source: 'Data.gov.in / AGMARKNET',
      fetchedAt: new Date().toISOString(),
      records: records.map((record: Record<string, string>) => ({
        market: record.market || record.market_name || 'Mandi market',
        district: record.district || '',
        state: record.state || state,
        variety: record.variety || '',
        min: Number(record.min_price || record.min || 0),
        max: Number(record.max_price || record.max || 0),
        modal: Number(record.modal_price || record.modal || 0),
        arrivalDate: record.arrival_date || '',
      })).filter((record: { modal: number }) => record.modal > 0),
    })
  } catch {
    return NextResponse.json({ error: 'Unable to reach the official mandi price service.' }, { status: 502 })
  }
}
