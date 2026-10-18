import { MotionConfig } from 'motion/react'
import { Header } from './components/Header'
import { Hero, ExpertiseMarquee } from './components/Hero'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { GitHubDashboard } from './components/GitHubDashboard'
import { Resume } from './components/Resume'
import { Contact, Footer } from './components/Contact'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="top" />
      <Header />
      <main id="main">
        <Hero />
        <ExpertiseMarquee />
        <About />
        <Skills />
        <Projects />
        <GitHubDashboard />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
