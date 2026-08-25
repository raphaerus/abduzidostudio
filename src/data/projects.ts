import type { ProjectData } from '../components/ProjectLightbox';

export const realProjects: ProjectData[] = [
  {
    id: 'cidades-invisiveis',
    title: 'Cidades Invisíveis, Pessoas Incríveis',
    category: 'institucional',
    categoryLabel: 'Portal Institucional',
    badge: 'Produção Web',
    description: 'Plataforma institucional e documental de impacto social com mapeamento comunitário, narrativas de lideranças e design moderno responsivo.',
    tags: ['Next.js', 'Tailwind CSS', 'Portal Web', 'Documental'],
    cover: '/projetos/cidades-invisiveis/cover.webp',
    images: [
      {
        src: '/projetos/cidades-invisiveis/screen_1.webp',
        title: 'Página Inicial / Hero',
        description: 'Apresentação do projeto social e chamada de impacto comunitário.'
      },
      {
        src: '/projetos/cidades-invisiveis/screen_4.webp',
        title: 'Quem Somos',
        description: 'História, missão e propósito central da iniciativa.'
      },
      {
        src: '/projetos/cidades-invisiveis/screen_5.webp',
        title: 'Sobre as Cidades',
        description: 'Mapeamento territorial e contexto das comunidades atendidas.'
      },
      {
        src: '/projetos/cidades-invisiveis/screen_3.webp',
        title: 'Líderes Comunitários',
        description: 'Destaque e homenagem às lideranças locais e agentes de transformação.'
      },
      {
        src: '/projetos/cidades-invisiveis/screen_2.webp',
        title: 'Galeria & Ações',
        description: 'Registros visuais e documentais das atividades no território.'
      }
    ]
  },
  {
    id: 'simt',
    title: 'SIMT — Saúde e Segurança no Trabalho',
    category: 'institucional',
    categoryLabel: 'Site Corporativo B2B',
    badge: 'Produção Web',
    description: 'Presença digital corporativa de alta credibilidade para empresa de engenharia ocupacional, consultoria de normas regulamentadoras e laudos técnicos.',
    tags: ['Site Institucional', 'Tailwind CSS', 'B2B', 'Performance'],
    cover: '/projetos/simt/cover.webp',
    images: [
      {
        src: '/projetos/simt/screen_2.webp',
        title: 'Página Inicial Corporativa',
        description: 'Visão geral da empresa e chamada estratégica para orçamentos B2B.'
      },
      {
        src: '/projetos/simt/screen_1.webp',
        title: 'Catálogo de Serviços',
        description: 'Detalhamento de consultorias, laudos de insalubridade e treinamentos de NR.'
      },
      {
        src: '/projetos/simt/screen_3.webp',
        title: 'Sobre a Empresa',
        description: 'Estrutura técnica, certificações e histórico de atuação.'
      }
    ]
  },
  {
    id: 'contos-carvalhos',
    title: 'Contos Carvalhos — Portal do Autor & Obras',
    category: 'landing',
    categoryLabel: 'Landing Page & Portfólio',
    badge: 'Produção Web',
    description: 'Plataforma literária com design editorial elegante focada na apresentação do autor, catálogo de livros publicados e conversão de leitores.',
    tags: ['Landing Page', 'Editorial', 'Portfólio', 'Conversão'],
    cover: '/projetos/contos-carvalhos/cover.webp',
    images: [
      {
        src: '/projetos/contos-carvalhos/screen_1.webp',
        title: 'Página Principal & Destaques',
        description: 'Apresentação do universo literário e destaque das obras recentes.'
      },
      {
        src: '/projetos/contos-carvalhos/screen_2.webp',
        title: 'Catálogo de Livros',
        description: 'Sinopses completas, capas em alta definição e links de aquisição.'
      },
      {
        src: '/projetos/contos-carvalhos/screen_3.webp',
        title: 'Sobre o Autor',
        description: 'Trajetória literária, biografia do autor e canais de contato.'
      }
    ]
  }
];
