/**
 * SectionHeader — consistent heading block used across all portfolio sections.
 * Props:
 *   tag    — small label above heading (e.g. "Who I Am")
 *   title  — main heading text
 *   accent — gradient-coloured word appended to title
 *   sub    — optional subtitle paragraph
 */
export default function SectionHeader({ tag, title, accent, sub }) {
  return (
    <div className="section-header">
      <div className="sh-tag">{tag}</div>
      <h2 className="sh-h2">
        {title} <span>{accent}</span>
      </h2>
      {sub && <p className="sh-p">{sub}</p>}
    </div>
  );
}
