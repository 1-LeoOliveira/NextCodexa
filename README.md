# Next Codexa — Site de captação de clientes

Landing page institucional da Next Codexa (desenvolvimento de software sob medida), construída em
**Vite + React**, com três modelos de referência navegáveis: Landing Page, Cardápio Digital e Sistema ERP.

---

## Rodando o projeto

```bash
npm install     # só na primeira vez
npm run dev     # abre em http://localhost:5173
npm run build   # gera a pasta dist/ pronta para publicar
npm run preview # testa localmente o resultado do build
```

---

## Estrutura

```
├── index.html                  # entrada do Vite (título, metatags, SEO)
├── vite.config.js
├── public/
│   ├── logo.jpg                # logo da marca
│   └── hero.jpg                # imagem de fundo do hero
│   └── img/
│       ├── menu/               # 18 fotos do cardápio (pratos + capa)
│       ├── odonto/             # 5 fotos da clínica
│       └── pessoas/            # 5 retratos (depoimentos e usuário do ERP)
└── src/
    ├── main.jsx                # ponto de entrada do React
    ├── App.jsx                 # rotas
    ├── config.js               # ⚠ DADOS DE CONTATO (WhatsApp, e-mail, redes)
    ├── hooks/
    │   └── useReveal.js        # animação de entrada das seções
    ├── components/             # seções da página inicial
    │   ├── Header.jsx          Hero.jsx          Metricas.jsx
    │   ├── Servicos.jsx        Portfolio.jsx     Processo.jsx
    │   ├── Diferenciais.jsx    Depoimentos.jsx   Faq.jsx
    │   ├── Orcamento.jsx       Footer.jsx        WhatsFlutuante.jsx
    │   ├── BarraModelo.jsx     # barra "voltar ao site" dos modelos
    │   └── Icones.jsx          # ícones SVG reutilizáveis
    ├── pages/
    │   ├── Home.jsx
    │   ├── NaoEncontrado.jsx
    │   └── demos/
    │       ├── LandingDemo.jsx # modelo 1
    │       ├── MenuDemo.jsx    # modelo 2
    │       └── ErpDemo.jsx     # modelo 3
    └── styles/
        ├── global.css          # site institucional
        ├── demos.css           # barra dos modelos
        ├── demo-landing.css    # modelo 1
        ├── demo-menu.css       # modelo 2
        └── demo-erp.css        # modelo 3
```

### Rotas

| Rota | Conteúdo |
|---|---|
| `/` | Site da Next Codexa |
| `/modelos/landing-page` | Modelo 1 — Landing Page (Clínica OdontoVita) |
| `/modelos/menu-digital` | Modelo 2 — Cardápio Digital (Sabor & Arte) |
| `/modelos/erp` | Modelo 3 — Sistema ERP (Codexa ERP) |

---

## ⚠ Antes de publicar — o que precisa ser trocado

### 1. Dados de contato — `src/config.js`

```js
whatsapp: '5511999999999',          // DDI + DDD + número, só dígitos
whatsappExibicao: '(11) 99999-9999',
email: 'contato@nextcodexa.com.br',
instagram: 'https://instagram.com/nextcodexa',
linkedin: 'https://linkedin.com/company/nextcodexa',
cnpj: '00.000.000/0001-00',
```

### 2. Número de WhatsApp dos modelos

Cada modelo tem o seu próprio número fictício no topo do arquivo:

- `src/pages/demos/LandingDemo.jsx` → `WPP_DEMO`
- `src/pages/demos/MenuDemo.jsx` → `WPP_DEMO`

Podem continuar fictícios (são apenas demonstração) ou apontar para o seu número.

### 3. Imagens e ícones dos modelos

**Ícones:** [lucide-react](https://lucide.dev) — biblioteca open source (licença ISC), a mesma usada em
Shadcn/UI e Vercel. Importação por nome, com tree-shaking: só os ~44 ícones usados entram no bundle.

```jsx
import { ShoppingBag, Star } from 'lucide-react'
<ShoppingBag size={20} strokeWidth={1.9} />
```

**Fotos:** todas baixadas do [Unsplash](https://unsplash.com/license) (uso comercial liberado, sem
necessidade de atribuição) e os retratos de [randomuser.me](https://randomuser.me). Ficam em
`public/img/` — servidas do próprio domínio, sem depender de serviço externo.

> ⚠️ **Antes de publicar:** os retratos dos depoimentos são de pessoas reais, vindas de banco de
> imagem. Em um modelo demonstrativo rotulado como fictício isso é aceitável, mas **não reutilize
> esses rostos em um site de cliente real** — ali vão as fotos dos clientes de verdade, com
> autorização de uso de imagem. É o tipo de coisa que gera problema depois.

### 4. Fundo estelar (opcional)

O fundo animado fica em [`src/styles/estrelas.css`](src/styles/estrelas.css) +
[`src/components/CeuEstrelado.jsx`](src/components/CeuEstrelado.jsx), renderizado só na página
inicial. É CSS puro — anima apenas `transform` e `opacity`, então roda na GPU e não trava a rolagem.

Para calibrar, mexa só nas duas variáveis no topo do CSS:

```css
.ceu{
  --brilho:.55;    /* intensidade da nebulosa lilás */
  --estrelas:.75;  /* brilho do campo de estrelas  */
}
```

Respeita `prefers-reduced-motion`: quem configurou o sistema para reduzir animações vê o fundo
parado, sem meteoros. Para remover de vez, basta apagar o `<CeuEstrelado />` de `src/pages/Home.jsx`.

### 5. Tela de abertura (buraco negro)

Animação em canvas exibida na primeira carga, em
[`src/components/Carregando.jsx`](src/components/Carregando.jsx) +
[`src/styles/carregando.css`](src/styles/carregando.css). Controlada em `src/App.jsx`:

```js
const DURACAO_INTRO = 3000   // tempo na tela
const DURACAO_SAIDA = 560    // fade de saída
```

> Ao mudar `DURACAO_INTRO`, ajuste também a animação `marca-barra` em `carregando.css`
> (hoje `3s`) — é ela que faz a barra de progresso terminar junto com a intro.

Por padrão roda **uma vez por sessão** (guardado em `sessionStorage`), então navegar entre as
páginas não repete a animação. Para mudar esse comportamento, mexa em `devoMostrarIntro()`:

| Quando mostrar | Como |
|---|---|
| Uma vez por sessão (atual) | `sessionStorage` |
| Uma vez por visitante | trocar por `localStorage` |
| Toda vez que a página carregar | `return true` direto |

Também é pulada automaticamente para quem usa `prefers-reduced-motion`.

> ⚠️ **Impacto em tráfego pago:** a abertura segura o conteúdo por ~3,6s. Em campanha, parte dos
> visitantes abandona antes disso e o Google mede isso como LCP ruim, o que encarece o clique.
> Vale medir: se a taxa de rejeição subir, reduza para ~1,2s ou deixe a intro só para quem chega
> pelo link direto, não pelo anúncio.

### 6. Conteúdo que é placeholder

- **CNPJ** no rodapé
- **Depoimentos** — substituir por clientes reais assim que tiver
- **Métricas** (“+180% de contatos”, etc.) — já estão com ressalva no texto, mas revise antes de rodar tráfego

---

## Tráfego pago — pixel e eventos

O projeto já dispara eventos de conversão quando o formulário é enviado
(`registrarConversao()` em `src/config.js`): `Lead` no Meta Pixel e `generate_lead` no GA4.
Falta apenas **instalar os scripts** no `index.html`, antes de `</head>`:

```html
<!-- Meta Pixel -->
<script>
  !function(f,b,e,v,n,t,s){/* script oficial do Meta */}(window,document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'SEU_PIXEL_ID');
  fbq('track', 'PageView');
</script>

<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX');
</script>
```

---

## Publicação

O build (`npm run build`) gera uma pasta `dist/` estática. Em qualquer host, configure o
**fallback para `index.html`** — sem isso as rotas `/modelos/...` dão 404 ao recarregar a página.

- **Cloudflare Pages**:
  - Build command: `npm run build` · Build output directory: `dist`
  - O fallback vem do arquivo [`public/_redirects`](public/_redirects), que o Vite
    copia para `dist/` no build. **Não apague esse arquivo** — sem ele as rotas
    `/modelos/*` devolvem 404 quando abertas direto ou recarregadas.
- **Vercel / Netlify**: detectam Vite automaticamente e já fazem o fallback.
  - Build: `npm run build` · Diretório: `dist`
- **Hospedagem compartilhada (Apache)**: suba o conteúdo de `dist/` e crie um `.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## Como o formulário funciona hoje

Os formulários (orçamento e os dos modelos) **montam uma mensagem formatada e abrem o WhatsApp**
com tudo preenchido — não dependem de servidor nem de serviço de e-mail. É o caminho mais rápido
para começar a rodar tráfego.

Se mais à frente você quiser receber os leads por e-mail ou gravar em um banco/CRM, o ponto de
troca é a função `enviar()` em `src/components/Orcamento.jsx`.
