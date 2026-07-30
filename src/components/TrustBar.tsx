const ITEMS = [
  { value: "45 anos", label: "de história e experiência farmacêutica" },
  { value: "100%", label: "fórmulas personalizadas para cada pessoa" },
  { value: "Gutfiber®", label: "linha própria de produtos exclusivos" },
  { value: "4 frentes", label: "magistral, dermocosmética, nutrição e cabelos" },
];

export function TrustBar() {
  return (
    <section className="relative z-10 px-5 md:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 lg:-mt-10 lg:grid-cols-4 lg:gap-4">
        {ITEMS.map((item) => (
          <div
            key={item.value}
            className="rounded-df-lg border border-df-line bg-white px-4 py-8 text-center shadow-df-md lg:px-6"
          >
            <p className="font-display text-2xl font-extrabold text-df-primary-700 md:text-3xl">
              {item.value}
            </p>
            <p className="mt-1.5 text-sm leading-snug text-df-ink-700">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
