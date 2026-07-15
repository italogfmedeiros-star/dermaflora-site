# BRIEFING PARA DESENVOLVIMENTO DA LANDING PAGE — Dermaflora

*Documento autossuficiente: qualquer designer/dev/IA deve conseguir construir o site sem voltar ao Instagram. Baseado em [análise do Instagram](analise-instagram.md) e [DNA da Marca](dna-da-marca.md).*

---

## 1. Arquitetura da informação e wireframe textual

| # | Seção | Motivo de existir |
|---|---|---|
| 1 | **Header fixo** — logo + navegação (Serviços, Sobre, Produtos, Depoimentos, Contato) + CTA WhatsApp | Acesso rápido ao contato em qualquer ponto de rolagem — hoje inexistente no Instagram |
| 2 | **Hero** — headline + subheadline + CTA duplo (Falar no WhatsApp / Ver serviços) + imagem/vídeo institucional | Primeira impressão precisa comunicar em 5s o que a bio genérica hoje não comunica: personalização + 45 anos de confiança |
| 3 | **Prova rápida (bar de credibilidade)** — "45 anos", "Fórmulas 100% personalizadas", "Produto próprio Gutfiber®", "Multiespecialidade" | Estabelece autoridade antes de pedir qualquer ação, corrigindo a lacuna identificada na Etapa 5 |
| 4 | **Sobre a Dermaflora** — história resumida (fundação → nova direção há 14 anos → hoje), com linha do tempo visual | Resolve a inconsistência bio/post e transforma "45 anos" em narrativa, não em número solto |
| 5 | **Serviços/linhas de atuação** — cards: Fórmulas Magistrais, Dermocosmética, Nutrição/Suplementação, Linha de Unhas | Traduz os destaques do Instagram em conteúdo permanente e explicado (hoje só existem como ícones sem explicação) |
| 6 | **Produto em destaque — Gutfiber®** | Único ativo de marca própria identificado; merece vitrine própria como diferencial competitivo |
| 7 | **Como funciona** (3–4 passos: Consulta → Fórmula personalizada → Manipulação → Entrega/Retirada) | Hoje esse processo não existe em lugar nenhum público — reduz objeção e incerteza de quem nunca comprou manipulado |
| 8 | **Depoimentos** | Já existe destaque "Depoimentos" no Instagram — deve virar prova social permanente e pesquisável no site |
| 9 | **Equipe/estrutura** (opcional na v1 se não houver material — ver Etapa 10) | Prova humana de que "ciência e cuidado" (frase do pinned reel) é real, não apenas copy |
| 10 | **FAQ** | Reduz atrito de quem nunca manipulou fórmula (prazo, como pedir, é mais caro?, precisa receita?) |
| 11 | **CTA final** — bloco de contato com WhatsApp, endereço, horário | Fechamento de conversão |
| 12 | **Rodapé** — links institucionais, redes sociais, endereço, CNPJ/farmacêutico responsável (exigência regulatória do setor) | Compliance + confiança |

## 2. Copy-base (a validar com cliente antes de publicar)

- **Headline (hero):** "Cuidado de verdade começa por uma fórmula feita só para você."
- **Subheadline:** "Há 45 anos cuidando de saúde, beleza e bem-estar com fórmulas magistrais personalizadas e a ciência de quem entende o seu caso."
- **CTA primário:** "Falar com um especialista" (abre WhatsApp)
- **CTA secundário:** "Conhecer nossos serviços" (scroll para seção 5)

⚠️ **Antes de travar qualquer número ("45 anos") ou nome de produto em copy final, confirmar com o cliente** — a bio do Instagram e os posts divergem (40 vs. 45 anos), e não há manual de marca disponível para validar claims regulatórios (ex.: se Gutfiber® pode ser citado como "próprio" sem restrição).

## 3. Design System

### 3.1 Paleta oficial (design tokens)

```css
:root {
  /* Primária — verde-menta (identidade/logo) */
  --df-primary-50:  #F3FAF3;
  --df-primary-100: #E8F5E9;
  --df-primary-300: #B9DEBB;
  --df-primary-500: #7FBF83;  /* uso em destaques pontuais, não em grandes áreas */
  --df-primary-700: #4C8F51;  /* texto sobre fundo claro, ícones */

  /* Secundária — sage-teal (sistema/UI, extraída das capas de destaque) */
  --df-secondary-300: #B7C9C7;
  --df-secondary-500: #8FA8A6;
  --df-secondary-700: #5F7674;

  /* Neutros quentes — fotografia/fundos (extraída de thumbnails de produto) */
  --df-warm-100: #F8F2EA;
  --df-warm-300: #F3E7DC;
  --df-warm-500: #E4D3C0;

  /* Neutros de base */
  --df-bg: #FAFAF7;
  --df-ink-900: #1A1A1A;
  --df-ink-700: #2E2E2E;
  --df-ink-400: #6B6B66;
  --df-white: #FFFFFF;

  /* Semânticos */
  --df-success: #4C8F51;
  --df-warning: #C9A227;
  --df-error: #B84A3E;
}
```

### 3.2 Tipografia

🟡 Família definitiva a confirmar com o cliente. Placeholder recomendado: **Manrope** (títulos, semibold/bold) + **Inter** (corpo, regular/medium) — ambas geométricas humanizadas, gratuitas, alta legibilidade mobile, coerentes com a hipótese tipográfica do DNA da Marca.

```css
--df-font-display: 'Manrope', sans-serif;
--df-font-body: 'Inter', sans-serif;

--df-text-xs:   0.75rem;   /* 12px */
--df-text-sm:   0.875rem;  /* 14px */
--df-text-base: 1rem;      /* 16px */
--df-text-lg:   1.125rem;  /* 18px */
--df-text-xl:   1.375rem;  /* 22px */
--df-text-2xl:  1.75rem;   /* 28px */
--df-text-3xl:  2.25rem;   /* 36px */
--df-text-4xl:  3rem;      /* 48px — hero headline desktop */
```

### 3.3 Espaçamento, raio, sombra, grid

```css
--df-space-1: 4px;  --df-space-2: 8px;  --df-space-3: 12px;
--df-space-4: 16px; --df-space-6: 24px; --df-space-8: 32px;
--df-space-12: 48px; --df-space-16: 64px; --df-space-24: 96px;

--df-radius-sm: 8px;
--df-radius-md: 16px;
--df-radius-lg: 24px;
--df-radius-full: 999px;

--df-shadow-sm: 0 1px 3px rgba(26,26,26,0.06);
--df-shadow-md: 0 4px 16px rgba(26,26,26,0.08);
--df-shadow-lg: 0 12px 32px rgba(26,26,26,0.10);

--df-container-max: 1200px;
--df-grid-gap: 24px;
```

### 3.4 Breakpoints

```css
--df-bp-sm: 480px;
--df-bp-md: 768px;
--df-bp-lg: 1024px;
--df-bp-xl: 1280px;
```

### 3.5 Componentes-base

- **Botão primário:** fundo `--df-primary-700`, texto branco, `--df-radius-full`, padding 12px 28px, hover escurece 8%
- **Botão secundário (WhatsApp):** fundo `--df-secondary-500`, ícone + texto, mesmo raio
- **Botão outline:** borda 1.5px `--df-ink-900`, fundo transparente, usado sobre imagens/hero
- **Card de serviço:** fundo `--df-white`, `--df-radius-md`, `--df-shadow-sm`, padding 24px, ícone em `--df-primary-700` no topo
- **Badge (ex.: "Produto próprio"):** fundo `--df-warm-300`, texto `--df-ink-900`, `--df-radius-full`, texto xs uppercase
- **Depoimento (card):** fundo `--df-warm-100`, aspas decorativas em `--df-primary-300`, nome em bold
- **Input de formulário:** borda 1px `--df-secondary-300`, `--df-radius-sm`, foco com borda `--df-primary-700`
- **Microinteração padrão:** transições 200ms ease-out em hover/foco; sem animações agressivas (coerente com tom "calmo/clínico" do DNA)

## 4. Recomendações para elevar a marca (Etapa 10)

Para o site posicionar a Dermaflora como referência (não apenas "mais uma farmácia de manipulação"), recomenda-se buscar com o cliente, antes ou durante o desenvolvimento:

1. **História real e datada** — confirmar ano exato de fundação e resolver a divergência 40/45 anos
2. **Linha do tempo** — marcos: fundação, mudança de direção (há 14 anos), lançamento do Gutfiber®, outros marcos relevantes
3. **Equipe/farmacêutico(a) responsável** — nome, foto, formação (também exigência regulatória comum no setor)
4. **Certificações e licenças** — Autorização de Funcionamento (ANVISA), Boas Práticas de Manipulação, licença sanitária — hoje ausentes de qualquer material público analisado
5. **Depoimentos reais** — migrar/expandir o destaque "Depoimentos" do Instagram para cases com nome e contexto (com autorização)
6. **Ficha técnica do Gutfiber®** (e outros produtos próprios, se existirem) — composição, benefício, modo de uso
7. **Conteúdo educativo permanente** — o Instagram já tem esse hábito (posts "você sabia?"); um blog ou seção de conteúdo no site aproveita esse material existente e melhora SEO
8. **Fotografia real da estrutura** — fachada, ambiente de manipulação, atendimento — para substituir a ausência de "prova visual" identificada na Etapa 5

## 5. Perguntas em aberto para o cliente (antes de finalizar copy/design)

- [ ] Ano exato de fundação (para resolver 40 vs. 45 anos)
- [ ] Existe manual de marca / arquivo vetorial do logo e fonte oficial?
- [ ] Existem outras linhas de produto próprio além do Gutfiber®?
- [ ] Há depoimentos com autorização de uso de nome/foto?
- [ ] Endereço físico, horário de funcionamento, WhatsApp comercial para o CTA
- [ ] Nome do(a) farmacêutico(a) responsável e número de licença, se aplicável
