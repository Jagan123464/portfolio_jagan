import Reveal from '../../components/common/Reveal/Reveal';
import SectionHeader from '../../components/common/SectionHeader/SectionHeader';
import { useInView } from '../../hooks';
import { useTilt } from '../../hooks';
import projectsData from '../../data/projectsData';

const delays = ['', 'd1', 'd2'];

// ProjectCard is tightly coupled to this section — kept as a local sub-component
function ProjectCard({ proj, index }) {
  const tilt = useTilt(6);
  const [ref, visible] = useInView();

  return (
    <div
      ref={el => { ref.current = el; tilt.ref.current = el; }}
      className={`pj-card reveal ${visible ? 'on' : ''} ${delays[index]}`}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
    >
      {/* Dynamic gradient top bar */}
      <style>{`.pj-card:nth-child(${index + 1})::before{background:${proj.gradient}}`}</style>

      <div className="pj-head">
        <span className="pj-num">{proj.num} · {proj.cat}</span>
        <div className="pj-lnks">
          <a href="#" className="pjl" title="GitHub">⌥</a>
          <a href="#" className="pjl" title="Live">↗</a>
        </div>
      </div>

      <div className="pj-icon">{proj.icon}</div>
      <h3>{proj.title}</h3>
      <p>{proj.desc}</p>

      <ul className="pj-feats">
        {proj.features.map(f => <li key={f}>{f}</li>)}
      </ul>

      <div className="pj-stack">
        {proj.stack.map(s => <span key={s} className="ptag">{s}</span>)}
      </div>
    </div>
  );
}

/**
 * Projects — three-column project grid with tilt, gradient accent bars, and reveal animations.
 */
export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <Reveal>
          <SectionHeader
            tag="What I Built"
            title="Featured"
            accent="Projects"
            sub="Real-world applications combining data science, AI, and full-stack development."
          />
        </Reveal>

        <div className="proj-grid">
          {projectsData.map((p, i) => (
            <ProjectCard key={p.num} proj={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
