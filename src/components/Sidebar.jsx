import Icon from "./Icon";

const MAIN = [
  ["dashboard", "Dashboard"],
  ["application", "Application"],
  ["scholarships", "Scholarships"],
  ["awards", "Awards"],
  ["statement", "Statement"]
];

const ACCOUNT = [
  ["profile", "Profile"],
  ["settings", "Settings"]
];

export default function Sidebar({ view, setView, menuOpen, setMenuOpen }) {
  const Link = ({ id, label }) => (
    <button
      className="nav-link"
      aria-current={view === id ? "page" : undefined}
      onClick={() => { setView(id); setMenuOpen(false); }}
    >
      <Icon name={id} filled={view === id} />
      {label}
    </button>
  );

  return (
    <aside className="sidebar">
      <div className="brand">
        <img className="logo" src="/lakeshore-logo.webp" alt="Lakeshore College" />
        <button
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>
      </div>

      {menuOpen && <div className="nav-scrim" onClick={() => setMenuOpen(false)} />}

      <nav className={"nav" + (menuOpen ? " is-open" : "")} aria-label="Scholarship portal">
        {MAIN.map(([id, label]) => <Link key={id} id={id} label={label} />)}
        <div className="nav-divider" />
        {ACCOUNT.map(([id, label]) => <Link key={id} id={id} label={label} />)}
      </nav>
    </aside>
  );
}
