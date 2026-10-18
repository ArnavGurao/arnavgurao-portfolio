import { useRef, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Star } from './Shared'

const links = ['About', 'Projects', 'GitHub', 'Contact']

export function Header() {
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  return (
    <header
      className="header"
      onKeyDown={(e) => {
        if (e.key === 'Escape' && open) {
          setOpen(false)
          toggle.current?.focus()
        }
      }}
    >
      <div className="container header-inner">
        <a className="wordmark" href="#top" aria-label="Arnav Gurao, back to top">
          AG<span>.</span>
          <Star />
        </a>
        <span className="header-note">
          A LITTLE CODE.
          <br />A LOT OF CURIOSITY.
        </span>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.slice(0, 3).map((link) => (
            <a href={`#${link.toLowerCase()}`} key={link}>
              {link}
            </a>
          ))}
          <a className="button button-small yellow" href="#contact">
            LET'S CONNECT <ArrowUpRight size={17} />
          </a>
        </nav>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">
          {links.map((link) => (
            <a href={`#${link.toLowerCase()}`} key={link} onClick={() => setOpen(false)}>
              {link}
              <ArrowUpRight size={20} />
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
