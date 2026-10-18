import { ArrowDown, ArrowUpRight, ContactRound, MapPin, Pause, Play } from 'lucide-react'
import { useState } from 'react'
import { profile } from '../data/profile'
import { downloadContact } from '../lib/vcard'
import { Star, ArrowDoodle } from './Shared'
import { TechIcon } from './TechIcon'

const stickerTech = [
  'React',
  'Python',
  'JavaScript',
  'AWS',
  'GitHub',
  'PostgreSQL',
  'Java',
  'Google Cloud',
]

export function Hero() {
  return (
    <section className="hero container" aria-labelledby="hero-heading">
      <div className="hero-copy">
        <div className="intro-label">
          <span className="status-dot" /> OPEN TO IDEAS & OPPORTUNITIES
        </div>
        <h1 id="hero-heading">
          HEY THERE!
          <br />
          I'M{' '}
          <span className="name-highlight">
            ARNAV<span className="name-period">.</span>
            <svg viewBox="0 0 470 20" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M4 11Q180-2 460 7M70 17q180-8 370-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>
        <p className="hero-role">
          Computer Engineering Student.
          <br />
          <strong>Developer. Builder.</strong> <span className="handwritten">Always curious.</span>
        </p>
        <p className="hero-description">{profile.intro}</p>
        <div className="hero-actions">
          <a className="button lime" href="#projects">
            VIEW MY WORK <ArrowUpRight size={20} />
          </a>
          <a className="button paper" href={profile.resume} download>
            DOWNLOAD RESUME <ArrowDown size={19} />
          </a>
        </div>
        <button className="save-contact-link" onClick={downloadContact}>
          <ContactRound size={18} /> SAVE MY CONTACT <ArrowDown size={15} />
        </button>
      </div>
      <div className="portrait-composition">
        <div className="portrait-orbit" aria-hidden="true" />
        <Star className="portrait-burst" fill="#ff7353" />
        <span className="portrait-note handwritten">yep, that's me!</span>
        <ArrowDoodle className="portrait-arrow" />
        <div className="portrait-frame">
          <div className="portrait-top">
            <span />
            <span />
            <span />
            <span className="portrait-file">hello_world.jpg</span>
          </div>
          <div className="portrait-photo">
            <img
              src={profile.portrait}
              alt="Arnav Gurao smiling outdoors in an orange jacket"
              width="808"
              height="1600"
              fetchPriority="high"
            />
          </div>
          <div className="portrait-caption">
            <strong>@arnav.gurao</strong>
            <Star />
          </div>
        </div>
        <div className="tech-stickers" role="group" aria-label="Technologies I work with">
          {stickerTech.map((tech, i) => (
            <div key={tech} className={`tech-sticker sticker-${i}`} title={tech}>
              <TechIcon name={tech} size={i > 4 ? 22 : 29} />
              <span>{tech}</span>
            </div>
          ))}
        </div>
        <div className="location-sticker">
          <MapPin size={16} />
          <span>BASED IN MUMBAI, INDIA</span>
        </div>
      </div>
      <div className="hero-footnote">
        <span>IDEAS → CODE → SOMETHING USEFUL</span>
        <a href="#about">
          SCROLL TO EXPLORE <ArrowDown size={14} />
        </a>
      </div>
    </section>
  )
}

const expertise = [
  'FULL-STACK DEVELOPMENT',
  'CLOUD COMPUTING',
  'REACT',
  'PYTHON',
  'AWS',
  'MOBILE DEVELOPMENT',
  'AI/ML',
]
export function ExpertiseMarquee() {
  const [paused, setPaused] = useState(false)
  return (
    <div className={`marquee-shell ${paused ? 'is-paused' : ''}`}>
      <div className="marquee" role="group" aria-label={expertise.join(', ')}>
        <div className="marquee-track" aria-hidden="true">
          {[0, 1].map((n) => (
            <div className="marquee-group" key={n}>
              {expertise.map((item) => (
                <span key={item}>
                  {item}
                  <Star />
                </span>
              ))}
            </div>
          ))}
        </div>
        <button
          className="marquee-control"
          onClick={() => setPaused(!paused)}
          aria-label={paused ? 'Play expertise animation' : 'Pause expertise animation'}
        >
          {paused ? <Play size={16} /> : <Pause size={16} />}
        </button>
      </div>
    </div>
  )
}
