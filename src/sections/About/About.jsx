import Reveal from '../../components/common/Reveal/Reveal';
import SectionHeader from '../../components/common/SectionHeader/SectionHeader';
import personalData from '../../data/personalData';

/**
 * About — bio paragraphs, career objective card, and contact info cards.
 */
export default function About() {
  return (
    <section id="about">
      <div className="container">
        <Reveal>
          <SectionHeader
            tag="Who I Am"
            title="About"
            accent="Me"
            sub="Passionate developer blending AI research with full-stack engineering."
          />
        </Reveal>

        <div className="about-grid">
          {/* Bio + objective */}
          <Reveal className="ab-text">
            {personalData.bio.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
            <div className="obj-card">
              <span className="obj-lbl">Career Objective</span>
              <p>{personalData.objective}</p>
            </div>
          </Reveal>

          {/* Contact info cards */}
          <Reveal delay="d1">
            <div className="info-cards">
              {[
                { icon: '📧', lbl: 'Email',    val: personalData.contact.email,    href: `mailto:${personalData.contact.email}`  },
                { icon: '📱', lbl: 'Phone',    val: personalData.contact.phone,    href: `tel:${personalData.contact.phone}`     },
                { icon: '💼', lbl: 'LinkedIn', val: personalData.contact.linkedin, href: personalData.contact.linkedinUrl         },
                { icon: '🐙', lbl: 'GitHub',   val: personalData.contact.github,   href: personalData.contact.githubUrl           },
                { icon: '📍', lbl: 'Location', val: personalData.contact.location, href: null                                    },
              ].map(c => {
                const inner = (
                  <>
                    <div className="iicon">{c.icon}</div>
                    <div>
                      <span>{c.lbl}</span>
                      <strong>{c.val}</strong>
                    </div>
                  </>
                );
                return c.href ? (
                  <a
                    key={c.lbl}
                    href={c.href}
                    className="icard"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={c.lbl} className="icard">{inner}</div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
