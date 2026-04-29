type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: Props) {
  const alignment = align === "left" ? "text-left" : "text-center";

  return (
    <div className={`mx-auto max-w-3xl ${alignment}`}>
      <p className="mb-4 text-xs uppercase tracking-[0.36em] text-blush-600">{eyebrow}</p>
      <h2 className="font-display text-4xl leading-tight text-stoneink sm:text-5xl">{title}</h2>
      {description ? (
        <p className="mt-5 text-base leading-8 text-stoneink/75 sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
