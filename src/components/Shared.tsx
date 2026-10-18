import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.45 }}
    >
      {children}
    </motion.div>
  )
}

export function Star({
  className = '',
  fill = 'currentColor',
}: {
  className?: string
  fill?: string
}) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill={fill} aria-hidden="true">
      <path
        d="m50 0 9 31 27-17-17 27 31 9-31 9 17 27-27-17-9 31-9-31-27 17 17-27L0 50l31-9-17-27 27 17Z"
        stroke="#111"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArrowDoodle({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 130 95" fill="none" aria-hidden="true">
      <path
        d="M8 13c24-11 46 7 36 28C31 64 11 46 26 32c22-21 78-4 82 43M91 63l18 16 12-21"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SectionTitle({
  index,
  eyebrow,
  children,
  aside,
}: {
  index: string
  eyebrow: string
  children: ReactNode
  aside?: string
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span>{index}</span> {eyebrow}
        </p>
        <h2>{children}</h2>
      </div>
      {aside && <p className="section-aside">{aside}</p>}
    </div>
  )
}

export const external = { target: '_blank', rel: 'noopener noreferrer' } as const
