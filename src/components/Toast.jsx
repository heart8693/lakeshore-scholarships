/* One line, always. Long strings are the caller's problem, not the layout's. */
export default function Toast({ toast, onDismiss }) {
  if (!toast) return null;
  return (
    <div className="toast" key={toast.id}>
      <p>{toast.text}</p>
      <button onClick={onDismiss}>Dismiss</button>
    </div>
  );
}
