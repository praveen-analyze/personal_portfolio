import { useEffect, useState } from 'react'

const roles = ['MERN Stack Developer', 'Full Stack Developer', 'React Developer', 'Node.js Developer']

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const target = roles[roleIdx]
    let i = 0
    if (typing) {
      const t = setInterval(() => {
        setDisplayed(target.slice(0, i + 1))
        i++
        if (i === target.length) { clearInterval(t); setTimeout(() => setTyping(false), 1800) }
      }, 60)
      return () => clearInterval(t)
    } else {
      let j = target.length
      const t = setInterval(() => {
        setDisplayed(target.slice(0, j - 1))
        j--
        if (j === 0) { clearInterval(t); setRoleIdx(p => (p + 1) % roles.length); setTyping(true) }
      }, 40)
      return () => clearInterval(t)
    }
  }, [roleIdx, typing])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden noise-bg">
      {/* Background glow */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-brand-violet/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-cyan/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-surface border border-brand-border mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span className="font-mono text-xs text-brand-muted">Available for opportunities</span>
        </div>

        {/* Name */}
        <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl mb-4 leading-none tracking-tight">
          <span className="text-white">Praveen</span>{' '}
          <span className="gradient-text">Kumar</span>
        </h1>

        {/* Typewriter role */}
        <div className="h-12 md:h-16 flex items-center justify-center mb-6">
          <p className="font-display font-medium text-xl md:text-3xl text-brand-muted">
            <span className="text-white">{displayed}</span>
            <span className="inline-block w-0.5 h-7 bg-brand-violet ml-1 animate-pulse"></span>
          </p>
        </div>

        {/* Description */}
        <p className="font-body text-brand-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
          2026 B.E. graduate building scalable web apps with{' '}
          <span className="text-brand-cyan font-medium">MongoDB</span>,{' '}
          <span className="text-brand-violet font-medium">Express.js</span>,{' '}
          <span className="text-brand-pink font-medium">React</span> &{' '}
          <span className="text-green-400 font-medium">Node.js</span>.
          Based in Chennai — open to Chennai, Bengaluru, Hyderabad & remote.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-violet to-brand-purple text-white font-display font-semibold text-sm hover:opacity-90 transition-all duration-200 glow-violet"
          >
            View Projects
          </button>
          <a
            href="mailto:epraveen952@gmail.com"
            className="px-8 py-3.5 rounded-xl border border-brand-border text-brand-text font-display font-semibold text-sm hover:border-brand-cyan hover:text-brand-cyan transition-all duration-200"
          >
            Get in Touch
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {[
            { value: '8.2', label: 'CGPA', sub: 'Annamalai University' },
            { value: '3+', label: 'Projects', sub: 'Deployed & Live' },
            { value: '25+', label: 'APIs', sub: 'Built & Tested' },
            { value: '1', label: 'Internship', sub: 'MERN Stack' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-bold text-2xl md:text-3xl gradient-text">{stat.value}</div>
              <div className="font-body text-sm text-white font-medium">{stat.label}</div>
              <div className="font-body text-xs text-brand-muted">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <span className="font-mono text-xs text-brand-muted">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-brand-violet to-transparent"></div>
      </div>
    </section>
  )
}
