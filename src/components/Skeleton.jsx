/* Shown while the fund service resolves. Mirrors the real layout so the page
   does not jump when data lands. */
export function SkeletonDashboard() {
  return (
    <div aria-busy="true" aria-live="polite">
      <span className="visually-hidden">Loading your scholarships</span>
      <div className="page-head">
        <div className="sk sk--title" />
        <div className="sk sk--line" style={{ width: 260 }} />
      </div>
      <div className="stakes">
        {[0, 1, 2].map((i) => (
          <div className="stake" key={i}>
            <div className="sk sk--line" style={{ width: 96 }} />
            <div className="sk sk--figure" />
            <div className="sk sk--line" style={{ width: "80%" }} />
          </div>
        ))}
      </div>
      <div className="filters">
        {[0, 1, 2].map((i) => <div className="sk sk--chip" key={i} />)}
      </div>
      <div className="queue">
        {[0, 1, 2].map((i) => (
          <div className="card" key={i}>
            <div className="sk sk--line" style={{ width: 220 }} />
            <div className="sk sk--line" style={{ width: "60%", marginTop: 10 }} />
            <div className="sk sk--btn" />
          </div>
        ))}
      </div>
    </div>
  );
}
