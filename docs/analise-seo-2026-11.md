# Análise inicial: Google Search Console e Google Analytics (24/11/2026)

Período do Search Console: últimos 3 meses (23/08 a 22/11/2026), propriedade de domínio `dermaflora.com.br`.

## Números gerais (Search Console)

| Métrica | Valor |
|---|---|
| Cliques | 1.120 (cerca de 12 por dia) |
| Impressões | 42,3 mil |
| CTR média | 2,7% |
| Posição média | 7,7 |

| Dispositivo | Cliques | Impressões | CTR | Posição |
|---|---|---|---|---|
| Celular | 607 | 28.418 | 2,1% | 6,9 |
| Computador | 513 | 13.703 | 3,7% | 9,4 |

## 1. O tráfego é quase todo de marca

As consultas "dermaflora", "derma flora", "dermaflora moema", "dermaflora farmácia de manipulação" e variações somam cerca de 450 cliques, com CTR de 12% a 16% e posição 1,2 a 1,8. Quem já conhece a marca acha o site sem problema.

O tráfego novo (quem ainda não conhece a Dermaflora) está praticamente zerado:

| Consulta | Impressões | Cliques | CTR | Posição |
|---|---|---|---|---|
| farmacia manipulacao | 1.877 | 11 | 0,6% | 8,2 |
| farmacia de manipulação são paulo | 1.290 | 21 | 1,6% | 7,3 |
| farmacia de manipulação | 845 | 8 | 0,9% | 8,8 |
| dermo flora | 728 | 4 | 0,5% | 8,0 |
| espiculite | 624 | 6 | 1,0% | 6,1 |
| farmácia de manipulação perto de mim dentro de 800 m | 546 | 2 | 0,4% | 9,2 |
| farmacia de manipulação são paulo sp | 451 | 1 | 0,2% | 9,8 |
| microagulhamento biologico | 281 | 3 | 1,1% | 10,1 |

## 2. Páginas

| Página | Cliques | Impressões | CTR | Posição |
|---|---|---|---|---|
| `https://dermaflora.com.br/` | 718 | 23.628 | 3,0% | 8,7 |
| `http://www.dermaflora.com.br/` (variante antiga) | 307 | 15.093 | 2,0% | 4,1 |
| blog: espiculite | 60 | 4.220 | 1,4% | 6,6 |
| blog: adidao / DAO | 13 | 1.208 | 1,1% | 10,5 |
| blog: caramelo de creatina | 4 | 1.330 | 0,3% | 8,2 |
| `/politica-de-privacidade` | 3 | 3.284 | 0,1% | 5,9 |
| `/cursos-e-eventos` | 2 | 2.679 | 0,1% | 7,3 |
| `/blog/categoria/beleza` | 2 | 1.521 | 0,1% | 7,3 |
| blog: imunidade | 3 | 1.028 | 0,3% | 9,8 |

Observações:
- A home aparece em duas variantes no Google (`https://dermaflora.com.br/` e `http://www.dermaflora.com.br/`). No site os redirects estão corretos (testado com curl), então é histórico do Google se consolidando. Falta ao menos um `canonical` explícito na home.
- A política de privacidade tem 3.284 impressões e `/cursos-e-eventos` tem 2.679, com quase zero clique. São páginas que não deveriam competir por essas buscas; vale entender por quais consultas elas aparecem.
- O post da espiculite é o único conteúdo que traz gente nova de forma relevante.

## 3. Indexação

41 páginas indexadas e 898 não indexadas. A maioria é lixo do WordPress antigo:

| Motivo | Páginas |
|---|---|
| Página com redirecionamento | 286 |
| Não encontrado (404) | 272 |
| Excluída por `noindex` | 112 |
| Bloqueada por acesso proibido (403) | 72 |
| Rastreada, mas não indexada | 132 |
| Detectada, mas não indexada | 6 |
| Alternativa com canonical adequado | 8 |
| Bloqueada pelo robots.txt | 5 |
| Cópia sem canonical escolhido | 3 |

Pendente: abrir os exemplos de 404, 403 e "rastreada, mas não indexada" para separar o que é legado do WordPress do que é página atual do site.

## 4. Google Analytics

A propriedade GA4 "Dermaflora – GA4" já existe (ID de métricas `G-Z44YJT8B5F`), mas está sem nenhum dado: a tag não está instalada no site. Hoje não temos como medir visitas, origem de tráfego nem cliques no WhatsApp (o lead do site).

## 5. Pontos do código (SEO)

- `src/app/layout.tsx`: não define `alternates.canonical` na home.
- `src/app/sitemap.ts`: não inclui `/cursos-e-eventos`.
- Descrição e título da home são genéricos e iguais para todas as buscas; não há título voltado a "farmácia de manipulação em São Paulo / Santo Amaro / zona sul".

## Plano de ação sugerido

1. Instalar o GA4 (`G-Z44YJT8B5F`) com banner de consentimento (LGPD) e evento de clique nos botões de WhatsApp como conversão. A política de privacidade já foi reescrita sem menção a Analytics, então precisa ser ajustada junto.
2. Ajustar a home: `canonical`, título e descrição com os termos "farmácia de manipulação" + "São Paulo" + bairro (Santo Amaro / Chácara Santo Antônio / zona sul), mantendo a marca.
3. Corrigir o sitemap (incluir `/cursos-e-eventos`) e checar por que privacidade e cursos têm tantas impressões.
4. Limpar o legado: listar as URLs 404/403/noindex no Search Console e decidir redirect, 410 ou ignorar.
5. Conteúdo: usar o espiculite como modelo e criar posts e páginas para "farmácia de manipulação zona sul / Santo Amaro / perto de mim" e para os temas que já têm impressão (DAO/histamina, protetor solar FPS 90, cabelo sem brilho, ácaros, creatina em caramelo).
6. Google Meu Negócio: "perto de mim" e buscas locais dependem do perfil; conferir categorias, fotos, posts e perguntas.
7. Repetir a medição em 30 dias comparando com esta linha de base.
