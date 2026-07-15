Segue um prompt estruturado para IA (Claude, ChatGPT, Cursor, Lovable, Bolt, etc.) com foco em **UI/UX profissional**, evitando o erro comum de apenas adicionar transparência. O objetivo é criar uma interface premium, moderna e consistente.

---

# Prompt — Aplicação Profissional de Glassmorphism

Você é um UI Designer Sênior especializado em produtos SaaS, Design Systems e interfaces premium.

Sua missão é aplicar o conceito de **Glassmorphism** em todo o projeto existente, mantendo a identidade visual, melhorando a experiência do usuário e sem comprometer acessibilidade, desempenho ou legibilidade.

## Objetivo

Transformar a interface atual em uma experiência moderna inspirada em produtos como:

* Apple VisionOS
* macOS Sonoma
* Windows 11 Fluent Design
* Linear
* Raycast
* Stripe Dashboard
* Framer
* Vercel

O resultado deve transmitir:

* sofisticação
* tecnologia
* minimalismo
* profundidade
* elegância
* alta qualidade

Nunca transforme a interface em algo exagerado ou com excesso de blur.

O foco é elegância.

---

# Princípios de Design

Siga rigorosamente:

### 1. Glass deve ser sutil

Evite transparências extremas.

Prefira:

* background rgba(255,255,255,0.08)
* rgba(255,255,255,0.12)
* rgba(255,255,255,0.15)

Nunca utilizar vidro completamente transparente.

---

### 2. Blur controlado

Aplicar:

backdrop-filter:
blur(16px)
blur(20px)
blur(24px)

Nunca usar blur exagerado (>40px).

---

### 3. Bordas

Todos os painéis devem possuir borda clara.

Exemplo:

border:
1px solid rgba(255,255,255,0.18)

ou

rgba(255,255,255,0.12)

---

### 4. Luz ambiente

Adicionar brilho extremamente suave.

Exemplo:

box-shadow:

0 8px 32px rgba(0,0,0,.18)

e

inset 0 1px 0 rgba(255,255,255,.15)

---

### 5. Profundidade

Criar sensação de camadas.

Cada painel deve parecer suspenso.

Evitar aparência plana.

---

# Aplicação por Componentes

## Sidebar

Aplicar vidro translúcido.

Separação visual por blur.

Menus com hover suave.

Item ativo:

* brilho discreto
* leve gradiente
* sombra interna

---

## Navbar

Glass completo.

Leve transparência.

Blur.

Borda inferior suave.

Deve parecer flutuar acima do conteúdo.

---

## Cards

Todos os cards devem possuir:

Glass

Blur

Borda translúcida

Sombras suaves

Raio:

16~24px

Padding consistente.

---

## Modais

Glass mais intenso.

Maior blur.

Overlay escurecido.

Animação elegante.

---

## Dropdowns

Mesmo estilo do card.

Sombras suaves.

Hover delicado.

---

## Inputs

Background semi-transparente.

Borda clara.

Focus:

Glow discreto.

Nunca usar borda azul padrão.

---

## Botões

Criar hierarquia.

### Primário

Gradiente.

Sombra.

Hover:

elevação + brilho.

---

### Secundário

Glass.

Transparência.

Hover com aumento de luminosidade.

---

### Ghost

Sem fundo.

Hover apenas com vidro leve.

---

## Tabelas

Cabeçalho em glass.

Linhas levemente transparentes.

Hover elegante.

Separadores discretos.

---

## Dashboard

Widgets devem parecer cartões de vidro.

Gráficos devem flutuar sobre o fundo.

Evitar caixas sólidas.

---

# Cores

Utilizar uma paleta moderna.

Exemplo:

Background:

#0F172A

ou

#111827

ou

#0B1020

Superfícies:

rgba(255,255,255,.08)

Texto principal:

#FFFFFF

Texto secundário:

rgba(255,255,255,.70)

Bordas:

rgba(255,255,255,.14)

---

# Espaçamento

Utilizar escala consistente.

4

8

12

16

20

24

32

40

48

64

Nunca utilizar espaçamentos aleatórios.

---

# Tipografia

Priorizar:

Inter

SF Pro

Geist

Manrope

Peso:

400

500

600

700

Hierarquia clara.

---

# Ícones

Estilo minimalista.

Lucide

Heroicons

Tabler Icons

Tamanho consistente.

---

# Animações

Adicionar microinterações elegantes.

Hover:

150–250ms

Transitions:

ease-out

Escala:

1.02

Sombras dinâmicas.

Nunca usar animações chamativas.

---

# Responsividade

Garantir funcionamento em:

Desktop

Notebook

Tablet

Mobile

Sem quebra do efeito Glass.

---

# Performance

Evitar excesso de:

blur

gradientes

box-shadow

backdrop-filter

Reutilizar estilos.

Criar componentes reutilizáveis.

---

# Acessibilidade

Garantir contraste mínimo WCAG AA.

Texto sempre legível.

Estados de foco visíveis.

Não depender apenas de transparência para separar elementos.

---

# Design System

Criar tokens reutilizáveis para:

* Glass Background
* Glass Border
* Glass Shadow
* Radius
* Blur
* Typography
* Colors
* Spacing
* Elevation
* Hover
* Focus

Todo o projeto deve utilizar esses tokens.

---

# Resultado Esperado

Ao finalizar, a interface deve parecer um produto SaaS de alto padrão, transmitindo sofisticação e consistência visual. O glassmorphism deve reforçar a experiência sem prejudicar a usabilidade ou a legibilidade. Todos os componentes devem seguir o mesmo sistema visual, com efeitos discretos, profundidade equilibrada e excelente desempenho, resultando em uma interface elegante, moderna e pronta para produção.
