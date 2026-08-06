/* Progress is drawn with transform: scaleX, not width, so it stays on the
   compositor. Hidden entirely at zero: an empty track reads as failure. */
export default function Meter({ label, value, max, valueText, note }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="meter">
      <div className="meter-head">
        <p className="meter-label">{label}</p>
        <span className="meter-value">{valueText || pct + "%"}</span>
      </div>
      {value > 0 && (
        <div
          className="meter-track"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label}
        >
          <div className="meter-fill" style={{ transform: `scaleX(${pct / 100})` }} />
        </div>
      )}
      {note && <p className="meter-note">{note}</p>}
    </div>
  );
}
