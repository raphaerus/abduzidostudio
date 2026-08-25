# 🚀 Abduzido Studio — Landing Pages & Sites Institucionais

> Presença digital fora da órbita do comum. Desenvolvimento web de alta performance com Next.js, React e Tailwind CSS.

---

## 🌌 Sobre o Projeto

O site oficial do **Abduzido Studio** é uma plataforma institucional e showcase de portfólio autoral, construída com foco em velocidade de carregamento, responsividade impecável, identidade visual temática espacial e conversão direta via WhatsApp.

### ✨ Funcionalidades Principais
- **⚡ Performance & SEO Otimizado:** Meta tags dinâmicas, Open Graph para compartilhamento em redes sociais (WhatsApp/LinkedIn), Twitter Cards e dados estruturados (Schema.org JSON-LD).
- **🖼️ Álbum de Projetos com Lightbox Interativo:** Visualização de cases reais com zoom progressivo (`+` / `-` / `1:1`), modo pan (arrastar ao dar zoom), suporte a tela cheia e galeria de miniaturas.
- **💬 Simulador de Orçamento Integrado:** Widget interativo que monta a mensagem personalizada e direciona para o WhatsApp oficial com 1 clique.
- **🎨 Design System Orbital:** Paleta customizada, efeitos de *glassmorphism*, animações suaves de flutuação e ícones vetoriais em SVG.

---

## 🛠️ Stack Tecnológica

- **Core:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server:** [Vite 8](https://vite.dev/)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/) + CSS Modules (Glassmorphism e Keyframes)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Deploy:** [Vercel](https://vercel.com/) (configurado com `vercel.json` para SPAs)

---

## 🚀 Como Executar Localmente

### 1. Clonar o repositório
```bash
git clone https://github.com/SEU-USUARIO/site-abduzido.git
cd site-abduzido
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```
O site estará acessível em `http://localhost:5173`.

### 4. Gerar build de produção
```bash
npm run build
```

### 5. Pré-visualizar build localmente
```bash
npm run preview
```

---

## 🌐 Deploy na Vercel

O projeto já inclui o arquivo [`vercel.json`](./vercel.json) pré-configurado para roteamento de Single Page Application (SPA) e políticas de cache de assets.

### Opção 1: Via Vercel CLI
```bash
npx vercel
```

### Opção 2: Via GitHub + Painel Vercel
1. Suba o repositório para o GitHub.
2. Acesse [vercel.com/new](https://vercel.com/new) e importe o repositório `site-abduzido`.
3. O Vercel detectará o framework **Vite** automaticamente.
4. Clique em **Deploy**.

---

## 📄 Licença

Todos os direitos reservados a © **Abduzido Studio**.
