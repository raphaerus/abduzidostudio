import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  Code, 
  Palette, 
  FileText, 
  Cpu, 
  Settings, 
  ArrowRight, 
  CheckCircle2, 
  Menu, 
  X, 
  MessageSquare,
  Sparkles,
  Info,
  ChevronRight,
  Send,
  ZoomIn,
  Layers
} from 'lucide-react';
import astronautImg from './assets/astronaut.png';
import { Logo } from './components/Logo';
import { ProjectLightbox, type ProjectData } from './components/ProjectLightbox';
import { realProjects } from './data/projects';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  tag: string;
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeProjectFilter, setActiveProjectFilter] = useState<string>('all');
  const [selectedBudgetService, setSelectedBudgetService] = useState<string>('Landing Pages');
  const [scrolled, setScrolled] = useState(false);
  
  // Lightbox Modal State
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [initialImageIndex, setInitialImageIndex] = useState(0);

  const openLightbox = (project: ProjectData, index: number = 0) => {
    setSelectedProject(project);
    setInitialImageIndex(index);
    setIsLightboxOpen(true);
  };

  // WhatsApp Link Helper
  const getWhatsAppLink = (message: string) => {
    const phone = "5596981172998";
    return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services: Service[] = [
    {
      icon: <FileText className="w-6 h-6 text-brand-blue" />,
      title: "Landing Pages",
      description: "Páginas de alta conversão, desenhadas sob medida para apresentar, vender produtos ou captar leads com máxima clareza e velocidade.",
      tag: "Conversão"
    },
    {
      icon: <Globe className="w-6 h-6 text-brand-blue" />,
      title: "Sites Institucionais",
      description: "Presença digital robusta e profissional para empresas, startups e autônomos que buscam autoridade, solidez e um design impecável.",
      tag: "Autoridade"
    },
    {
      icon: <Code className="w-6 h-6 text-brand-blue" />,
      title: "Blogs",
      description: "Estruturas otimizadas para SEO com carregamento ultra-rápido, facilitando a publicação de artigos e a captação de tráfego orgânico.",
      tag: "Conteúdo"
    },
    {
      icon: <Settings className="w-6 h-6 text-brand-blue" />,
      title: "Manutenção Web",
      description: "Suporte contínuo, atualizações técnicas, melhorias de performance e segurança para manter o seu site sempre estável e veloz.",
      tag: "Suporte"
    }
  ];

  const processSteps: ProcessStep[] = [
    {
      number: "01",
      title: "Diagnóstico",
      description: "Mapeamos os desafios da sua marca, concorrentes, público-alvo e os objetivos estratégicos do projeto."
    },
    {
      number: "02",
      title: "Direção Visual",
      description: "Definimos referências estéticas, moodboard, paleta de cores primárias e a arquitetura de informação ideal."
    },
    {
      number: "03",
      title: "Design",
      description: "Criamos as telas e interfaces prototipadas com foco na legibilidade, usabilidade e forte impacto visual."
    },
    {
      number: "04",
      title: "Desenvolvimento",
      description: "Programamos o site com código limpo, responsivo, integrado e otimizado para carregamento instantâneo."
    },
    {
      number: "05",
      title: "Publicação",
      description: "Colocamos o site em órbita na sua hospedagem configurando domínios, chaves de segurança e SEO técnico."
    },
    {
      number: "06",
      title: "Suporte",
      description: "Garantimos o acompanhamento inicial de dados, eventuais ajustes e melhorias para expandir sua plataforma."
    }
  ];

  const filteredProjects = activeProjectFilter === 'all' 
    ? realProjects 
    : realProjects.filter(p => p.category === activeProjectFilter);

  return (
    <div className="relative min-h-screen bg-brand-bg-white text-brand-text-dark font-montserrat antialiased overflow-x-hidden selection:bg-brand-turquoise/30">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Subtle top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[600px] bg-gradient-to-b from-brand-bg-orbital via-brand-bg-orbital/40 to-transparent rounded-full opacity-70 blur-3xl" />
        
        {/* Decorative Grid pattern (faded) */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,132,242,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,132,242,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-header py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#inicio" aria-label="Abduzido Studio Início">
            <Logo variant="header" size="md" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: 'Início', href: '#inicio' },
              { label: 'Serviços', href: '#servicos' },
              { label: 'Processo', href: '#processo' },
              { label: 'Projetos', href: '#projetos' },
              { label: 'Sobre', href: '#sobre' },
              { label: 'Contato', href: '#contato' }
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[13px] font-semibold tracking-wider text-brand-text-sec hover:text-brand-blue transition-colors relative group py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-blue transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Header Action Button */}
          <div className="hidden md:flex items-center">
            <a 
              href={getWhatsAppLink("Olá! Gostaria de solicitar um orçamento para o meu projeto.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-brand-blue text-white text-xs uppercase font-bold tracking-widest px-6 py-3 rounded-full shadow-lg shadow-brand-blue/15 hover:bg-brand-blue/90 hover:shadow-brand-turquoise/25 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              Solicitar Orçamento
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-brand-text-dark hover:text-brand-blue transition-colors"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 z-40 bg-brand-bg-white/98 backdrop-blur-md flex flex-col justify-center items-center transition-all duration-500 ease-in-out md:hidden ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <nav className="flex flex-col items-center gap-6">
          {[
            { label: 'Início', href: '#inicio' },
            { label: 'Serviços', href: '#servicos' },
            { label: 'Processo', href: '#processo' },
            { label: 'Projetos', href: '#projetos' },
            { label: 'Sobre', href: '#sobre' },
            { label: 'Contato', href: '#contato' }
          ].map((item, idx) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-bold tracking-wide text-brand-text-dark hover:text-brand-blue transition-colors"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              {item.label}
            </a>
          ))}
          <a
            href={getWhatsAppLink("Olá! Gostaria de solicitar um orçamento para o meu projeto.")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-6 inline-flex items-center gap-2 bg-brand-blue text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-brand-blue/20 hover:bg-brand-blue/90"
          >
            Solicitar Orçamento
          </a>
        </nav>
      </div>

      {/* 1. HERO SECTION (Decolagem) */}
      <section id="inicio" className="relative z-10 pt-36 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Typography */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left z-20">
            {/* Main Title */}
            <h1 className="text-fluid-hero leading-[1.1] font-black tracking-tight text-brand-text-dark mb-6">
              Sua marca fora da <br className="hidden md:inline"/>
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-[#00bebe]">
                órbita do comum
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-turquoise/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,7 C30,2 70,2 100,7" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>
              <span className="text-brand-turquoise">.</span>
            </h1>

            {/* Subtext */}
            <p className="text-fluid-body leading-fluid-relaxed text-brand-text-sec max-w-prose mb-10 font-medium">
              Criamos sites institucionais, landing pages de alta conversão e estruturas web modernas para marcas que querem se destacar com velocidade, clareza e direção técnica.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a 
                href={getWhatsAppLink("Olá! Vim pelo site e gostaria de saber mais sobre como decolar meu projeto digital.")}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 bg-brand-blue text-white font-bold text-xs uppercase tracking-wider px-8 py-5 rounded-full shadow-lg shadow-brand-blue/20 hover:bg-brand-blue/95 hover:shadow-brand-turquoise/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                Quero decolar meu projeto
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#servicos"
                className="inline-flex items-center justify-center bg-white text-brand-blue border border-brand-blue/25 font-bold text-xs uppercase tracking-wider px-8 py-5 rounded-full hover:bg-brand-bg-orbital/50 hover:border-brand-blue/50 transition-colors duration-300"
              >
                Ver Serviços
              </a>
            </div>

            {/* Quick Metrics / Badges */}
            <div className="mt-12 flex flex-wrap justify-center md:justify-start gap-6 opacity-80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-turquoise" />
                <span className="text-sm font-semibold text-brand-text-sec">Design Exclusivo</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-turquoise" />
                <span className="text-sm font-semibold text-brand-text-sec">Código Otimizado</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-turquoise" />
                <span className="text-sm font-semibold text-brand-text-sec">Suporte Dedicado</span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Astronaut Layout */}
          <div className="relative flex justify-center items-center min-h-[350px] md:min-h-[500px]">
            {/* Spinning decorative orbits */}
            <div className="absolute w-[320px] h-[320px] md:w-[480px] md:h-[480px] border border-brand-blue/10 rounded-full animate-spin-slow pointer-events-none" />
            <div className="absolute w-[240px] h-[240px] md:w-[360px] md:h-[360px] border border-dashed border-brand-turquoise/15 rounded-full animate-spin-slow duration-10000 pointer-events-none" />
            
            {/* Soft decorative light orbits inside */}
            <div className="absolute w-2 h-2 bg-brand-turquoise rounded-full top-[10%] left-[20%] animate-pulse" />
            <div className="absolute w-3.5 h-3.5 bg-brand-blue rounded-full bottom-[15%] right-[20%] animate-pulse duration-1500" />
            <div className="absolute w-1.5 h-1.5 bg-brand-yellow rounded-full top-[30%] right-[10%]" />

            {/* Astronaut Mascot */}
            <div className="relative z-10 animate-float">
              <img 
                src={astronautImg} 
                alt="Mascote Astronauta Abduzido" 
                width="420"
                height="420"
                fetchPriority="high"
                decoding="async"
                className="w-[280px] md:w-[420px] h-auto drop-shadow-[0_20px_50px_rgba(6,132,242,0.15)] object-contain"
              />
              {/* Blur behind astronaut to emphasize depth */}
              <div className="absolute -inset-4 bg-brand-turquoise/10 filter blur-xl rounded-full z-[-1]" />
            </div>

            {/* Floating micro glass-card to illustrate expertise */}
            <div className="absolute top-[25%] left-[5%] md:left-0 glass-card p-4 rounded-2xl flex items-center gap-3 animate-float duration-3000 pointer-events-none z-20">
              <div className="w-8 h-8 rounded-lg bg-brand-turquoise/10 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-brand-blue" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-blue">Estação Web</span>
                <span className="text-xs font-bold text-brand-text-dark">100% Responsivo</span>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* 2. SERVIÇOS SECTION */}
      <section id="servicos" className="relative z-20 py-24 px-6 bg-brand-bg-white border-t border-brand-blue/5">
        <div className="max-w-7xl mx-auto">
          {/* Header Area */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-blue bg-brand-blue/5 px-4.5 py-1.5 rounded-full">
              Como ajudamos você
            </span>
            <h2 className="text-fluid-h2 font-black text-brand-text-dark tracking-tight mt-4 mb-4">
              Como ajudamos sua marca a decolar
            </h2>
            <p className="text-fluid-body text-brand-text-sec leading-fluid-relaxed max-w-2xl mx-auto">
              Do primeiro rascunho visual ao lançamento operacional na nuvem, criamos soluções inteligentes e elegantes para sua presença digital sair definitivamente do improviso.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="glass-card p-8 rounded-2xl flex flex-col justify-between items-start text-left relative group overflow-hidden"
              >
                {/* Turquoise indicator top right */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-brand-turquoise/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tr-2xl" />

                <div>
                  {/* Icon Container */}
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/5 flex items-center justify-center mb-6 group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                    {React.cloneElement(service.icon as React.ReactElement<{ className?: string }>, { className: 'w-6 h-6 text-brand-blue group-hover:text-white transition-colors duration-300' })}
                  </div>
                  
                  {/* Category Badge */}
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-brand-blue bg-brand-blue/5 px-2.5 py-1 rounded">
                    {service.tag}
                  </span>
                  
                  {/* Title */}
                  <h3 className="text-fluid-h3 font-bold text-brand-text-dark mt-4 mb-3">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-fluid-body leading-fluid-relaxed text-brand-text-sec">
                    {service.description}
                  </p>
                </div>

                {/* Arrow link decoration */}
                <div className="mt-8 flex items-center gap-1.5 text-xs font-bold text-brand-blue group-hover:text-brand-turquoise transition-colors duration-300">
                  <span>Saber mais</span>
                  <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MANIFESTO SECTION (Dobra emocional) */}
      <section className="relative z-10 py-24 px-6 bg-brand-bg-orbital/45 text-center overflow-hidden">
        {/* Subtle decorative orbits in manifesto */}
        <div className="absolute top-1/2 left-10 w-48 h-48 border border-brand-blue/5 rounded-full -translate-y-1/2 pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-72 h-72 border border-dashed border-brand-turquoise/10 rounded-full -translate-y-1/2 pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Decorative quote icon */}
          <div className="font-serif text-6xl text-brand-blue/15 leading-none h-6 select-none">“</div>
          
          <h3 className="font-alegreya italic text-fluid-h2 leading-relaxed text-brand-text-dark max-w-3xl mx-auto my-6 font-medium">
            A internet está cheia de sites esquecíveis. A gente acredita em projetos com <span className="text-brand-blue font-bold not-italic">intenção</span>, beleza e <span className="text-brand-blue font-bold not-italic">direção</span>. Cada marca tem uma órbita própria. Nosso trabalho é ajudar você a encontrar a sua.
          </h3>
          
          <div className="font-serif text-6xl text-brand-blue/15 leading-none h-6 select-none -mt-3">”</div>

          <div className="flex justify-center items-center gap-3 mt-8">
            <span className="w-8 h-[1px] bg-brand-blue/30" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-brand-blue font-montserrat">
              Abduzido Manifesto
            </span>
            <span className="w-8 h-[1px] bg-brand-blue/30" />
          </div>
        </div>
      </section>

      {/* 4. PROCESSO SECTION (Escuro Espacial) */}
      <section id="processo" className="relative z-20 py-24 px-6 bg-brand-bg-dark text-white overflow-hidden stars-bg">
        {/* Dark theme glow layers */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-blue/10 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-turquoise/15 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20 relative z-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-turquoise bg-brand-turquoise/10 px-4.5 py-1.5 rounded-full border border-brand-turquoise/20">
              Passo a Passo
            </span>
            <h2 className="text-fluid-h2 font-black text-brand-text-light tracking-tight mt-4 mb-4">
              Da ideia ao lançamento, sem se perder no espaço
            </h2>
            <p className="text-fluid-body text-slate-300 leading-fluid-relaxed max-w-2xl mx-auto">
              Cada projeto segue uma rota perfeitamente traçada, garantindo organização, transparência e controle técnico em todas as etapas de voo.
            </p>
          </div>

          {/* Timeline - responsive grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div 
                key={index} 
                className="glass-card-dark p-8 rounded-2xl relative flex flex-col justify-between overflow-hidden group border border-slate-700/30"
              >
                {/* Hologram neon vertical bar */}
                <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-brand-blue to-brand-turquoise transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                
                <div>
                  {/* Step Number */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-black font-mono tracking-tighter text-slate-700/50 group-hover:text-brand-turquoise/35 transition-colors duration-300">
                      {step.number}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-turquoise animate-pulse-slow" />
                  </div>

                  {/* Title */}
                  <h3 className="text-fluid-h3 font-bold text-white mb-3 tracking-tight">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-fluid-body leading-fluid-relaxed text-slate-300 group-hover:text-white transition-colors">
                    {step.description}
                  </p>
                </div>

                {/* Micro orbit indicator footer */}
                <div className="mt-8 pt-4 border-t border-slate-800/40 flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-slate-500">
                  <span>Fase operacional</span>
                  <Rocket className="w-3.5 h-3.5 text-slate-600 group-hover:text-brand-turquoise group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))}
          </div>

          {/* Decorative Orbital Connector Line (Faded in background on desktop) */}
          <div className="mt-16 text-center">
            <a 
              href={getWhatsAppLink("Olá! Gostaria de fazer o diagnóstico inicial do meu projeto de forma gratuita.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-turquoise hover:text-white transition-colors group"
            >
              Iniciar diagnóstico gratuito
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* 5. PROJETOS SECTION */}
      <section id="projetos" className="relative z-20 py-24 px-6 bg-brand-bg-white border-t border-brand-blue/5">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="max-w-xl text-left">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-blue bg-brand-blue/5 px-4.5 py-1.5 rounded-full">
                Estação de Cases
              </span>
              <h2 className="text-fluid-h2 font-black text-brand-text-dark tracking-tight mt-4 mb-4">
                Missões que já passaram pela nossa estação
              </h2>
              <p className="text-fluid-body text-brand-text-sec leading-fluid-relaxed max-w-2xl">
                Conheça alguns dos projetos e estruturas web reais desenvolvidas pelo studio. Clique em qualquer case para abrir o álbum de telas com zoom interativo.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mt-8 md:mt-0 bg-brand-blue/5 p-1 rounded-xl border border-brand-blue/10">
              {[
                { id: 'all', label: 'Todos os Cases' },
                { id: 'institucional', label: 'Sites Institucionais' },
                { id: 'landing', label: 'Landing Pages' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveProjectFilter(tab.id)}
                  className={`text-xs font-bold px-4 py-2.5 rounded-lg transition-all duration-300 ${activeProjectFilter === tab.id ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/15' : 'text-brand-text-sec hover:text-brand-blue'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="glass-card p-6 rounded-3xl flex flex-col justify-between items-start text-left border border-brand-blue/15 hover:border-brand-turquoise/60 transition-all duration-400 group relative overflow-hidden"
              >
                <div className="w-full">
                  {/* Top metadata */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-blue bg-brand-blue/5 px-3 py-1 rounded-full border border-brand-blue/10">
                      {project.categoryLabel}
                    </span>
                    {/* Screen counter trigger */}
                    <button
                      onClick={() => openLightbox(project, 0)}
                      className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-brand-turquoise/10 text-brand-blue border border-brand-turquoise/30 hover:bg-brand-turquoise hover:text-white transition-all flex items-center gap-1.5 group/badge"
                      title="Abrir álbum de telas"
                    >
                      <Layers className="w-3 h-3 text-brand-blue group-hover/badge:text-white transition-colors" />
                      <span>{project.images.length} telas</span>
                    </button>
                  </div>

                  {/* Visual Cover Container (Interactive Browser Window Preview) */}
                  <div 
                    onClick={() => openLightbox(project, 0)}
                    className="w-full h-56 rounded-2xl bg-slate-900 border border-brand-blue/15 overflow-hidden mb-6 relative cursor-pointer group/cover shadow-md"
                  >
                    {/* Simulated browser top bar */}
                    <div className="absolute top-0 left-0 right-0 h-6 bg-slate-900/90 backdrop-blur-sm z-20 px-3 flex items-center justify-between border-b border-slate-800">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-400/80" />
                        <span className="w-2 h-2 rounded-full bg-yellow-400/80" />
                        <span className="w-2 h-2 rounded-full bg-green-400/80" />
                      </div>
                      <span className="text-[9px] font-mono text-slate-400 truncate max-w-[150px]">
                        {project.title.toLowerCase().replace(/\s+/g, '-')}
                      </span>
                      <div className="w-6" />
                    </div>

                    {/* Screenshot Cover Image */}
                    <img 
                      src={project.cover} 
                      alt={project.title}
                      className="w-full h-full object-cover object-top pt-6 transform group-hover/cover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Hover Overlay with Zoom Action */}
                    <div className="absolute inset-0 pt-6 bg-brand-bg-deep/75 backdrop-blur-[2px] opacity-0 group-hover/cover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 z-20">
                      <div className="w-12 h-12 rounded-full bg-brand-blue text-white flex items-center justify-center shadow-lg shadow-brand-blue/40 transform scale-75 group-hover/cover:scale-100 transition-transform duration-300">
                        <ZoomIn className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Explorar Álbum &bull; {project.images.length} telas
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-fluid-h3 font-bold text-brand-text-dark mb-2 tracking-tight">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-fluid-body leading-fluid-relaxed text-brand-text-sec mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-[9px] font-bold text-brand-text-sec bg-brand-blue/5 border border-brand-blue/10 px-2.5 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer action */}
                <div className="w-full pt-4 border-t border-brand-blue/10 flex items-center justify-between">
                  <button
                    onClick={() => openLightbox(project, 0)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue hover:text-brand-turquoise transition-colors group/btn"
                  >
                    <Layers className="w-3.5 h-3.5 text-brand-blue group-hover/btn:text-brand-turquoise" />
                    <span>Ver detalhes</span>
                    <ChevronRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <a 
                    href={getWhatsAppLink(`Olá! Gostaria de falar sobre um projeto web similar ao case: "${project.title}"`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold text-slate-400 hover:text-brand-blue transition-colors"
                  >
                    Fazer orçamento &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SOBRE SECTION */}
      <section id="sobre" className="relative z-10 py-24 px-6 bg-brand-bg-orbital/30 overflow-hidden border-t border-b border-brand-blue/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Visual column: Mascot and Badge Grid */}
          <div className="relative order-2 lg:order-1 flex justify-center">
            {/* Soft background glow */}
            <div className="absolute inset-0 bg-brand-blue/5 rounded-3xl filter blur-xl" />

            <div className="glass-card p-8 rounded-3xl w-full max-w-lg z-10 border border-brand-blue/15 relative">
              
              {/* Badge elements */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/80 backdrop-blur p-5 rounded-2xl border border-brand-blue/5 text-left flex flex-col">
                  <Palette className="w-5 h-5 text-brand-blue mb-3" />
                  <span className="text-xs font-extrabold uppercase tracking-wide text-brand-blue mb-1">Design UI/UX</span>
                  <span className="text-[10px] text-brand-text-sec leading-snug">Visual sofisticado, focado em clareza comercial e navegação fluida.</span>
                </div>
                <div className="bg-white/80 backdrop-blur p-5 rounded-2xl border border-brand-blue/5 text-left flex flex-col">
                  <Code className="w-5 h-5 text-brand-blue mb-3" />
                  <span className="text-xs font-extrabold uppercase tracking-wide text-brand-blue mb-1">Dev Otimizado</span>
                  <span className="text-[10px] text-brand-text-sec leading-snug">Estrutura ágil, limpa e pensada para carregar instantaneamente.</span>
                </div>
                <div className="bg-white/80 backdrop-blur p-5 rounded-2xl border border-brand-blue/5 text-left flex flex-col">
                  <Sparkles className="w-5 h-5 text-brand-blue mb-3" />
                  <span className="text-xs font-extrabold uppercase tracking-wide text-brand-blue mb-1">Next.js & Tailwind</span>
                  <span className="text-[10px] text-brand-text-sec leading-snug">Stack padrão moderna de alta performance, SEO e fidelidade visual.</span>
                </div>
                <div className="bg-white/80 backdrop-blur p-5 rounded-2xl border border-brand-blue/5 text-left flex flex-col">
                  <Cpu className="w-5 h-5 text-brand-blue mb-3" />
                  <span className="text-xs font-extrabold uppercase tracking-wide text-brand-blue mb-1">Suporte Tech</span>
                  <span className="text-[10px] text-brand-text-sec leading-snug">Manutenção contínua de performance e hospedagem.</span>
                </div>
              </div>

              {/* Quick stats banner inside card */}
              <div className="mt-6 bg-brand-blue text-white p-4 rounded-xl flex items-center justify-around text-center">
                <div>
                  <div className="text-xl font-black">100%</div>
                  <div className="text-[9px] uppercase font-bold tracking-widest text-brand-bg-orbital">Projetos Autorais</div>
                </div>
                <div className="w-[1px] h-8 bg-white/20" />
                <div>
                  <div className="text-xl font-black">Next.js / Tailwind</div>
                  <div className="text-[9px] uppercase font-bold tracking-widest text-brand-bg-orbital">Stack Padrão</div>
                </div>
              </div>
            </div>
          </div>

          {/* Text content column */}
          <div className="text-center lg:text-left order-1 lg:order-2 z-20">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-blue bg-brand-blue/5 px-4.5 py-1.5 rounded-full">
              Tripulação
            </span>
            <h2 className="text-fluid-h2 font-black text-brand-text-dark tracking-tight mt-4 mb-6">
              Um studio pequeno com visão de universo
            </h2>
            
            <div className="space-y-6 text-fluid-body text-brand-text-sec leading-fluid-relaxed max-w-prose">
              <p>
                O <strong>Abduzido Studio</strong> nasceu da fusão apaixonada entre design de alta qualidade, desenvolvimento web focado em desempenho e criatividade prática orientada a resultados comerciais.
              </p>
              <p>
                Aqui, tratamos cada projeto de cliente como uma missão espacial única: primeiro entendemos a órbita e o destino desejado, traçamos a rota de navegação mais inteligente e construímos uma presença digital impecável que se conecta com quem cria e com quem acessa.
              </p>
              <p>
                Nosso compromisso é ajudar micro e médias empresas, além de profissionais autônomos e startups, a eliminarem a barreira da comunicação amadora ou genérica. Colocamos sua marca em destaque comercial com acabamento premium e máxima leveza.
              </p>
            </div>

            {/* Acting badges */}
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-2.5">
              {['Landing Pages', 'Sites Institucionais', 'Blogs Otimizados', 'Next.js', 'Tailwind CSS', 'Suporte Técnico'].map((badge) => (
                <span 
                  key={badge} 
                  className="text-[10px] font-bold text-brand-blue bg-brand-blue/5 border border-brand-blue/15 px-3 py-1.5 rounded-full"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 7. INTERACTIVE QUOTE CALCULATOR SECTION (Premium micro-feature) */}
      <section className="relative z-20 py-24 px-6 bg-brand-bg-white border-b border-brand-blue/5">
        <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 rounded-3xl text-left relative overflow-hidden">
          
          {/* Subtle turquoise aura */}
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-brand-turquoise/15 rounded-full filter blur-xl pointer-events-none" />
          
          <div className="relative z-10">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-brand-blue">
              Decolagem Imediata
            </span>
            <h3 className="text-fluid-h2 font-black text-brand-text-dark tracking-tight mt-2 mb-4">
              Qual é a próxima missão da sua marca?
            </h3>
            <p className="text-fluid-body text-brand-text-sec leading-fluid-relaxed max-w-2xl mb-8">
              Selecione o serviço que seu negócio precisa no momento e clique no botão abaixo. A IA preparará uma mensagem de apresentação perfeita para o nosso WhatsApp.
            </p>

            {/* Button selectors */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {[
                "Landing Pages",
                "Sites Institucionais",
                "Blogs Otimizados",
                "Manutenção Web"
              ].map((serviceName) => (
                <button
                  key={serviceName}
                  onClick={() => setSelectedBudgetService(serviceName)}
                  className={`text-xs font-bold p-4 rounded-xl border text-center transition-all ${selectedBudgetService === serviceName ? 'bg-brand-blue text-white border-brand-blue shadow-md' : 'bg-white text-brand-text-sec border-brand-blue/10 hover:border-brand-blue/35'}`}
                >
                  {serviceName}
                </button>
              ))}
            </div>

            {/* Interactive WhatsApp Direct Action */}
            <div className="bg-brand-bg-orbital/40 p-5 rounded-2xl border border-brand-blue/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-extrabold uppercase tracking-wide text-brand-blue">Mensagem Preparada</span>
                  <p className="text-xs text-brand-text-sec italic mt-0.5 leading-snug">
                    "Olá Abduzido Studio! Gostaria de fazer um orçamento estratégico para a criação de {selectedBudgetService}."
                  </p>
                </div>
              </div>
              <a
                href={getWhatsAppLink(`Olá Abduzido Studio! Gostaria de fazer um orçamento estratégico para a criação de ${selectedBudgetService}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-brand-blue text-white font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-xl hover:bg-brand-blue/95 shrink-0 transition-colors shadow-md shadow-brand-blue/10"
              >
                Decolar no WhatsApp
                <Send className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 8. CTA FINAL SECTION (Chamada para decolagem - Escuro Espacial) */}
      <section id="contato" className="relative z-20 py-24 px-6 bg-brand-bg-dark text-white text-center stars-bg">
        {/* Glow light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-blue/15 rounded-full filter blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
          {/* Pulse mini rocket */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-blue to-brand-turquoise flex items-center justify-center mb-8 shadow-lg shadow-brand-blue/30 animate-float">
            <Rocket className="w-7 h-7 text-white" />
          </div>

          <h2 className="text-fluid-hero font-black text-brand-text-light tracking-tight max-w-3xl mb-6 leading-tight">
            Pronto para tirar sua marca do piloto automático?
          </h2>
          
          <p className="text-fluid-body leading-fluid-relaxed text-slate-300 max-w-2xl mb-12">
            Compartilhe sua ideia, seu problema técnico ou seu novo projeto de design conosco. Nós ajudamos a planejar, projetar e subir uma presença digital impecável.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a 
              href={getWhatsAppLink("Olá! Quero entrar em contato direto para conhecer o Abduzido Studio e tirar minha presença digital do piloto automático.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-brand-blue hover:bg-brand-blue/95 text-white font-bold text-xs uppercase tracking-wider px-8 py-5 rounded-full shadow-lg shadow-brand-blue/30 hover:shadow-brand-turquoise/30 hover:shadow-xl transition-all duration-300"
            >
              <MessageSquare className="w-4 h-4" />
              Chamar no WhatsApp
            </a>
            <a 
              href="#servicos" 
              className="inline-flex items-center justify-center bg-transparent hover:bg-white/5 border border-slate-700 hover:border-slate-500 text-white font-bold text-xs uppercase tracking-wider px-8 py-5 rounded-full transition-colors duration-300"
            >
              Explorar Serviços
            </a>
          </div>

          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-brand-turquoise mt-8 animate-pulse">
            Sua órbita comercial começa agora
          </span>
        </div>
      </section>

      {/* 9. FOOTER (Base Terrestre) */}
      <footer className="relative z-20 bg-brand-bg-deep text-slate-400 py-16 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
          
          {/* Logo & Slogan Column */}
          <div className="flex flex-col items-start gap-4">
            <a href="#inicio" aria-label="Abduzido Studio Início">
              <Logo variant="footer" size="sm" />
            </a>
            <p className="text-xs leading-relaxed text-slate-400 mt-2">
              Design estratégico, tecnologia moderna com Next.js &amp; Tailwind CSS e desenvolvimento web de alta performance. Sua presença online fora do comum.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white text-xs uppercase font-extrabold tracking-widest mb-6">Navegação</h4>
            <ul className="space-y-3.5 text-xs font-semibold">
              <li><a href="#inicio" className="hover:text-brand-turquoise transition-colors">Início</a></li>
              <li><a href="#servicos" className="hover:text-brand-turquoise transition-colors">Serviços</a></li>
              <li><a href="#processo" className="hover:text-brand-turquoise transition-colors">Processo operacional</a></li>
              <li><a href="#projetos" className="hover:text-brand-turquoise transition-colors">Cases Realizados</a></li>
            </ul>
          </div>

          {/* Services shortcuts */}
          <div>
            <h4 className="text-white text-xs uppercase font-extrabold tracking-widest mb-6">Soluções</h4>
            <ul className="space-y-3.5 text-xs">
              <li><a href="#servicos" className="hover:text-brand-turquoise transition-colors">Landing Pages</a></li>
              <li><a href="#servicos" className="hover:text-brand-turquoise transition-colors">Sites Institucionais</a></li>
              <li><a href="#servicos" className="hover:text-brand-turquoise transition-colors">Blogs de Conteúdo</a></li>
              <li><a href="#servicos" className="hover:text-brand-turquoise transition-colors">Manutenção e Suporte</a></li>
            </ul>
          </div>

          {/* Contact and credentials */}
          <div>
            <h4 className="text-white text-xs uppercase font-extrabold tracking-widest mb-6">Base Terrestre</h4>
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-turquoise" />
                <span className="font-bold text-white">WhatsApp:</span> 
                <a href={getWhatsAppLink("Olá Abduzido!")} target="_blank" rel="noopener noreferrer" className="hover:text-brand-turquoise underline">
                  96 98117-2998
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-turquoise" />
                <span className="font-bold text-white">Instagram:</span> 
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-turquoise">
                  @abduzidostudio
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-turquoise" />
                <span className="text-slate-400">Atendimento 100% digital</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <span>&copy; {new Date().getFullYear()} Abduzido Studio. Todos os direitos reservados.</span>
          <div className="flex items-center gap-4 font-semibold">
            <a href="#inicio" className="hover:text-white transition-colors">Termos de Uso</a>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <a href="#inicio" className="hover:text-white transition-colors">Políticas de Privacidade</a>
          </div>
        </div>
      </footer>

      {/* LIGHTBOX MODAL */}
      <ProjectLightbox 
        key={selectedProject ? `${selectedProject.id}-${initialImageIndex}` : 'empty'}
        project={selectedProject} 
        isOpen={isLightboxOpen} 
        initialImageIndex={initialImageIndex} 
        onClose={() => setIsLightboxOpen(false)} 
      />

    </div>
  );
}

// Inline fallback for Globe icon to avoid import issue in standard packages if missing
function Globe(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}
