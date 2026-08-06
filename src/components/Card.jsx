import { money } from "../data";

/* Reading order is fixed by grid areas, not source order:
   what it is -> the number that decides its priority -> the situation -> the action. */
export default function Card({ tone, title, pill, body, value, valueText, effort, children, footer }) {
  return (
    <article className={"card" + (tone ? " card--" + tone : "")}>
      <div className="card-top">
        <div className="card-head">
          <h3 className="card-title">{title}</h3>
          {pill}
        </div>
        {(value != null || valueText) && (
          <div className="card-value">
            <p className="figure">{valueText || money(value)}</p>
            {effort && <p className="effort">{effort}</p>}
          </div>
        )}
        {body && <p className="card-body">{body}</p>}
        {children && <div className="actions">{children}</div>}
      </div>
      {footer}
    </article>
  );
}

/* The queue is a list, so a screen reader announces "list, 4 items". */
export function Queue({ children, label }) {
  return (
    <ul className="queue" aria-label={label}>
      {children}
    </ul>
  );
}

export const Row = ({ children }) => <li>{children}</li>;
