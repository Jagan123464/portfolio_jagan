import { Fragment } from 'react';
import { useTilt } from '../../hooks';
import personalData from '../../data/personalData';

// ProfileCard is specific to the Hero visual — kept here as a local sub-component
function ProfileCard() {
  const tilt = useTilt(5);
  return (
    <div
      className="pcard"
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
    >
      <div className="pavatar">J</div>
      <div className="pname">Jagan M</div>
      <div className="prole">Java Full Stack Developer</div>
      <div className="pstatus">Open to Work</div>
      <div className="pstats">
        {[{v:'Java',l:'Backend'},{v:'React',l:'Frontend'},{v:'SQL',l:'Database'},{v:'AI',l:'Research'}].map(s => (
          <div key={s.l} className="ps">
            <div className="psv">{s.v}</div>
            <div className="psl">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Hero — the landing section with name, role, stats, and the animated profile card.
 */
export default function Hero() {
  return (
    <section id="hero">
      <div className="hero">
        {/* Left: text content */}
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="live-dot" />
            Available for Work
          </div>

          <h1 className="hero-h1">
            <span className="h1-grad">{personalData.name}</span>
            <span className="h1-role">{personalData.role}</span>
          </h1>

          <p className="hero-desc">{personalData.bio[0]}</p>

          <div className="hero-btns">
            <a href="#projects" className="btn-prim">View Projects →</a>
            <a href="#contact"  className="btn-ghost">Contact Me</a>
          </div>

          <div className="hero-stats">
            {personalData.stats.map((s, i) => (
              <Fragment key={i}>
                {i > 0 && <div className="hstat-div" />}
                <div className="hstat">
                  <div className="hstat-v">{s.val}</div>
                  <div className="hstat-l">{s.lbl}</div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        {/* Right: animated visual */}
        <div className="hero-visual">
          <div className="orb-wrap">
            <div className="orb-ring or1" />
            <div className="orb-ring or2" />
            <div className="planet p1" />
            <div className="planet p2" />
            <ProfileCard />
          </div>

          <div className="fbadges fbl">
            {['☕ Java', '⚛️ React', '🗄️ MySQL'].map(t => (
              <div key={t} className="fbadge">{t}</div>
            ))}
          </div>
          <div className="fbadges fbr">
            {['🍃 MongoDB', '🌱 Spring Boot', '🔗 REST API'].map(t => (
              <div key={t} className="fbadge">{t}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
