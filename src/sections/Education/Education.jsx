import Reveal from '../../components/common/Reveal/Reveal';
import SectionHeader from '../../components/common/SectionHeader/SectionHeader';
import educationData from '../../data/educationData';

const delayMap = ['', 'd1', 'd2'];

/**
 * Education — three-card grid of academic qualifications.
 */
export default function Education() {
  return (
    <section id="education">
      <div className="container">
        <Reveal>
          <SectionHeader tag="My Background" title="Education &" accent="Qualifications" />
        </Reveal>

        <div className="edu-grid">
          {educationData.map((ed, i) => (
            <Reveal key={i} delay={delayMap[i]}>
              <div className="edu-card">
                <div className="edu-ico-row">
                  <div className="edu-ico">{ed.icon}</div>
                  <div>
                    <h3>{ed.degree}</h3>
                    <p>{ed.inst}</p>
                  </div>
                </div>
                <div className="edu-badges">
  <span className="ebadge eb-blue">{ed.period}</span>

  {ed.score && (
    <span className="ebadge eb-green">
      {ed.score}
    </span>
  )}
</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
