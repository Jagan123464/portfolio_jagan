import Reveal from '../../components/common/Reveal/Reveal';
import SectionHeader from '../../components/common/SectionHeader/SectionHeader';
import { useInView } from '../../hooks';
import { useTilt } from '../../hooks';
import skillsData from '../../data/skillsData';

// Color map for the accent bar on each skill card
const colorMap = [
  { bg: 'rgba(26,86,219,0.14)',  bar: 'linear-gradient(90deg,#1a56db,#06b6d4)' },
  { bg: 'rgba(124,58,237,0.14)', bar: 'linear-gradient(90deg,#7c3aed,#3b7eff)' },
  { bg: 'rgba(6,182,212,0.14)',  bar: 'linear-gradient(90deg,#06b6d4,#7c3aed)' },
  { bg: 'rgba(245,158,11,0.14)', bar: 'linear-gradient(90deg,#f59e0b,#3b7eff)' },
];

const delays = ['', 'd1', 'd2', 'd3'];

// SkillCard is tightly coupled to this section — kept as a local sub-component
function SkillCard({ skill, index }) {
  const tilt = useTilt(7);
  const [ref, visible] = useInView();
  const c = colorMap[index % 4];

  return (
    <div
      ref={el => { ref.current = el; tilt.ref.current = el; }}
      className={`sk-card reveal ${visible ? 'on' : ''} ${delays[index]}`}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
    >
      {/* Dynamic accent bar colour via inline style */}
      <style>{`.sk-card:nth-child(${index + 1})::after{background:${c.bar}}`}</style>

      <div className="sk-ico" style={{ background: c.bg, color: skill.color }}>
        {skill.icon}
      </div>
      <h3 style={{ color: skill.color }}>{skill.cat}</h3>
      <div className="sk-tags">
        {skill.items.map(it => (
          <span key={it} className="stag">{it}</span>
        ))}
      </div>
    </div>
  );
}

/**
 * Skills — four-column skill category grid with tilt & reveal animations.
 */
export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <Reveal>
          <SectionHeader
            tag="What I Know"
            title="Technical"
            accent="Skills"
            sub="A diverse toolkit spanning frontend, backend, databases, and AI."
          />
        </Reveal>

        <div className="sk-grid">
          {skillsData.map((sk, i) => (
            <SkillCard key={sk.cat} skill={sk} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
