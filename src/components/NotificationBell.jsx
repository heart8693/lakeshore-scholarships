import { useRef, useEffect } from "react";
import Icon from "./Icon";

export default function NotificationBell({ notes, open, setOpen, onRead, onReadAll }) {
  const wrapRef = useRef(null);
  const unread = notes.filter((n) => !n.read).length;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open, setOpen]);

  return (
    <div className="bell-wrap" ref={wrapRef}>
      <button
        className="bell"
        aria-expanded={open}
        aria-label={unread ? `Notifications, ${unread} unread` : "Notifications"}
        onClick={() => setOpen(!open)}
      >
        <Icon name="bell" />
        {unread > 0 && <span className="badge" aria-hidden="true">{unread}</span>}
      </button>

      {open && (
        <div className="notif-panel">
          <div className="notif-head">
            <h2>Notifications</h2>
            {unread > 0 && (
              <button className="btn btn--ghost" onClick={onReadAll}>Mark all as read</button>
            )}
          </div>

          {notes.length === 0 ? (
            <p className="notif-empty">Nothing yet. Deadlines and decisions land here.</p>
          ) : (
            <ul className="notif-list">
              {notes.map((n) => (
                <li key={n.id}>
                  <button
                    className={"notif-item" + (n.read ? " is-read" : "")}
                    onClick={() => onRead(n)}
                  >
                    <span className="t"><span className="dot" aria-hidden="true" />{n.title}</span>
                    <p>{n.body}</p>
                    <p className="when">{n.when}</p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
