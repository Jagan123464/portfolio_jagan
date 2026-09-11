/**
 * ScrollToTop — floating "back to top" button.
 * Props:
 *   show — boolean, controls visibility
 */
export default function ScrollToTop({ show }) {
  return (
    <button
      className={`btt ${show ? 'show' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}
