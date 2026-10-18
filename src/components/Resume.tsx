import { ArrowDown, ArrowUpRight, Award, BadgeCheck, Paperclip } from 'lucide-react'
import { profile, milestones, hackathons } from '../data/profile'
import { Reveal, SectionTitle, Star, external } from './Shared'

export function Resume() {
  return (
    <section id="resume" className="section container">
      <Reveal>
        <SectionTitle index="05" eyebrow="THE STORY, ON PAPER">
          THE OFFICIAL PAPERWORK <Star />
        </SectionTitle>
        <div className="resume-layout">
          <div className="resume-display yellow">
            <span className="resume-stamp">
              CURRICULUM
              <br />
              VITAE ↗
            </span>
            <a
              className="resume-sheet"
              href={profile.resume}
              {...external}
              aria-label="Preview Arnav's actual resume PDF in a new tab"
            >
              <Paperclip className="paperclip" size={38} />
              <img
                src="/images/resume-preview.webp"
                alt="Preview of Arnav Ashish Gurao's resume"
                width="501"
                height="708"
                loading="lazy"
              />
            </a>
            <div className="resume-actions">
              <a className="button ink" href={profile.resume} {...external}>
                VIEW RESUME <ArrowUpRight size={17} />
              </a>
              <a className="button paper" href={profile.resume} download>
                DOWNLOAD PDF <ArrowDown size={17} />
              </a>
            </div>
          </div>
          <div className="milestones">
            <h3>
              MILESTONES & WINS <span aria-hidden="true">★</span>
            </h3>
            {milestones.map((item) => (
              <div className="milestone" key={item.title}>
                <span className={`milestone-icon ${item.type === 'award' ? 'yellow' : 'mint'}`}>
                  {item.type === 'award' ? <Award size={24} /> : <BadgeCheck size={24} />}
                </span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.detail}</p>
                </div>
              </div>
            ))}
            <details className="hackathons">
              <summary>
                ALSO FOUND AT THESE HACKATHONS <span>+</span>
              </summary>
              <ul>
                {hackathons.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </details>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
