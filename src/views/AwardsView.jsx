import Pill from "../components/Pill";
import { usePortal } from "../store";
import { money } from "../data";

export default function AwardsView() {
  const p = usePortal();
  return (
    <>
      <div className={"card" + (p.atRisk ? " card--risk" : "")}>
        <div className="row-head">
          <h2 className="card-title">Ellison Family Scholarship</h2>
          {p.atRisk ? <Pill kind="risk">Letter due</Pill> : <Pill kind="done">Secured</Pill>}
        </div>
        <p className="figure" style={{ margin: "14px 0 8px" }}>{money(2500)}</p>
        <p className="card-body">
          {p.atRisk
            ? "Awarded Jul 28. The donor thank-you letter is due Aug 11. Without it the offer is withdrawn and the money returns to the fund."
            : `Letter received: ${p.letterName}. Payment is scheduled after the office verifies enrollment.`}
        </p>
        {p.atRisk && (
          <div className="actions">
            <label className={"btn btn--danger" + (p.pending === "letter" ? " is-pending" : "")}>
              {p.pending === "letter" ? "Uploading…" : "Upload letter"}
              <input type="file" className="visually-hidden" onChange={(e) => p.uploadLetter(e.target.files[0])} />
            </label>
          </div>
        )}
        {!p.atRisk && (
          <div className="actions">
            <button className="btn btn--secondary" onClick={p.undoLetter}>Replace the file</button>
          </div>
        )}
        {p.letterError && <p className="field-error" role="alert">{p.letterError}</p>}
      </div>

      <div className="card">
        <div className="row-head">
          <h2 className="card-title">Nursing Book Grant</h2>
          <Pill kind="done">Paid</Pill>
        </div>
        <p className="figure" style={{ margin: "14px 0 8px" }}>{money(600)}</p>
        <p className="card-body">Paid to your student account on Aug 1. It appears on your statement as a credit.</p>
        <div className="actions">
          <button className="btn btn--secondary" onClick={() => p.setView("statement")}>See it on the statement</button>
        </div>
      </div>
    </>
  );
}
