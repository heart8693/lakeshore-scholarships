import { useState } from "react";
import Pill from "../components/Pill";
import Meter from "../components/Meter";
import { usePortal } from "../store";
import { APP_SECTIONS } from "../data";

export default function ApplicationView() {
  const p = usePortal();
  const [open, setOpen] = useState(null);
  const followUps = (p.nursingOpen ? 1 : 0) + (p.essaySubmitted ? 0 : 1);

  return (
    <>
      <div className="card">
        <div className="row-head">
          <h2 className="card-title">General application</h2>
          <Pill kind="done">Submitted Jul 15</Pill>
        </div>
        <p className="card-body">
          One application feeds every fund at Lakeshore. Editing it can open new follow-ups, so it stays
          locked unless you ask to reopen it.
        </p>
      </div>

      {followUps > 0 && (
        <div className="card">
          <Meter
            label="Follow-ups still open"
            value={followUps}
            max={2}
            valueText={followUps + " of 2"}
            note="Each one is attached to a single fund, not to this application."
          />
        </div>
      )}

      <div className="card">
        <h2 className="card-title" style={{ marginBottom: 4 }}>What you submitted</h2>
        <p className="hint" style={{ marginTop: 0 }}>Six sections. Open one to read it back.</p>

        <ul className="sections">
          {APP_SECTIONS.map((s) => {
            const isRec = s.id === "recommendation";
            const expanded = open === s.id;
            return (
              <li key={s.id}>
                <button
                  className="section-row"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? null : s.id)}
                >
                  <span className="section-name">{s.name}</span>
                  <span className="section-summary">{s.summary}</span>
                  {isRec && <Pill kind="waiting">Waiting</Pill>}
                </button>
                {expanded && (
                  <div className="disclosure">
                    <p>
                      {isRec
                        ? `Requested from ${p.rec.name} at ${p.rec.email}. It is the only part of this application still outstanding.`
                        : "Read-only. Reopening the application can create new follow-ups on funds that already have your answers."}
                    </p>
                    {isRec && (
                      <button className="btn btn--secondary" onClick={() => { p.setView("dashboard"); p.setFilter("action"); }}>
                        Go to the task
                      </button>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
