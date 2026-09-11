import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import Reveal from '../../components/common/Reveal/Reveal';
import SectionHeader from '../../components/common/SectionHeader/SectionHeader';
import personalData from '../../data/personalData';

// ── EmailJS Configuration ─────────────────────────────────────────────────────
// 1. Sign up free at https://www.emailjs.com/
// 2. Create a Service (Gmail / Outlook etc.) → copy Service ID
// 3. Create an Email Template with variables: {{name}} {{email}} {{message}}
// 4. Copy Template ID & Public Key from Account → API Keys
// 5. Replace the three values below:
const EMAILJS_SERVICE_ID  = 'service_3ggjsp8';
const EMAILJS_TEMPLATE_ID = 'template_jd3b1im';
const EMAILJS_PUBLIC_KEY  = 'deyp2YgTlt8KtQZnf';
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Contact — two-column layout with contact links on the left and a contact form on the right.
 * Handles its own form state and EmailJS integration.
 */
export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', msg: '', honeypot: '' });
  const [sendState, setSendState] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const formRef = useRef(null);

  const handleSend = async e => {
    e.preventDefault();

    // Honeypot spam check — bots fill hidden fields, humans don't
    if (formState.honeypot) return;

    // Basic validation
    if (!formState.name.trim() || !formState.email.trim() || !formState.msg.trim()) {
      setSendState('error');
      setTimeout(() => setSendState('idle'), 3000);
      return;
    }

    setSendState('loading');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { name: formState.name, email: formState.email, message: formState.msg },
        EMAILJS_PUBLIC_KEY
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

  const contactLinks = [
    { icon: '📧', lbl: 'Email',    val: personalData.contact.email,    href: `mailto:${personalData.contact.email}`   },
    { icon: '📱', lbl: 'Phone',    val: personalData.contact.phone,    href: `tel:${personalData.contact.phone}`      },
    { icon: '💼', lbl: 'LinkedIn', val: personalData.contact.linkedin, href: personalData.contact.linkedinUrl          },
    { icon: '🐙', lbl: 'GitHub',   val: personalData.contact.github,   href: personalData.contact.githubUrl            },
  ];

  return (
    <section id="contact">
      <div className="container">
        <Reveal>
          <SectionHeader
            tag="Get In Touch"
            title="Let's"
            accent="Connect"
            sub="Open to full-time roles, freelance work, and interesting collaborations."
          />
        </Reveal>

        <div className="contact-layout">
          {/* Left: intro + contact links */}
          <div className="ct-intro">
            <h3>Ready to build something great?</h3>
            <p>
              I'm actively looking for Java Full Stack Developer roles. Whether you have a project
              in mind or just want to chat about tech, feel free to reach out!
            </p>
            <div className="ct-links">
              {contactLinks.map(l => (
                <a key={l.lbl} href={l.href} className="ctlnk" target="_blank" rel="noreferrer">
                  <div className="ctlnk-ico">{l.icon}</div>
                  <div>
                    <span className="ctlnk-lbl">{l.lbl}</span>
                    <span className="ctlnk-val">{l.val}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: contact form */}
          <div className="cf-wrap">
            <div className="cf-title">Send a Message</div>
            <form ref={formRef} onSubmit={handleSend} noValidate>

              {/* Honeypot — hidden from humans, catches bots */}
              <input
                type="text"
                name="honeypot"
                value={formState.honeypot}
                onChange={e => setFormState(s => ({ ...s, honeypot: e.target.value }))}
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
                  onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                  placeholder="Your name"
                  required
                  disabled={sendState === 'loading'}
                />
              </div>

              <div className="fg">
                <label htmlFor="cf-email">Email</label>
                <input
                  id="cf-email"
                  type="email"
                  value={formState.email}
                  onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                  placeholder="your@email.com"
                  required
                  disabled={sendState === 'loading'}
                />
              </div>

              <div className="fg">
                <label htmlFor="cf-msg">Message</label>
                <textarea
                  id="cf-msg"
                  value={formState.msg}
                  onChange={e => setFormState(s => ({ ...s, msg: e.target.value }))}
                  placeholder="Tell me about your project..."
                  required
                  disabled={sendState === 'loading'}
                />
              </div>

              {sendState === 'error' && (
                <div className="cf-status error">✕ Failed to send message. Please try again.</div>
              )}

              <button
                type="submit"
                id="cf-submit"
                className={`btn-send ${
                  sendState === 'success' ? 'success' :
                  sendState === 'loading' ? 'loading' :
                  sendState === 'error'   ? 'error'   : ''
                }`}
                disabled={sendState === 'loading'}
              >
                {sendState === 'loading' ? '⏳ Sending...'       :
                 sendState === 'success' ? '✓ Message Sent!'     :
                 sendState === 'error'   ? 'Try Again →'         :
                                          'Send Message →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
