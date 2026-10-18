import { GraduationCap, Mountain, Mic2, Code2, ArrowUpRight } from 'lucide-react'
import { profile } from '../data/profile'
import { Reveal, SectionTitle, Star } from './Shared'

export function About() {
  return (
    <section id="about" className="section container">
      <Reveal>
        <SectionTitle index="01" eyebrow="THE PERSON BEHIND THE PIXELS">
          A LITTLE ABOUT ME <Star />
        </SectionTitle>
        <div className="about-layout">
          <div className="about-copy">
            <p>{profile.about}</p>
            <p className="about-small">
              Currently exploring the space between{' '}
              <strong>software, cloud, and real-world problems.</strong> Usually with a new idea
              waiting in the wings.
            </p>
            <a className="text-link" href="#contact">
              LET'S TRADE IDEAS <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="education-card paper">
            <div className="flex items-center justify-between gap-4">
              <GraduationCap size={31} />
              <span className="tag">{profile.years}</span>
            </div>
            <h3>{profile.degree}</h3>
            <p>{profile.college}</p>
            <div className="education-meta">
              <span>
                MINOR IN
                <br />
                <strong>{profile.minor}</strong>
              </span>
              <span>
                CGPA
                <br />
                <strong>{profile.cgpa}</strong>
              </span>
            </div>
          </div>
        </div>
        <div className="personal-facts">
          {[
            {
              Icon: Code2,
              title: 'Build. Break. Learn.',
              text: 'Hackathons & hands-on projects',
              color: 'lime',
            },
            {
              Icon: Mic2,
              title: 'Ideas out loud.',
              text: 'Public speaking & collaboration',
              color: 'yellow',
            },
            {
              Icon: Mountain,
              title: 'Beyond the screen.',
              text: 'Trekking & outdoor sports',
              color: 'blue',
            },
          ].map(({ Icon, title, text, color }) => (
            <div className="fact" key={title}>
              <span className={`fact-icon ${color}`}>
                <Icon size={25} />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
