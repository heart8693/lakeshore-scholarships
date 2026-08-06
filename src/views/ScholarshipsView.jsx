import { useState } from "react";
import Icon from "../components/Icon";
import Pill from "../components/Pill";
import Meter from "../components/Meter";
import { usePortal } from "../store";
import { money, odds } from "../data";

export default function ScholarshipsView() {
  const p = usePortal();
  const [q, setQ] = useState("");

  const rows = [
    { name: "Nursing Book Grant", amount: 600, status: ["done", "Paid"] },
    { name: "Ellison Family Scholarship", amount: 2500, status: p.atRisk ? ["risk", "Letter due"] : ["done", "Secured"] },
    {
      name: "Nursing Excellence Fund", amount: 1500,
      status: p.nursingOpen ? ["action", "Action needed"] : p.nursing === "yes" ? ["waiting", "In review"] : ["neutral", "Not eligible"]
    },
    { name: "Lakeshore Alumni Grant", amount: 3000, status: p.essaySubmitted ? ["waiting", "In review"] : ["action", "Action needed"] },
    { name: "Chicago Nurses Auxiliary Fund", amount: 4000, status: ["waiting", "In review"] },
    { name: "Lakeshore Foundation General Scholarship", amount: 2000, status: ["waiting", "In review"] },
    { name: "South Shore Alumni Fund", amount: 1500, status: ["waiting", "In review"] },
    { name: "Health Careers Access Grant", amount: 1250, status: ["waiting", "In review"] },
    { name: "Commuter Student Fund", amount: 600, status: ["waiting", "In review"] },
    { name: "Evening Learner Award", amount: 400, status: ["waiting", "In review"] },
    { name: "Lakeshore Trustees Award", amount: 5000, status: ["neutral", "Not selected"] },
    { name: "Bilingual Health Workers Fund", amount: 2000, status: ["neutral", "Opens in March"] },
    { name: "Second-Year Persistence Grant", amount: 1000, status: ["neutral", "Opens in March"] }
  ];

  const applied = rows.filter((r) => r.status[1] !== "Opens in March").length;
  const found = rows.filter((r) => r.name.toLowerCase().includes(q.trim().toLowerCase()));

  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <Meter
          label="Funds you qualify for that you have applied to"
          value={applied}
          max={rows.length}
          valueText={applied + " of " + rows.length}
          note="Two more open in March. Finishing your follow-ups adds the rest."
        />
      </div>

      <div className="search-field">
        <Icon name="search" />
        <input
          className="search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name"
          aria-label="Search scholarships by name"
        />
      </div>

      {found.length === 0 ? (
        <div className="empty">
          <p>No fund matches “{q}”.</p>
          <button className="btn btn--secondary" onClick={() => setQ("")}>Clear search</button>
        </div>
      ) : (
        <table className="table">
          <caption className="visually-hidden">Every fund at Lakeshore and your status on each</caption>
          <thead>
            <tr>
              <th scope="col">Fund</th>
              <th scope="col" className="num">Award</th>
              <th scope="col" className="num">Odds last cycle</th>
              <th scope="col">Your status</th>
            </tr>
          </thead>
          <tbody>
            {found.map((r) => (
              <tr key={r.name}>
                <th scope="row">
                  <button className="link-cell" onClick={() => p.setOpenFund(r)}>{r.name}</button>
                </th>
                <td className="num">{money(r.amount)}</td>
                <td className="num">{odds(r.name)}</td>
                <td><Pill kind={r.status[0]}>{r.status[1]}</Pill></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
