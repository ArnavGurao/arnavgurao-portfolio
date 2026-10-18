import { Wrench } from 'lucide-react'
import { skillGroups } from '../data/skills'
import { Reveal, SectionTitle } from './Shared'
import { TechIcon } from './TechIcon'

export function Skills() {
  return (
    <section id="skills" className="toolbox-section">
      <div className="container section">
        <Reveal>
          <SectionTitle
            index="02"
            eyebrow="TOOLS OF THE TRADE"
            aside="Technologies I've been working with."
          >
            MY TOOLBOX <Wrench />
          </SectionTitle>
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article className={`skill-card ${group.color}`} key={group.name}>
                <div className="skill-category">
                  <h3>{group.name}</h3>
                  <span>{group.number}</span>
                </div>
                <div className="skill-list">
                  {group.skills.map((skill) => (
                    <div className="skill-chip" key={skill}>
                      <TechIcon name={skill} size={21} />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
