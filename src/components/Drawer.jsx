import { useRef, useEffect } from "react";
import Icon from "./Icon";
import Pill from "./Pill";
import { FUND_DETAILS, money } from "../data";

const FOCUSABLE = "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])";

export default function Drawer({ fund, onClose, onAct }) {
  const closeRef = useRef(null);
  const panelRef = useRef(null);
  const closeFn = useRef(onClose);
  closeFn.current = onClose;

  useEffect(() => {
    if (!fund) return;
    const opener = document.activeElement;
    closeRef.current && closeRef.current.focus();

    const onKey = (e) => {
      if (e.key === "Escape") { closeFn.current(); return; }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = panelRef.current.querySelectorAll(FOCUSABLE);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      else if (!panelRef.current.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (opener && opener.focus) opener.focus();
    };
  }, [fund]);

  if (!fund) return null;

  const d = FUND_DETAILS[fund.name] || {};
  const raw = d.applicants ? (d.awards / d.applicants) * 100 : null;
  const pct = raw == null ? null : raw < 1 ? "under 1%" : Math.round(raw) + "%";
  const actionable = fund.status[0] === "action" || fund.status[0] === "risk";

  return (
    <>
      <div className="scrim" onClick={onClose} />
      <aside ref={panelRef} className="drawer" role="dialog" aria-modal="true" aria-label={fund.name}>
        <div className="drawer-head">
          <h2>{fund.name}</h2>
          <button ref={closeRef} className="icon-btn" aria-label="Close" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>

        <div className="drawer-body">
          <div className="drawer-stat">
            <p className="figure">{money(fund.amount)}</p>
            <p className="hint" style={{ margin: 0 }}>per award</p>
          </div>

          <dl className="drawer-facts">
            <dt>Awards given</dt><dd>{d.awards} students each cycle</dd>
            <dt>Applicants last cycle</dt><dd>{d.applicants}</dd>
            <dt>Odds last cycle</dt><dd>{pct} · {d.awards} of {d.applicants} were selected</dd>
            <dt>Funded by</dt><dd>{d.donor}</dd>
            <dt>Deadline</dt><dd>{d.deadline}</dd>
            <dt>Your status</dt><dd><Pill kind={fund.status[0]}>{fund.status[1]}</Pill></dd>
          </dl>

          <h3 className="drawer-sub">What it asks for</h3>
          <ul className="bullets">
            {(d.criteria || []).map((c) => <li key={c}>{c}</li>)}
          </ul>

          {actionable && (
            <div className="actions">
              <button className={"btn" + (fund.status[0] === "risk" ? " btn--danger" : "")} onClick={onAct}>
                {fund.status[0] === "risk" ? "Upload letter" : "Finish this one"}
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
