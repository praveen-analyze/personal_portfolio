import { useState, useEffect } from 'react'

const links = ['Home', 'Skills', 'Projects', 'Experience', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-brand-bg/90 backdrop-blur-xl border-b border-brand-border' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <span
          className="font-display font-bold text-xl cursor-pointer"
          onClick={() => scrollTo('hero')}
        >
          <span className="gradient-text">PK</span>
          <span className="text-brand-muted font-mono text-sm ml-1">.dev</span>
        </span>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="font-body text-sm text-brand-muted hover:text-white transition-colors duration-200 hover:text-brand-cyan"
            >
              {link}
            </button>
          ))}
          <a
            href="/admin"
            className="font-body text-xs px-3 py-1.5 rounded-full border border-brand-border text-brand-muted hover:border-brand-violet hover:text-brand-violet transition-all duration-200"
          >
            Admin
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-brand-muted hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-surface border-b border-brand-border px-6 py-4 flex flex-col gap-4">
          {links.map(link => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-left font-body text-sm text-brand-muted hover:text-white transition-colors"
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
