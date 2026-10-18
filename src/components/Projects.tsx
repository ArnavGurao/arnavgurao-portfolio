import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Database,
  MapPin,
  Navigation,
  Plus,
  ShieldCheck,
  Star as StarIcon,
  Wifi,
} from 'lucide-react'
import { projects } from '../data/projects'
import { Reveal, SectionTitle, external } from './Shared'
import { TechIcon } from './TechIcon'

function ProjectArt({ name }: { name: string }) {
  return (
    <div
      className={`project-art art-${name.toLowerCase()}`}
      role="img"
      aria-label={`${name} conceptual illustration, not a live application screenshot`}
    >
      <span className="art-caption">CONCEPT SKETCH / {name.toUpperCase()}</span>
      {name === 'DataGuard' ? (
        <>
          <div className="data-window">
            <div className="window-top">
              <span />
              <span />
              <span />
              <small>dataguard / workspace</small>
            </div>
            <div className="data-window-body">
              <div className="flex items-center gap-2">
                <Database size={22} />
                <strong>Data, cleaned up.</strong>
                <ShieldCheck className="ml-auto" size={24} />
              </div>
              <div className="data-table">
                {['Missing values', 'Duplicate records', 'Schema validation'].map((item) => (
                  <div key={item}>
                    <span>{item}</span>
                    <Check size={14} />
                  </div>
                ))}
              </div>
              <div className="data-complete">
                <span className="status-dot" /> READY FOR A FRESH START
              </div>
            </div>
          </div>
          <div className="data-badge">
            <ShieldCheck size={24} /> QUALITY FIRST
          </div>
        </>
      ) : name === 'Cardexa' ? (
        <>
          <div className="credit-card card-back">
            <span>CARDEXA</span>
            <Wifi size={22} />
            <strong>
              YOUR CARDS.
              <br />
              ONE PLACE.
            </strong>
          </div>
          <div className="credit-card card-front">
            <span>
              CARDEXA
              <span className="card-chip" />
            </span>
            <strong>
              less clutter.
              <br />
              more control.
            </strong>
            <span>
              •••• &nbsp; •••• &nbsp; •••• &nbsp; ••••
              <StarIcon size={20} />
            </span>
          </div>
          <span className="card-spark">✳</span>
        </>
      ) : (
        <>
          <div className="map-grid">
            <svg viewBox="0 0 400 220" aria-hidden="true">
              <path
                d="M30 170h100V65h140v90h90"
                fill="none"
                stroke="#111"
                strokeWidth="5"
                strokeDasharray="10 8"
              />
            </svg>
            <div className="map-start">
              <Navigation size={24} />
            </div>
            <div className="map-destination">
              <Plus size={31} />
            </div>
            <div className="map-label">
              <MapPin size={20} />
              <span>
                FIND HELP.
                <br />
                <strong>MAKE CONNECTIONS.</strong>
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export function Projects() {
  return (
    <section id="projects" className="section container">
      <Reveal>
        <SectionTitle
          index="03"
          eyebrow="FROM AN IDEA TO A THING"
          aside="A few things I've put my curiosity into."
        >
          THINGS I'VE BUILT <span aria-hidden="true">↗</span>
        </SectionTitle>
      </Reveal>
      <div className="projects-grid">
        {projects.map((project, i) => (
          <Reveal key={project.name} className={`project-wrap project-wrap-${i}`}>
            <article className={`project-card ${project.color}`}>
              <div className="project-top">
                <span className="eyebrow">{project.category}</span>
                <span className="project-number">0{i + 1} / 03</span>
              </div>
              <ProjectArt name={project.name} />
              <div className="project-content">
                <h3>
                  {project.name}
                  <span aria-hidden="true">↗</span>
                </h3>
                <h4>{project.subtitle}</h4>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tech.map((tech) => (
                    <span className="tag" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
                <details>
                  <summary>
                    UNDER THE HOOD <ChevronDown size={18} />
                  </summary>
                  <ul>
                    {project.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </details>
                <div className="project-links">
                  {project.repo && (
                    <a href={project.repo} {...external} className="text-link">
                      <TechIcon name="GitHub" size={17} /> VIEW SOURCE <ArrowUpRight size={16} />
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} {...external} className="text-link">
                      LIVE DEMO <ArrowUpRight size={16} />
                    </a>
                  )}
                  {!project.repo && (
                    <span className="project-note">
                      Built for the IIT Madras Road Safety Hackathon
                    </span>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
