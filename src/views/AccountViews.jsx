import { usePortal } from "../store";

function SaveBar({ what }) {
  const p = usePortal();
  return (
    <div className="save-bar">
      <p>{p.dirty ? "You have unsaved changes." : p.savedAt ? "All changes saved " + p.savedAt : "Everything is up to date."}</p>
      <div className="actions" style={{ marginTop: 0 }}>
        {p.dirty && <button className="btn btn--secondary" onClick={p.discardAccount}>Discard</button>}
        <button
          className={"btn" + (p.pending === "save" ? " is-pending" : "")}
          disabled={!p.dirty || p.pending === "save"}
          onClick={() => p.saveAccount(what)}
        >
          {p.pending === "save" ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}

export function ProfileView() {
  const p = usePortal();
  const set = (k, v) => p.setProfile({ ...p.profile, [k]: v });

  return (
    <>
      <div className="card">
        <h2 className="card-title">Personal information</h2>
        <div className="form-grid" style={{ marginTop: 16 }}>
          <Field id="first" label="First name" value={p.profile.first} onChange={(v) => set("first", v)} />
          <Field id="last" label="Last name" value={p.profile.last} onChange={(v) => set("last", v)} />
          <Field id="email" label="Email" type="email" value={p.profile.email} onChange={(v) => set("email", v)} />
          <Field id="phone" label="Phone" type="tel" value={p.profile.phone} onChange={(v) => set("phone", v)} />
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">Enrollment</h2>
        <p className="hint">
          These three answers decide which funds you are matched to. Changing them can add or remove follow-ups
          on your dashboard.
        </p>
        <div className="form-grid form-grid--three" style={{ marginTop: 16 }}>
          <Select id="program" label="Program" value={p.profile.program} onChange={(v) => set("program", v)}
            options={["Nursing", "Health Sciences", "General Studies"]} />
          <Select id="load" label="Credit load" value={p.profile.load} onChange={(v) => set("load", v)}
            options={["Full-time", "Part-time", "Less than half-time"]} />
          <Select id="grad" label="Expected graduation" value={p.profile.grad} onChange={(v) => set("grad", v)}
            options={["Fall 2027", "Spring 2028", "Fall 2028"]} />
        </div>
        {p.profile.load === "Less than half-time" && (
          <p className="field-error" role="alert" style={{ marginTop: 12 }}>
            Most Lakeshore funds require half-time enrollment. Saving this removes three funds from your list.
          </p>
        )}
      </div>

      <SaveBar what="Profile" />
    </>
  );
}

export function SettingsView() {
  const p = usePortal();
  const rows = [
    ["newFollowUp", "A new follow-up becomes available", "The moment a fund opens up to you."],
    ["deadline", "A deadline is 5 days out", "Including thank-you letters, which can cost you an award."],
    ["decision", "A decision is posted", "Awarded or not selected."],
    ["weekly", "Weekly summary", "One email on Sunday with everything open."]
  ];

  return (
    <>
      <div className="card">
        <h2 className="card-title">Notifications</h2>
        <p className="hint">Everything here also lands in the bell at the top of the page.</p>
        <ul className="switch-list">
          {rows.map(([key, title, note]) => (
            <li className="switch-row" key={key}>
              <div>
                <p className="switch-title">{title}</p>
                <p className="switch-note">{note}</p>
              </div>
              <button
                role="switch"
                aria-checked={p.prefs[key]}
                aria-label={title}
                className="switch"
                onClick={() => p.setPrefs({ ...p.prefs, [key]: !p.prefs[key] })}
              />
            </li>
          ))}
        </ul>
      </div>

      <SaveBar what="Settings" />
    </>
  );
}

function Field({ id, label, value, onChange, type = "text" }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} className="input" type={type} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function Select({ id, label, value, onChange, options }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <select id={id} className="select" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
