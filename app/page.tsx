'use client'

import { useState } from 'react'
import { ArrowUpRight, ChevronDown, ChevronRight, Menu, X, Scale, BriefcaseBusiness, FileText, ShieldCheck, Landmark, Gavel, MessageCircle, Mail, Phone, MapPin, Clock3 } from 'lucide-react'

const officeImage = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FireShot%20Capture%20063%20-%20MV%20ADVOGADO%20-%20Google%20Maps%20-%20%5Bwww.google.com%5D-LctlSW3rBALqj1iaV8TlnQClDU89ph.png'
const identityImage = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FireShot%20Capture%20065%20-%20MV%20ADVOGADO%20-%20Google%20Maps%20-%20%5Bwww.google.com%5D-UATnZLgVLfrOdknLCdB7qYt3cwAuvT.png'
const counselImage = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-08-20%20at%204.53.14%20PM-CiMEafnebAdpiT48bXp65uM5jDsDr4.jpeg'
const whatsappNumber = '244955465133'
const officePhoneOne = '943 047 029'
const officePhoneTwo = '955 465 133'
const officeAddress = 'Av. Salvador Correia, Lobito'
const officeEmail = 'mclabrinha19@gmail.com'
const officeMap = 'https://www.google.com/maps?q=Av.+Salvador+Correia,+Lobito,+Angola&output=embed'
const openingHours = [['domingo', 'Fechado'], ['segunda-feira', '08:00–18:00'], ['terça-feira', '08:00–18:00'], ['quarta-feira', '08:00–18:00'], ['quinta-feira', '08:00–18:00'], ['sexta-feira', '08:00–18:00'], ['sábado', 'Fechado']] as const

const areas = [
  ['Direito Empresarial', 'Assessoria jurídica para empresas, empresários e operações comerciais.', BriefcaseBusiness],
  ['Direito Civil', 'Atuação em relações contratuais, obrigações e questões de natureza civil.', Scale],
  ['Direito Laboral', 'Assessoria jurídica em relações entre empregadores e trabalhadores.', FileText],
  ['Direito Comercial', 'Apoio jurídico para negócios, contratos e relações comerciais.', Landmark],
  ['Contencioso e Litígios', 'Representação e estratégia jurídica para resolução de conflitos.', Gavel],
  ['Consultoria Jurídica', 'Orientação preventiva para decisões mais seguras.', ShieldCheck],
] as const

const pillars = [
  ['01', 'Visão Estratégica', 'Não analisamos apenas o problema. Procuramos compreender o contexto e antecipar riscos.'],
  ['02', 'Atendimento Personalizado', 'Cada cliente recebe uma abordagem adequada à sua realidade.'],
  ['03', 'Rigor Técnico', 'Decisões apoiadas em análise jurídica cuidadosa e fundamentada.'],
  ['04', 'Confidencialidade', 'Tratamos cada relação profissional com máxima discrição e responsabilidade.'],
]

const insights = [
  ['Análise', 'Contratos empresariais: o que deve ser analisado antes de assinar?', 'Conteúdo editável para o futuro centro de insights da MV-Advogado.'],
  ['Estratégia', 'Como reduzir riscos jurídicos numa empresa?', 'Conteúdo editável para o futuro centro de insights da MV-Advogado.'],
  ['Prevenção', 'A importância da assessoria jurídica preventiva', 'Conteúdo editável para o futuro centro de insights da MV-Advogado.'],
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  if (typeof window !== 'undefined') window.onscroll = () => setScrolled(window.scrollY > 24)

  const closeMenu = () => setMenuOpen(false)
  const nav = [['O Escritório', '#escritorio'], ['Áreas de Atuação', '#atuacao'], ['Equipa', '#equipa'], ['Insights', '#insights'], ['Contactos', '#contactos']]

  return (
    <main>
      <header className={`site-header ${scrolled ? 'site-header--solid' : ''}`}>
        <a href="#inicio" className="brand" aria-label="MV-Advogado, início"><span>MV</span><b>ADVOGADO</b></a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#inicio">Início</a>{nav.map(([label, href]) => <a href={href} key={href}>{label}{label === 'Áreas de Atuação' && <ChevronDown aria-hidden="true" />}</a>)}
        </nav>
        <a className="header-cta" href="#contactos">Agendar Consulta <ArrowUpRight aria-hidden="true" /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
        {menuOpen && <nav className="mobile-nav" aria-label="Navegação mobile"><a href="#inicio" onClick={closeMenu}>Início</a>{nav.map(([label, href]) => <a href={href} key={href} onClick={closeMenu}>{label}</a>)}<a className="mobile-cta" href="#contactos" onClick={closeMenu}>Agendar Consulta <ArrowUpRight /></a></nav>}
      </header>

      <section id="inicio" className="hero" style={{ backgroundImage: `url(${officeImage})` }}>
        <div className="hero-overlay" />
        <div className="container hero-content reveal">
          <p className="eyebrow">MV-ADVOGADO <span>—</span> LOBITO, ANGOLA</p>
          <h1>Estratégia jurídica para decisões que exigem <em>confiança.</em></h1>
          <p className="hero-copy">Assessoria jurídica estratégica, personalizada e orientada para proteger interesses, reduzir riscos e criar segurança para pessoas e negócios.</p>
          <div className="button-row"><a className="button button-gold" href="#contactos">Agendar Consulta <ArrowUpRight /></a><a className="button button-ghost" href="#escritorio">Conhecer o Escritório</a></div>
          <p className="hero-signature">Excelência <i>•</i> Estratégia <i>•</i> Confiança</p>
        </div>
        <a className="scroll-cue" href="#credibilidade"><span /> Explorar</a>
      </section>

      <section id="credibilidade" className="trust-bar"><div className="container trust-grid">{[['Excelência Jurídica', 'Atendimento personalizado'], ['Visão Estratégica', 'Análise além do problema imediato'], ['Confidencialidade', 'Relações baseadas em confiança'], ['Compromisso', 'Foco nos interesses do cliente']].map(([title, text]) => <div className="trust-item" key={title}><span>{title}</span><small>{text}</small></div>)}</div></section>

      <section id="escritorio" className="section office-section"><div className="container split-grid"><div className="image-frame"><img src={officeImage} alt="Interior de escritório profissional da MV-Advogado" loading="lazy" /></div><div className="section-copy"><div className="identity-mark"><img src={identityImage} alt="Identidade visual Márcio Vieira, advogado e consultor jurídico" loading="lazy" /></div><p className="eyebrow eyebrow-dark">O ESCRITÓRIO</p><h2>Mais do que aconselhamento jurídico. <em>Estratégia.</em></h2><p>Na MV-Advogado, acreditamos que uma boa atuação jurídica começa pela compreensão profunda de cada situação.</p><p>Unimos conhecimento técnico, visão estratégica e atendimento próximo para oferecer soluções jurídicas adequadas às necessidades de cada cliente.</p><a className="text-link" href="#contactos">Conheça a MV-Advogado <ArrowUpRight /></a></div></div></section>

      <section id="atuacao" className="section areas-section"><div className="container"><div className="section-heading"><div><p className="eyebrow eyebrow-dark">O QUE FAZEMOS</p><h2>Áreas de <em>Atuação</em></h2></div><p>Conhecimento jurídico aplicado às decisões que realmente importam.</p></div><div className="areas-grid">{areas.map(([title, text, Icon]) => <article className="area-card" key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{text}</p><a href="#contactos">Saiba mais <ChevronRight /></a></article>)}</div></div></section>

      <section className="section pillars-section"><div className="container"><div className="section-heading light-heading"><div><p className="eyebrow">O NOSSO DIFERENCIAL</p><h2>Uma forma mais <em>segura</em> de decidir.</h2></div><p>Rigor, proximidade e visão para transformar complexidade em clareza.</p></div><div className="pillars-grid">{pillars.map(([number, title, text]) => <article className="pillar" key={number}><strong>{number}</strong><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

      <section className="section process-section"><div className="container"><div className="section-heading"><div><p className="eyebrow eyebrow-dark">COMO PODEMOS AJUDAR</p><h2>Da questão à <em>estratégia.</em></h2></div><p>Um acompanhamento claro, cuidadoso e alinhado com a sua realidade.</p></div><div className="process-grid">{[['01', 'Primeiro contacto', 'O cliente apresenta a sua necessidade.'], ['02', 'Análise', 'A equipa compreende o contexto e identifica os principais pontos jurídicos.'], ['03', 'Estratégia', 'É definida a abordagem jurídica mais adequada.'], ['04', 'Acompanhamento', 'O cliente recebe acompanhamento durante todo o processo.']].map(([n, t, d]) => <div className="process-step" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div><a className="button button-navy" href="#contactos">Falar com um Advogado <ArrowUpRight /></a></div></section>

      <section id="equipa" className="section team-section"><div className="container team-layout"><div><p className="eyebrow eyebrow-dark">PESSOAS POR TRÁS DA PRÁTICA</p><h2>Conheça a nossa <em>equipa.</em></h2><p>Profissionais preparados para compreender o que está em jogo e trabalhar consigo com discrição, clareza e rigor.</p><a className="text-link" href="#contactos">Falar com a equipa <ArrowUpRight /></a></div><div className="profile-card"><div className="profile-image"><div className="profile-placeholder">MV</div></div><div><p className="eyebrow eyebrow-dark">PERFIL EDITÁVEL</p><h3>[Nome do Advogado]</h3><p className="profile-role">Sócio / Advogado</p><p className="profile-specialty">[Especialidade jurídica]</p><a href="#contactos" className="text-link">Ver perfil <ArrowUpRight /></a></div></div></div></section>

      <section id="insights" className="section insights-section"><div className="container"><div className="section-heading"><div><p className="eyebrow eyebrow-dark">CONHECIMENTO PARTILHADO</p><h2>Insights <em>Jurídicos</em></h2></div><p>Informação jurídica para decisões mais conscientes.</p></div><div className="insights-grid">{insights.map(([category, title, summary]) => <article className="insight-card" key={title}><span>{category}</span><small>Conteúdo editável · 2026</small><h3>{title}</h3><p>{summary}</p><a href="#contactos">Ler artigo <ArrowUpRight /></a></article>)}</div></div></section>

      <section className="cta-section"><div className="container cta-inner"><p className="eyebrow">UM PRÓXIMO PASSO CLARO</p><h2>A sua questão jurídica merece uma <em>estratégia clara.</em></h2><p>Fale com a MV-Advogado e descubra como podemos analisar o seu caso.</p><div className="button-row"><a className="button button-gold" href="#contactos">Agendar Consulta <ArrowUpRight /></a><a className="button button-ghost" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">Falar pelo WhatsApp <MessageCircle /></a></div></div></section>

      <section className="section counsel-section"><div className="container counsel-grid"><div className="counsel-image"><img src={counselImage} alt="Advogado da MV-ADVOGADO a analisar documentação jurídica no escritório" loading="lazy" /></div><div><p className="eyebrow eyebrow-dark">ATUAÇÃO PRÓXIMA</p><h2>Conhecimento jurídico com <em>atenção ao detalhe.</em></h2><p>Uma imagem real do ambiente profissional e da dedicação que orientam cada análise, conversa e decisão.</p></div></div></section>

      <section id="contactos" className="section contact-section"><div className="container contact-grid"><div><p className="eyebrow eyebrow-dark">CONTACTOS</p><h2>Vamos conversar sobre a sua <em>questão jurídica.</em></h2><p>Partilhe connosco, de forma segura, o contexto da sua necessidade. A nossa equipa entrará em contacto consigo.</p><div className="contact-details"><div><Phone /><span>Telefone<strong>{officePhoneOne} · {officePhoneTwo}</strong></span></div><div><Mail /><span>Email<strong>{officeEmail}</strong></span></div><div><MapPin /><span>Morada<strong>{officeAddress}</strong></span></div></div><div className="opening-hours" aria-labelledby="opening-hours-title"><div className="opening-hours-heading"><Clock3 aria-hidden="true" /><h3 id="opening-hours-title">Horário de funcionamento</h3></div><p>Aberta com horário principal</p><dl>{openingHours.map(([day, hours]) => <div key={day}><dt>{day}</dt><dd>{hours}</dd></div>)}</dl></div></div><div className="map-card"><iframe title="Localização do escritório MV-ADVOGADO em Av. Salvador Correia, Lobito" src={officeMap} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></div></section>

      <footer className="footer"><div className="container footer-grid"><div><a className="brand brand-footer" href="#inicio"><span>MV</span><b>ADVOGADO</b></a><p>Estratégia jurídica.<br />Confiança para decidir.</p></div><div><h3>Explorar</h3><a href="#escritorio">O Escritório</a><a href="#atuacao">Áreas de Atuação</a><a href="#equipa">Equipa</a><a href="#insights">Insights</a></div><div><h3>Contactos</h3><a href="#contactos">Agendar Consulta</a><a href={`https://wa.me/${whatsappNumber}`}>WhatsApp</a><a href="#contactos">Política de Privacidade</a></div></div><div className="container footer-bottom"><span>© 2026 MV-Advogado. Todos os direitos reservados.</span><span>Lobito · Angola</span></div></footer>
      <a className="whatsapp" href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Olá, gostaria de obter informações sobre uma consulta jurídica com a MV-Advogado.')}`} target="_blank" rel="noreferrer" aria-label="Falar com a MV-Advogado pelo WhatsApp"><MessageCircle /></a>
    </main>
  )
}
