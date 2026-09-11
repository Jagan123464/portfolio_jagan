import Reveal from '../../components/common/Reveal/Reveal';
import SectionHeader from '../../components/common/SectionHeader/SectionHeader';
import experienceData from '../../data/experienceData';

/**
 * Experience — vertical timeline of work experience and training.
 */
export default function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <Reveal>
          <SectionHeader tag="My Journey" title="Work" accent="Experience" />
        </Reveal>

        <div className="tl">
          {experienceData.map((ex, i) => (
            <Reveal key={i} delay={i ? 'd1' : ''}>
              <div className="tl-row">
                <div className="tl-dc">
                  <div className="tl-dot" style={{ borderColor: ex.color }} />
                </div>
                <div className="tl-box">
                  <div className="tl-top">
                    <div className="tl-tt">
                      <h3>{ex.role}</h3>
                      <p>{ex.org}</p>
                    </div>
                    <span className="tl-date">{ex.date}</span>
                  </div>
                  <div className="tl-body">
                    <p>{ex.desc}</p>
                    <ul>
                      {ex.points.map(pt => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
