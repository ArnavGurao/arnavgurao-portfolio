import {
  siReact,
  siPython,
  siJavascript,
  siGithub,
  siPostgresql,
  siGooglecloud,
  siC,
  siHtml5,
  siCss,
  siFastapi,
  siSqlite,
  siGit,
  siVite,
  siInstagram,
} from 'simple-icons'
import type { SimpleIcon } from 'simple-icons'
import { Code2 } from 'lucide-react'

const icons: Record<string, SimpleIcon> = {
  React: siReact,
  'React Native': siReact,
  Python: siPython,
  JavaScript: siJavascript,
  GitHub: siGithub,
  PostgreSQL: siPostgresql,
  'Google Cloud': siGooglecloud,
  C: siC,
  HTML: siHtml5,
  CSS: siCss,
  FastAPI: siFastapi,
  SQLite: siSqlite,
  Git: siGit,
  Vite: siVite,
  Instagram: siInstagram,
}

export function TechIcon({ name, size = 24 }: { name: string; size?: number }) {
  if (['AWS', 'Java', 'LinkedIn'].includes(name))
    return (
      <img
        src={`/icons/${name.toLowerCase()}.svg`}
        width={size}
        height={size}
        alt=""
        aria-hidden="true"
      />
    )
  const icon = icons[name]
  if (icon)
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={icon.path} />
      </svg>
    )
  return <Code2 size={size} aria-hidden="true" strokeWidth={1.8} />
}
