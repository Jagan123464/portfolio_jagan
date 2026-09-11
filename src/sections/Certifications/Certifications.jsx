import Reveal from '../../components/common/Reveal/Reveal';
import SectionHeader from '../../components/common/SectionHeader/SectionHeader';
import certificationsData from '../../data/certificationsData';

const delayPattern = ['', 'd1', 'd2', '', 'd1', 'd2'];

/**
 * Certifications — two-row, three-column grid of certification and award cards.
 */
export default function Certifications() {
  return (
    <section id="certs">
      <div className="container">
        <Reveal>
          <SectionHeader tag="Credentials" title="Certifications &" accent="Awards" />
        </Reveal>

        <div className="cert-grid">
          {certificationsData.map((c, i) => (
            <Reveal key={i} delay={delayPattern[i]}>
              <div className="cert-card">
                <div className="cert-ico" style={{ background: c.bg, color: c.col }}>
                  {c.icon}
                </div>
                <div className="cert-body">
                  <h4>{c.title}</h4>
                  <span>{c.org}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
