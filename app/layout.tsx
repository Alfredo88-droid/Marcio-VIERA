import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MV-Advogado | Advocacia e Consultoria Jurídica em Angola',
  description: 'MV-Advogado — escritório de advocacia e consultoria jurídica com atuação estratégica, atendimento personalizado e compromisso com a segurança jurídica dos seus clientes.',
  metadataBase: new URL('https://mv-advogados.vercel.app'),
  openGraph: { title: 'MV-Advogado | Advocacia e Consultoria Jurídica em Angola', description: 'Estratégia jurídica para decisões que exigem confiança.', type: 'website', locale: 'pt_AO' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#202d40', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-AO" className="bg-[#f5f5f2]"><body className="antialiased">{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'LegalService', name: 'MV-Advogado', description: 'Escritório de advocacia e consultoria jurídica em Angola.', areaServed: 'AO', address: { '@type': 'PostalAddress', streetAddress: 'Av. Salvador Correia', addressLocality: 'Lobito', addressCountry: 'AO' } }) }} />{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
