import Meter from "../components/Meter";
import { usePortal } from "../store";
import { CHARGES, EXISTING_AID, money } from "../data";

export default function StatementView() {
  const p = usePortal();
  const charges = CHARGES.reduce((s, [, v]) => s + v, 0);
  const aid = EXISTING_AID.reduce((s, [, v]) => s + v, 0) + p.secured;
  const uncovered = charges - aid;

  return (
    <>
      {p.atRisk && (
        <div className="card card--risk">
          <h2 className="card-title">$2,500 is not counted here yet</h2>
          <p className="card-body">
            The Ellison Family Scholarship is awarded but cannot be applied until its donor thank-you letter is in.
            Uploading it by Aug 11 drops what you still owe to {money(Math.max(0, uncovered - 2500))}.
          </p>
          <div className="actions">
            <label className={"btn btn--danger" + (p.pending === "letter" ? " is-pending" : "")}>
              {p.pending === "letter" ? "Uploading…" : "Upload letter"}
              <input type="file" className="visually-hidden" onChange={(e) => p.uploadLetter(e.target.files[0])} />
            </label>
          </div>
          {p.letterError && <p className="field-error" role="alert">{p.letterError}</p>}
        </div>
      )}

      <div className="statement">
        <div className="statement-section">
          <Meter
            label="Covered so far"
            value={aid}
            max={charges}
            note={
              uncovered > 0
                ? "The funds in review would cover the rest if they land."
                : "Your costs are covered for the term."
            }
          />
          <p className="uncovered">{money(Math.max(0, uncovered))} <span>still uncovered</span></p>
        </div>

        <div className="statement-section">
          <h3>Cost of attendance, fall 2026</h3>
          <dl className="ledger">
            {CHARGES.map(([k, v]) => (
              <div className="ledger-row" key={k}><dt>{k}</dt><dd>{money(v)}</dd></div>
            ))}
            <div className="ledger-row ledger-row--total"><dt>Total</dt><dd>{money(charges)}</dd></div>
          </dl>
        </div>

        <div className="statement-section">
          <h3>Aid applied</h3>
          <dl className="ledger">
            {EXISTING_AID.map(([k, v]) => (
              <div className="ledger-row" key={k}><dt>{k}</dt><dd>{money(v)}</dd></div>
            ))}
            <div className="ledger-row">
              <dt>Nursing Book Grant</dt><dd>{money(600)}</dd>
            </div>
            {!p.atRisk && (
              <div className="ledger-row">
                <dt>Ellison Family Scholarship</dt><dd>{money(2500)}</dd>
              </div>
            )}
            <div className="ledger-row ledger-row--total"><dt>Total</dt><dd>{money(aid)}</dd></div>
          </dl>
        </div>

     </div>
    </>
  );
}