import Card, { Queue, Row } from "../components/Card";
import Pill from "../components/Pill";
import { usePortal } from "../store";
import { useCountUp } from "../hooks/useCountUp";
import { REVIEW_FUNDS, INSTRUCTORS, money } from "../data";

const FILTERS = [
  ["action", "Action needed"],
  ["waiting", "Waiting"],
  ["decided", "Decided"]
];

export default function DashboardView() {
  const p = usePortal();
  const unlocks = useCountUp(p.unlocks);
  const inReview = useCountUp(p.inReview);
  const won = useCountUp(p.won);

  const show = (key) => p.filter === key;

  return (
    <>
      <div className="stakes">
        <div className="stake stake--lead">
          <p className="eyebrow">
            {p.openTasks === 0 ? "Nothing left to do" : `Unlocks in ${p.openTasks} task${p.openTasks > 1 ? "s" : ""}`}
          </p>
          <p className="figure">{p.openTasks === 0 ? "Jan 6" : money(unlocks)}</p>
          <p className="note">
            {p.openTasks === 0
              ? "Decisions post in the first week of January."
              : p.workMinutes <= 1 ? "Under a minute of work." : `About ${p.workMinutes} minutes of work.`}
          </p>
        </div>

        <div className="stake">
          <p className="eyebrow">In review</p>
          <p className="figure">{money(inReview)}</p>
          <p className="note">{p.reviewCount} applications, decided in early January.</p>
        </div>

        <div className="stake">
          <p className="eyebrow">Won</p>
          <p className="figure">{money(won)}</p>
          <p className="note">
            {p.atRisk
              ? "$600 paid. The other $2,500 needs a letter by Aug 11."
              : "$600 paid. The other $2,500 is scheduled after verification."}
          </p>
          {p.atRisk && (
            <label className="btn btn--danger btn--sm">
              Upload letter
              <input
                type="file"
                className="visually-hidden"
                onChange={(e) => p.uploadLetter(e.target.files[0])}
              />
            </label>
          )}
        </div>
      </div>

      <div className="filters" role="group" aria-label="Filter your scholarships">
        {FILTERS.map(([key, label]) => (
          <button
            key={key}
            className={"chip" + (p.filter === key ? " is-on" : "")}
            aria-pressed={p.filter === key}
            onClick={() => p.setFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {show("action") && <ActionQueue />}
      {show("waiting") && <WaitingQueue />}
      {show("decided") && <DecidedQueue />}
    </>
  );
}

function ActionQueue() {
  const p = usePortal();
  const rows = [];

  if (p.atRisk) rows.push(<Row key="letter"><LetterCard /></Row>);
  if (p.nursingOpen) rows.push(<Row key="nursing"><NursingCard /></Row>);
  if (!p.essaySubmitted) rows.push(<Row key="essay"><EssayCard /></Row>);
  rows.push(<Row key="rec"><RecCard /></Row>);

  return <Queue label="Tasks that need you">{rows}</Queue>;
}

function LetterCard() {
  const p = usePortal();
  return (
    <Card
      tone="risk"
      title="Ellison Family Scholarship"
      pill={<Pill kind="risk">Letter due</Pill>}
      value={2500}
      effort="10 min"
      body="You already won this $2,500. The offer is withdrawn if the donor thank-you letter is not in by Aug 11."
      footer={
        p.guideOpen && (
          <div className="disclosure">
            <p>One page is enough. Name the fund, say what you are studying, and say what the money changes this term.</p>
            <p>Address it to the donor, not the office. Sign it with your full name and student ID.</p>
          </div>
        )
      }
    >
      <label className={"btn btn--danger" + (p.pending === "letter" ? " is-pending" : "")}>
        {p.pending === "letter" ? "Uploading…" : "Upload letter"}
        <input
          type="file"
          className="visually-hidden"
          disabled={p.pending === "letter"}
          onChange={(e) => p.uploadLetter(e.target.files[0])}
        />
      </label>
      <button className="btn btn--secondary" aria-expanded={p.guideOpen} onClick={() => p.setGuideOpen(!p.guideOpen)}>
        Writing guide
      </button>
      {p.letterError && <p className="field-error" role="alert">{p.letterError}</p>}
    </Card>
  );
}

function NursingCard() {
  const p = usePortal();
  return (
    <Card
      title="Nursing Excellence Fund"
      value={1500}
      effort="under 1 min"
      body="One question left: are you enrolled at least half-time this fall?"
    >
      <button
        className={"btn btn--secondary" + (p.pending === "nursing-yes" ? " is-pending" : "")}
        disabled={!!p.pending}
        onClick={() => p.answerNursing("yes")}
      >
        {p.pending === "nursing-yes" ? "Sending…" : "Yes"}
      </button>
      <button
        className={"btn btn--secondary" + (p.pending === "nursing-no" ? " is-pending" : "")}
        disabled={!!p.pending}
        onClick={() => p.answerNursing("no")}
      >
        {p.pending === "nursing-no" ? "Sending…" : "No"}
      </button>
    </Card>
  );
}

function EssayCard() {
  const p = usePortal();
  const short = p.essayWords < 20;
  return (
    <Card
      title="Lakeshore Alumni Grant"
      value={3000}
      effort="20 min"
      body="300-word essay on your career goals. Your draft stays here until you submit it."
      footer={
        p.essayOpen && (
          <div className="disclosure">
            <label htmlFor="essay" className="field-label">Why are you pursuing this career?</label>
            <textarea
              id="essay"
              className="textarea"
              value={p.essayText}
              onChange={(e) => p.setEssayText(e.target.value)}
              placeholder="Start anywhere. You can leave and come back."
            />
            <div className="field-foot">
              <span className="hint">{p.essayWords} words · aim for about 300</span>
              <div className="actions" style={{ marginTop: 0 }}>
                <button className="btn btn--secondary" onClick={() => p.setEssayOpen(false)}>Close</button>
                <button
                  className={"btn" + (p.pending === "essay" ? " is-pending" : "")}
                  disabled={short || p.pending === "essay"}
                  onClick={p.submitEssay}
                >
                  {p.pending === "essay" ? "Submitting…" : "Submit essay"}
                </button>
              </div>
            </div>
            {short && <p className="hint">Write at least 20 words before submitting.</p>}
          </div>
        )
      }
    >
      {!p.essayOpen && <button className="btn" onClick={() => p.setEssayOpen(true)}>Write essay</button>}
    </Card>
  );
}

function RecCard() {
  const p = usePortal();
  return (
    <Card
      title={"Recommendation from " + p.rec.name}
      pill={<Pill kind="waiting">Waiting</Pill>}
      valueText="Sept 15"
      effort="blocks $6,750"
      body={
        p.reminderSentAt
          ? `Reminded ${p.reminderSentAt} at ${p.rec.email}, with a copy to you. You can send another on ${p.nextReminder}.`
          : `Requested 9 days ago at ${p.rec.email}. Three awards need this letter before the deadline.`
      }
      footer={
        p.swapOpen && (
          <div className="disclosure">
            <p className="field-label">Ask someone else</p>
            <p className="hint" style={{ marginTop: 0 }}>
              The request goes to the address on file for whoever you pick. The current request stays open until
              one of them returns a letter.
            </p>
            <div className="picker">
              {INSTRUCTORS.map((i) => (
                <button
                  key={i.id}
                  className="picker-option"
                  disabled={i.id === p.recFrom || p.pending === "swap"}
                  onClick={() => p.swapRecommender(i)}
                >
                  <span className="picker-name">{i.name}</span>
                  <span className="picker-meta">{i.id === p.recFrom ? "Current" : i.course}</span>
                  <span className="picker-meta">{i.email}</span>
                </button>
              ))}
            </div>
          </div>
        )
      }
    >
      {!p.reminderSentAt && (
        <button
          className={"btn" + (p.pending === "reminder" ? " is-pending" : "")}
          disabled={p.pending === "reminder"}
          onClick={p.sendReminder}
        >
          {p.pending === "reminder" ? "Sending…" : "Send reminder"}
        </button>
      )}
      <button className="btn btn--secondary" aria-expanded={p.swapOpen} onClick={() => p.setSwapOpen(!p.swapOpen)}>
        Change recommender
      </button>
    </Card>
  );
}

function WaitingQueue() {
  const p = usePortal();
  const rows = [...REVIEW_FUNDS];
  if (p.nursing === "yes") rows.unshift({ id: "nursing-r", name: "Nursing Excellence Fund", amount: 1500 });
  if (p.essaySubmitted) rows.unshift({ id: "alumni-r", name: "Lakeshore Alumni Grant", amount: 3000 });

  return (
    <Queue label="Applications in review">
      {rows.map((f) => (
        <Row key={f.id}>
          <Card
            title={f.name}
            pill={<Pill kind="waiting">In review</Pill>}
            value={f.amount}
            body={`Funded by ${f.donor || "the Lakeshore College Foundation"}. Decisions post in early January. Nothing is needed from you.`}
          />
        </Row>
      ))}
    </Queue>
  );
}

function DecidedQueue() {
  const p = usePortal();
  return (
    <Queue label="Decisions">
      <Row>
        <Card
          title="Nursing Book Grant"
          pill={<Pill kind="done">Paid</Pill>}
          value={600}
          body="Paid to your student account on Aug 1. Nothing else is needed."
        />
      </Row>
      <Row>
        <Card
          title="Ellison Family Scholarship"
          pill={p.atRisk ? <Pill kind="risk">Letter due</Pill> : <Pill kind="done">Secured</Pill>}
          value={2500}
          body={
            p.atRisk
              ? "Awarded, conditional on the donor thank-you letter by Aug 11."
              : `Letter received: ${p.letterName}. Payment follows verification.`
          }
        >
          <button className="btn btn--secondary" onClick={() => p.setView("awards")}>View conditions</button>
        </Card>
      </Row>
      <Row>
        <Card
          title="Lakeshore Trustees Award"
          pill={<Pill kind="neutral">Not selected</Pill>}
          value={5000}
          body="One award, 212 applicants last cycle. It reopens in March."
        >
          <button
            className="btn btn--secondary"
            aria-pressed={p.marchReminder}
            onClick={() => p.setMarchReminder(!p.marchReminder)}
          >
            {p.marchReminder ? "Reminder set" : "Remind me in March"}
          </button>
        </Card>
      </Row>
    </Queue>
  );
}
