import { useState, useEffect, Fragment, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './App.css';
import DATA from './data.js';
import { useInView, useTilt } from './hooks.js';

function Reveal({ children, className = '', delay = '' }) {
  const [ref, visible] = useInView();
  return <div ref={ref} className={`reveal ${visible ? 'on' : ''} ${delay} ${className}`}>{children}</div>;
}

function SectionHeader({ tag, title, accent, sub }) {
  return (
    <div className="section-header">
      <div className="sh-tag">{tag}</div>
      <h2 className="sh-h2">{title} <span>{accent}</span></h2>
      {sub && <p className="sh-p">{sub}</p>}
    </div>
  );
}

function ProfileCard() {
  const tilt = useTilt(5);
  return (
    <div className="pcard" ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}>
      <div className="pavatar">J</div>
      <div className="pname">Jagan M</div>
      <div className="prole">Java Full Stack Developer</div>
      <div className="pstatus">Open to Work</div>
      <div className="pstats">
        {[{v:'Java',l:'Backend'},{v:'React',l:'Frontend'},{v:'SQL',l:'Database'},{v:'AI',l:'Research'}].map(s=>(
          <div key={s.l} className="ps"><div className="psv">{s.v}</div><div className="psl">{s.l}</div></div>
        ))}
      </div>
    </div>
  );
}

function SkillCard({ skill, index }) {
  const tilt = useTilt(7);
  const delays = ['','d1','d2','d3'];
  const [ref, visible] = useInView();
  const colorMap = [
    {bg:'rgba(26,86,219,0.14)',bar:'linear-gradient(90deg,#1a56db,#06b6d4)'},
    {bg:'rgba(124,58,237,0.14)',bar:'linear-gradient(90deg,#7c3aed,#3b7eff)'},
    {bg:'rgba(6,182,212,0.14)',bar:'linear-gradient(90deg,#06b6d4,#7c3aed)'},
    {bg:'rgba(245,158,11,0.14)',bar:'linear-gradient(90deg,#f59e0b,#3b7eff)'},
  ];
  const c = colorMap[index % 4];
  return (
    <div
      ref={el => { ref.current = el; tilt.ref.current = el; }}
      className={`sk-card reveal ${visible ? 'on' : ''} ${delays[index]}`}
      onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}
    >
      <style>{`.sk-card:nth-child(${index+1})::after{background:${c.bar}}`}</style>
      <div className="sk-ico" style={{background:c.bg,color:skill.color}}>{skill.icon}</div>
      <h3 style={{color:skill.color}}>{skill.cat}</h3>
      <div className="sk-tags">{skill.items.map(it=><span key={it} className="stag">{it}</span>)}</div>
    </div>
  );
}

function ProjectCard({ proj, index }) {
  const tilt = useTilt(6);
  const delays = ['','d1','d2'];
  const [ref, visible] = useInView();
  return (
    <div
      ref={el => { ref.current = el; tilt.ref.current = el; }}
      className={`pj-card reveal ${visible ? 'on' : ''} ${delays[index]}`}
      onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}
    >
      <style>{`.pj-card:nth-child(${index+1})::before{background:${proj.gradient}}`}</style>
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
      <ul className="pj-feats">{proj.features.map(f=><li key={f}>{f}</li>)}</ul>
      <div className="pj-stack">{proj.stack.map(s=><span key={s} className="ptag">{s}</span>)}</div>
    </div>
  );
}


export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showBtt, setShowBtt] = useState(false);
  const [formState, setFormState] = useState({ name:'', email:'', msg:'', honeypot:'' });
  const [sendState, setSendState] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const formRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setShowBtt(window.scrollY > 400);
      const ids = ['hero','about','skills','projects','experience','education','certs','contact'];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 100 && r.bottom > 100) { setActiveSection(id); break; }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSend = async e => {
    e.preventDefault();

    // Honeypot spam check – bots fill hidden fields, humans don't
    if (formState.honeypot) return;

    // Basic validation
    if (!formState.name.trim() || !formState.email.trim() || !formState.msg.trim()) {
      setSendState('error');
      setTimeout(() => setSendState('idle'), 3000);
      return;
    }

    setSendState('loading');

    // ── EmailJS ────────────────────────────────────────────────
    // 1. Sign up free at https://www.emailjs.com/
    // 2. Create a Service (Gmail / Outlook etc.) → copy Service ID
    // 3. Create an Email Template → use variables: {{name}} {{email}} {{message}}
    // 4. Copy Template ID & Public Key from Account → API Keys
    // 5. Replace the three placeholders below:
    const SERVICE_ID  = 'service_3ggjsp8';
    const TEMPLATE_ID = 'template_jd3b1im';
    const PUBLIC_KEY  = 'deyp2YgTlt8KtQZnf';
    // ─────────────────────────────────────────────────────────

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { name: formState.name, email: formState.email, message: formState.msg },
        PUBLIC_KEY
      );
      setSendState('success');
      setFormState({ name: '', email: '', msg: '', honeypot: '' });
      setTimeout(() => setSendState('idle'), 4000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setSendState('error');
      setTimeout(() => setSendState('idle'), 4000);
    }
  };

  const navLinks = [
    {href:'#about',label:'About'},{href:'#skills',label:'Skills'},
    {href:'#projects',label:'Projects'},{href:'#experience',label:'Experience'},
    {href:'#education',label:'Education'},{href:'#contact',label:'Contact'},
  ];

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <a href="#hero" className="nav-logo">
          <span className="nl-br">&lt;</span>
          <span className="nl-nm">Jagan</span>
          <span className="nl-dt"></span>
          <span className="nl-nm">M</span>
          <span className="nl-br">/&gt;</span>
        </a>
        <ul className="nav-links">
          {navLinks.map(l=>(
            <li key={l.href}><a href={l.href} className={activeSection===l.href.slice(1)?'active':''}>{l.label}</a></li>
          ))}
        </ul>
        <a href="mailto:Jagan123464@gmail.com" className="nav-hire">Hire Me →</a>
        <button className="hamburger" onClick={()=>setMenuOpen(o=>!o)} aria-label="menu">☰</button>
      </nav>
      <div className={`mob-menu ${menuOpen?'open':''}`}>
        {navLinks.map(l=>(
          <a key={l.href} href={l.href} onClick={()=>setMenuOpen(false)}>{l.label}</a>
        ))}
      </div>

      {/* BG */}
      <div className="bg-mesh">
        <div className="blob b1"/><div className="blob b2"/><div className="blob b3"/>
      </div>
      <div className="bg-grid"/>

      <main>
        {/* HERO */}
        <section id="hero">
          <div className="hero">
            <div className="hero-content">
              <div className="hero-eyebrow"><span className="live-dot"/>Available for Work</div>
              <h1 className="hero-h1">
                <span className="h1-grad">{DATA.name}</span>
                <span className="h1-role">{DATA.role}</span>
              </h1>
              <p className="hero-desc">{DATA.bio[0]}</p>
              <div className="hero-btns">
                <a href="#projects" className="btn-prim">View Projects →</a>
                <a href="#contact" className="btn-ghost">Contact Me</a>
              </div>
              <div className="hero-stats">
                {DATA.stats.map((s,i)=>(
                  <Fragment key={i}>
                    {i>0&&<div key={`d${i}`} className="hstat-div"/>}
                    <div key={s.lbl} className="hstat">
                      <div className="hstat-v">{s.val}</div>
                      <div className="hstat-l">{s.lbl}</div>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
            <div className="hero-visual">
              <div className="orb-wrap">
                <div className="orb-ring or1"/><div className="orb-ring or2"/>
                <div className="planet p1"/><div className="planet p2"/>
                <ProfileCard/>
              </div>
              <div className="fbadges fbl">
                {['☕ Java','⚛️ React','🗄️ MySQL'].map(t=><div key={t} className="fbadge">{t}</div>)}
              </div>
              <div className="fbadges fbr">
                {['🍃 MongoDB','🌱 Spring Boot','🔗 REST API'].map(t=><div key={t} className="fbadge">{t}</div>)}
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about"><div className="container">
          <Reveal><SectionHeader tag="Who I Am" title="About" accent="Me" sub="Passionate developer blending AI research with full-stack engineering."/></Reveal>
          <div className="about-grid">
            <Reveal className="ab-text">
              {DATA.bio.map((p,i)=><p key={i} dangerouslySetInnerHTML={{__html:p}}/>)}
              <div className="obj-card">
                <span className="obj-lbl">Career Objective</span>
                <p>{DATA.objective}</p>
              </div>
            </Reveal>
            <Reveal delay="d1">
              <div className="info-cards">
                {[
                  {icon:'📧',lbl:'Email',val:DATA.contact.email},
                  {icon:'📱',lbl:'Phone',val:DATA.contact.phone},
                  {icon:'💼',lbl:'LinkedIn',val:DATA.contact.linkedin},
                  {icon:'🐙',lbl:'GitHub',val:DATA.contact.github},
                  {icon:'📍',lbl:'Location',val:DATA.contact.location},
                ].map(c=>(
                  <div key={c.lbl} className="icard">
                    <div className="iicon">{c.icon}</div>
                    <div><span>{c.lbl}</span><strong>{c.val}</strong></div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div></section>

        {/* SKILLS */}
        <section id="skills"><div className="container">
          <Reveal><SectionHeader tag="What I Know" title="Technical" accent="Skills" sub="A diverse toolkit spanning frontend, backend, databases, and AI."/></Reveal>
          <div className="sk-grid">
            {DATA.skills.map((sk,i)=><SkillCard key={sk.cat} skill={sk} index={i}/>)}
          </div>
        </div></section>

        {/* PROJECTS */}
        <section id="projects"><div className="container">
          <Reveal><SectionHeader tag="What I Built" title="Featured" accent="Projects" sub="Real-world applications combining data science, AI, and full-stack development."/></Reveal>
          <div className="proj-grid">
            {DATA.projects.map((p,i)=><ProjectCard key={p.num} proj={p} index={i}/>)}
          </div>
        </div></section>

        {/* EXPERIENCE */}
        <section id="experience"><div className="container">
          <Reveal><SectionHeader tag="My Journey" title="Work" accent="Experience"/></Reveal>
          <div className="tl">
            {DATA.experience.map((ex,i)=>(
              <Reveal key={i} delay={i?'d1':''}>
                <div className="tl-row">
                  <div className="tl-dc"><div className="tl-dot" style={{borderColor:ex.color}}/></div>
                  <div className="tl-box">
                    <div className="tl-top">
                      <div className="tl-tt"><h3>{ex.role}</h3><p>{ex.org}</p></div>
                      <span className="tl-date">{ex.date}</span>
                    </div>
                    <div className="tl-body">
                      <p>{ex.desc}</p>
                      <ul>{ex.points.map(pt=><li key={pt}>{pt}</li>)}</ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div></section>

        {/* EDUCATION */}
        <section id="education"><div className="container">
          <Reveal><SectionHeader tag="My Background" title="Education &" accent="Qualifications"/></Reveal>
          <div className="edu-grid">
            {DATA.education.map((ed,i)=>(
              <Reveal key={i} delay={['','d1','d2'][i]}>
                <div className="edu-card">
                  <div className="edu-ico-row">
                    <div className="edu-ico">{ed.icon}</div>
                    <div><h3>{ed.degree}</h3><p>{ed.inst}</p></div>
                  </div>
                  <div className="edu-badges">
                    <span className="ebadge eb-blue">{ed.period}</span>
                    <span className="ebadge eb-green">{ed.score}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div></section>

        {/* CERTS */}
        <section id="certs"><div className="container">
          <Reveal><SectionHeader tag="Credentials" title="Certifications &" accent="Awards"/></Reveal>
          <div className="cert-grid">
            {DATA.certs.map((c,i)=>(
              <Reveal key={i} delay={['','d1','d2','','d1','d2'][i]}>
                <div className="cert-card">
                  <div className="cert-ico" style={{background:c.bg,color:c.col}}>{c.icon}</div>
                  <div className="cert-body"><h4>{c.title}</h4><span>{c.org}</span></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div></section>

        {/* CONTACT */}
        <section id="contact"><div className="container">
          <Reveal><SectionHeader tag="Get In Touch" title="Let's" accent="Connect" sub="Open to full-time roles, freelance work, and interesting collaborations."/></Reveal>
          <div className="contact-layout">
            <div className="ct-intro">
              <h3>Ready to build something great?</h3>
              <p>I'm actively looking for Java Full Stack Developer roles. Whether you have a project in mind or just want to chat about tech, feel free to reach out!</p>
              <div className="ct-links">
                {[
                  {icon:'📧',lbl:'Email',val:DATA.contact.email,href:`mailto:${DATA.contact.email}`},
                  {icon:'📱',lbl:'Phone',val:DATA.contact.phone,href:`tel:${DATA.contact.phone}`},
                  {icon:'💼',lbl:'LinkedIn',val:DATA.contact.linkedin,href:`https://${DATA.contact.linkedin}`},
                  {icon:'🐙',lbl:'GitHub',val:DATA.contact.github,href:`https://${DATA.contact.github}`},
                ].map(l=>(
                  <a key={l.lbl} href={l.href} className="ctlnk" target="_blank" rel="noreferrer">
                    <div className="ctlnk-ico">{l.icon}</div>
                    <div><span className="ctlnk-lbl">{l.lbl}</span><span className="ctlnk-val">{l.val}</span></div>
                  </a>
                ))}
              </div>
            </div>
            <div className="cf-wrap">
              <div className="cf-title">Send a Message</div>
              <form ref={formRef} onSubmit={handleSend} noValidate>

                {/* Honeypot field – hidden from humans, traps bots */}
                <input
                  type="text"
                  name="honeypot"
                  value={formState.honeypot}
                  onChange={e=>setFormState(s=>({...s,honeypot:e.target.value}))}
                  className="hp-field"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className="fg">
                  <label htmlFor="cf-name">Name</label>
                  <input
                    id="cf-name"
                    value={formState.name}
                    onChange={e=>setFormState(s=>({...s,name:e.target.value}))}
                    placeholder="Your name"
                    required
                    disabled={sendState==='loading'}
                  />
                </div>

                <div className="fg">
                  <label htmlFor="cf-email">Email</label>
                  <input
                    id="cf-email"
                    type="email"
                    value={formState.email}
                    onChange={e=>setFormState(s=>({...s,email:e.target.value}))}
                    placeholder="your@email.com"
                    required
                    disabled={sendState==='loading'}
                  />
                </div>

                <div className="fg">
                  <label htmlFor="cf-msg">Message</label>
                  <textarea
                    id="cf-msg"
                    value={formState.msg}
                    onChange={e=>setFormState(s=>({...s,msg:e.target.value}))}
                    placeholder="Tell me about your project..."
                    required
                    disabled={sendState==='loading'}
                  />
                </div>

                {/* Status messages */}
                {sendState==='error' && (
                  <div className="cf-status error">✕ Failed to send message. Please try again.</div>
                )}

                <button
                  type="submit"
                  id="cf-submit"
                  className={`btn-send ${
                    sendState==='success' ? 'success' :
                    sendState==='loading' ? 'loading' :
                    sendState==='error'   ? 'error'   : ''
                  }`}
                  disabled={sendState==='loading'}
                >
                  {sendState==='loading' ? '⏳ Sending...' :
                   sendState==='success' ? '✓ Message Sent!' :
                   sendState==='error'   ? 'Try Again →' :
                   'Send Message →'}
                </button>

              </form>
            </div>
          </div>
        </div></section>
      </main>

      <footer>
        <p>Designed & Built by <strong>Jagan M</strong> · <span className="fc">Java Full Stack Developer</span> · {new Date().getFullYear()}</p>
      </footer>

      <button className={`btt ${showBtt?'show':''}`} onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} aria-label="Back to top">↑</button>
    </>
  );
}
