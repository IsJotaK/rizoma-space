const SPRITE = "/icons.svg";

const ICON_PARTS: Record<string, string[]> = {
  shield: ["i-shield"],
  "shield-check": ["i-shield", "i-check"],
  check: ["i-check"],
  circle: ["i-circle"],
  "circle-check": ["i-circle", "i-circle-check"],
  times: ["i-circle", "i-times"],
  whatsapp: ["i-whatsapp"],
  instagram: ["i-instagram"],
  facebook: ["i-facebook"],
  email: ["i-envelope"],
  envelope: ["i-envelope"],
  "file-text": ["i-file-text", "i-file-text-l"],
  document: ["i-file-text", "i-file-text-l"],
  clipboard: ["i-clipboard", "i-clipboard-r", "i-clipboard-c"],
  calculator: ["i-calculator", "i-calc-l1"],
  truck: ["i-truck", "i-truck-b", "i-truck-c"],
  trash: ["i-trash", "i-trash-l"],
  building: ["i-building", "i-building-w"],
  city: ["i-city", "i-city-b", "i-city-w"],
  water: ["i-water"],
  tree: ["i-tree"],
  mountain: ["i-mountain"],
  "map-pin": ["i-map-pin", "i-map-pin-d"],
  redo: ["i-redo", "i-redo-a"],
  "chevron-up": ["i-chevron-up"],
  hamburger: ["i-hamburger"],
};

export function Icon({
  name,
  className = "",
}: {
  name?: string;
  className?: string;
}) {
  const parts = (name && ICON_PARTS[name]) || [];
  if (parts.length === 0) return null;
  const cls = ["icon", className].filter(Boolean).join(" ");
  return (
    <svg className={cls} viewBox="0 0 24 24" aria-hidden="true">
      {parts.map((id) => (
        <use key={id} href={`${SPRITE}#${id}`} />
      ))}
    </svg>
  );
}