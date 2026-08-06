import Sidebar from "./components/Sidebar";
import NotificationBell from "./components/NotificationBell";
import Drawer from "./components/Drawer";
import Toast from "./components/Toast";
import { SkeletonDashboard } from "./components/Skeleton";
import DashboardView from "./views/DashboardView";
import ApplicationView from "./views/ApplicationView";
import ScholarshipsView from "./views/ScholarshipsView";
import AwardsView from "./views/AwardsView";
import StatementView from "./views/StatementView";
import { ProfileView, SettingsView } from "./views/AccountViews";
import { PortalProvider, usePortal } from "./store";

const HEADS = {
  dashboard: ["Your scholarships", "Fall 2026 cycle · application submitted Jul 15"],
  application: ["Your application", "One application, read back section by section"],
  scholarships: ["All scholarships", "Every fund the Lakeshore foundation is awarding this year, and where you stand on each"],
  awards: ["Your awards", "What you have won and what each one still needs"],
  statement: ["Your statement", "What the term costs and what is covering it"],
  profile: ["Your profile", "What the scholarship committee sees, and how we reach you"],
  settings: ["Settings", "How this portal reaches you"]
};

function Shell() {
  const p = usePortal();
  const [title, sub] = HEADS[p.view];

  return (
    <div className="shell">
      <a className="skip" href="#main">Skip to content</a>

      <Sidebar view={p.view} setView={p.setView} menuOpen={p.menuOpen} setMenuOpen={p.setMenuOpen} />

      <main className="content" id="main">
        <div className="page-head head-row">
          <div>
            <h1>{title}</h1>
            <p>{sub}</p>
          </div>
          <NotificationBell
            notes={p.notes}
            open={p.notifOpen}
            setOpen={p.setNotifOpen}
            onRead={p.readNote}
            onReadAll={p.readAllNotes}
          />
        </div>

        {!p.ready ? (
          <SkeletonDashboard />
        ) : (
          <>
            {p.view === "dashboard" && <DashboardView />}
            {p.view === "application" && <ApplicationView />}
            {p.view === "scholarships" && <ScholarshipsView />}
            {p.view === "awards" && <AwardsView />}
            {p.view === "statement" && <StatementView />}
            {p.view === "profile" && <ProfileView />}
            {p.view === "settings" && <SettingsView />}
          </>
        )}
      </main>

      <div role="status" aria-live="polite" className="visually-hidden">
        {p.toast ? p.toast.text : ""}
      </div>

      <Toast toast={p.toast} onDismiss={() => p.setToast(null)} />

      <Drawer
        fund={p.openFund}
        onClose={() => p.setOpenFund(null)}
        onAct={() => {
          p.setOpenFund(null);
          p.setView("dashboard");
          p.setFilter("action");
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <PortalProvider>
      <Shell />
    </PortalProvider>
  );
}
