import { ArrowDown, ArrowUp, ArrowUpRight, ContactRound, Mail, Phone } from 'lucide-react'
import { profile } from '../data/profile'
import { downloadContact } from '../lib/vcard'
import { TechIcon } from './TechIcon'
import { ArrowDoodle, Reveal, Star, external } from './Shared'

const contacts = [
  { name: 'Email', label: profile.email, href: `mailto:${profile.email}`, color: 'orange' },
  { name: 'Phone', label: profile.displayPhone, href: `tel:${profile.phone}`, color: 'yellow' },
  {
    name: 'LinkedIn',
    label: 'Let’s connect professionally',
    href: profile.linkedin,
    color: 'blue',
  },
  { name: 'Instagram', label: '@ar.nav4048', href: profile.instagram, color: 'lavender' },
  { name: 'GitHub', label: '@ArnavGurao', href: profile.github, color: 'lime' },
]

export function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="section container">
        <Reveal>
          <p className="eyebrow">
            <span>06</span> GOOD THINGS START WITH A HELLO
          </p>
          <div className="contact-heading">
            <h2>
              LET'S MAKE
              <br />
              SOMETHING <span>COOL</span>
              <br />
              TOGETHER<span className="orange-text">!</span>
            </h2>
            <div className="contact-aside">
              <Star fill="#b8f34a" />
              <p>
                A project, an opportunity,
                <br />
                or a really good idea?
                <br />
                <strong>I'd love to hear it.</strong>
              </p>
              <ArrowDoodle />
            </div>
          </div>
          <div className="contact-grid">
            {contacts.map((contact) => (
              <a
                className={`contact-tile ${contact.color}`}
                href={contact.href}
                key={contact.name}
                {...(contact.href.startsWith('https:') ? external : {})}
              >
                <div className="contact-tile-top">
                  {contact.name === 'Email' ? (
                    <Mail size={26} />
                  ) : contact.name === 'Phone' ? (
                    <Phone size={26} />
                  ) : (
                    <TechIcon name={contact.name} size={26} />
                  )}
                  <ArrowUpRight size={21} />
                </div>
                <h3>{contact.name}</h3>
                <span>{contact.label}</span>
              </a>
            ))}
          </div>
          <div className="save-contact-panel">
            <div>
              <ContactRound size={31} />
              <div>
                <h3>Met me with a tap? Keep in touch.</h3>
                <p>Download my contact card, then confirm the import on your phone.</p>
              </div>
            </div>
            <button className="button lime" onClick={downloadContact}>
              SAVE MY CONTACT <ArrowDown size={19} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <p className="handwritten">Thanks for stopping by!</p>
            <h2>
              STAY CURIOUS.
              <br />
              KEEP BUILDING
              <Star fill="#ff7353" />
            </h2>
          </div>
          <div className="footer-doodles" aria-hidden="true">
            <span className="checkerboard" />
            <ArrowDoodle />
            <span className="footer-circle" />
          </div>
        </div>
        <div className="footer-bottom">
          <a className="wordmark" href="#top">
            AG.
          </a>
          <span>
            MADE WITH <span className="heart">♥</span> & CURIOSITY BY ARNAV
          </span>
          <div className="footer-socials">
            {['GitHub', 'LinkedIn', 'Instagram'].map((name) => (
              <a
                href={profile[name.toLowerCase() as 'github' | 'linkedin' | 'instagram']}
                {...external}
                key={name}
                aria-label={name}
              >
                <TechIcon name={name} size={20} />
              </a>
            ))}
            <a href="#top" aria-label="Back to top">
              <ArrowUp size={21} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
