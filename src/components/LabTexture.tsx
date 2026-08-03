/**
 * Camada de textura das seções claras — a malha de laboratório definida em
 * `.bg-lab`. Fica atrás do conteúdo (as seções que a usam são `relative`), e de
 * fora do banner e do contato, que têm fundo próprio.
 */
export function LabTexture() {
  return (
    <div
      aria-hidden="true"
      className="bg-lab pointer-events-none absolute inset-0 opacity-[0.045]"
    />
  );
}
