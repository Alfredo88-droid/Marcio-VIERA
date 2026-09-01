'use client'

import { useState } from 'react'
import {
  Activity,
  ArrowUpRight,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  FileText,
  LayoutDashboard,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react'

type Section = 'Visão geral' | 'Clientes' | 'Serviços' | 'Agendamentos' | 'Utilizadores' | 'Configurações'

const navigation: { label: Section; icon: typeof LayoutDashboard }[] = [
  { label: 'Visão geral', icon: LayoutDashboard },
  { label: 'Clientes', icon: Users },
  { label: 'Serviços', icon: BriefcaseBusiness },
  { label: 'Agendamentos', icon: CalendarDays },
  { label: 'Utilizadores', icon: ShieldCheck },
  { label: 'Configurações', icon: Settings },
]

const activities = [
  ['Novo pedido de consulta', 'Ana Cristina · há 18 min', 'Novo'],
  ['Agendamento confirmado', 'João Manuel · hoje, 10:42', 'Confirmado'],
  ['Serviço atualizado', 'Direito Empresarial · ontem', 'Atualizado'],
]

function StatCard({ label, value, detail, icon: Icon }: { label: string; value: string; detail: string; icon: typeof Users }) {
  return (
    <article className="admin-stat-card">
      <div className="admin-stat-top"><span>{label}</span><Icon aria-hidden="true" /></div>
      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
  )
}

function Overview({ setSection }: { setSection: (section: Section) => void }) {
  return (
    <>
      <div className="admin-page-heading"><div><p className="admin-eyebrow">RESUMO DO ESCRITÓRIO</p><h2>Bom dia, Márcio.</h2><p>Veja o que está a acontecer no seu escritório hoje.</p></div><button className="admin-primary-button" onClick={() => setSection('Agendamentos')}>Ver agenda <ArrowUpRight aria-hidden="true" /></button></div>
      <div className="admin-stats"><StatCard label="Clientes ativos" value="128" detail="+12% este mês" icon={Users} /><StatCard label="Agendamentos" value="24" detail="7 aguardam confirmação" icon={CalendarDays} /><StatCard label="Serviços ativos" value="06" detail="Todos publicados" icon={BriefcaseBusiness} /><StatCard label="Receita mensal" value="4.280.000 Kz" detail="+8,4% este mês" icon={CircleDollarSign} /></div>
      <div className="admin-content-grid">
        <section className="admin-panel admin-activity-panel"><div className="admin-panel-heading"><div><p className="admin-eyebrow">ATIVIDADE RECENTE</p><h3>Últimas atualizações</h3></div><button className="admin-text-button">Ver tudo <ChevronRight aria-hidden="true" /></button></div><div className="admin-activity-list">{activities.map(([title, meta, status]) => <div className="admin-activity-row" key={title}><div className="admin-activity-icon"><Activity aria-hidden="true" /></div><div><strong>{title}</strong><span>{meta}</span></div><span className={`admin-status admin-status--${status.toLowerCase()}`}>{status}</span></div>)}</div></section>
        <section className="admin-panel admin-quick-panel"><p className="admin-eyebrow">ACESSO RÁPIDO</p><h3>Ações frequentes</h3><div className="admin-quick-links"><button onClick={() => setSection('Clientes')}><Users aria-hidden="true" /><span>Adicionar cliente</span><ChevronRight aria-hidden="true" /></button><button onClick={() => setSection('Agendamentos')}><CalendarDays aria-hidden="true" /><span>Novo agendamento</span><ChevronRight aria-hidden="true" /></button><button onClick={() => setSection('Serviços')}><FileText aria-hidden="true" /><span>Gerir serviços</span><ChevronRight aria-hidden="true" /></button></div></section>
      </div>
    </>
  )
}

function SectionView({ section }: { section: Section }) {
  const descriptions: Record<Exclude<Section, 'Visão geral'>, string> = { Clientes: 'Consulte e acompanhe a sua carteira de clientes.', Serviços: 'Mantenha os serviços e áreas de atuação atualizados.', Agendamentos: 'Organize consultas e compromissos da equipa.', Utilizadores: 'Controle os acessos e permissões do painel.', Configurações: 'Personalize as preferências do seu escritório.' }
  return <div className="admin-page-heading"><div><p className="admin-eyebrow">PAINEL ADMINISTRATIVO</p><h2>{section}</h2><p>{descriptions[section as Exclude<Section, 'Visão geral'>]}</p></div><button className="admin-primary-button">Adicionar <ArrowUpRight aria-hidden="true" /></button><section className="admin-panel admin-placeholder-panel"><Search aria-hidden="true" /><strong>Área de {section.toLowerCase()}</strong><span>Esta secção está pronta para receber os dados reais da aplicação.</span></section></div>
}

export default function AdminPage() {
  const [section, setSection] = useState<Section>('Visão geral')
  const [mobileOpen, setMobileOpen] = useState(false)

  const selectSection = (next: Section) => { setSection(next); setMobileOpen(false) }

  return <main className="admin-shell">
    <aside className={`admin-sidebar ${mobileOpen ? 'admin-sidebar--open' : ''}`}><div className="admin-brand"><span>MV</span><div><strong>ADVOGADO</strong><small>PAINEL ADMINISTRATIVO</small></div><button className="admin-close-menu" onClick={() => setMobileOpen(false)} aria-label="Fechar menu"><X /></button></div><nav className="admin-nav" aria-label="Menu administrativo">{navigation.map(({ label, icon: Icon }) => <button key={label} onClick={() => selectSection(label)} className={section === label ? 'admin-nav-item admin-nav-item--active' : 'admin-nav-item'} aria-current={section === label ? 'page' : undefined}><Icon aria-hidden="true" /><span>{label}</span>{label === 'Agendamentos' && <b>7</b>}</button>)}</nav><div className="admin-sidebar-footer"><div className="admin-user"><div className="admin-avatar">MV</div><div><strong>Márcio Vieira</strong><span>Administrador</span></div></div><button className="admin-logout">Terminar sessão</button></div></aside>
    <div className="admin-main"><header className="admin-topbar"><button className="admin-mobile-toggle" onClick={() => setMobileOpen(true)} aria-label="Abrir menu"><Menu /></button><div className="admin-breadcrumb"><span>Painel</span><ChevronRight aria-hidden="true" /><strong>{section}</strong></div><div className="admin-top-actions"><button aria-label="Pesquisar"><Search /></button><button aria-label="Notificações" className="admin-notification"><Bell /><i /></button><div className="admin-top-avatar">MV</div></div></header><div className="admin-content">{section === 'Visão geral' ? <Overview setSection={setSection} /> : <SectionView section={section} />}</div></div>
  </main>
}
