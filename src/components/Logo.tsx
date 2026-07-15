import Image from "next/image";

const LOGO_WIDTH = 1913;
const LOGO_HEIGHT = 391;

export function LogoMark({
  variant = "color",
  className = "",
}: {
  variant?: "color" | "white";
  className?: string;
}) {
  return (
    <Image
      src="/images/logo-dermaflora.png"
      alt="Dermaflora Farmácia de Manipulação"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      priority
      className={`h-8 w-auto md:h-9 ${variant === "white" ? "brightness-0 invert" : ""} ${className}`}
    />
  );
}
