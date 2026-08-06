/* Neutral chip, coloured dot. Colour reinforces the label; it never carries
   the meaning alone, so the status survives colour blindness and greyscale. */
export default function Pill({ kind = "neutral", children }) {
  return (
    <span className={"pill pill--" + kind}>
      <span className="dot" aria-hidden="true" />
      {children}
    </span>
  );
}
