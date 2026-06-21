const socials = [
  { label: 'Email', value: 'epraveen952@gmail.com', href: 'mailto:epraveen952@gmail.com', icon: '✉' },
  { label: 'LinkedIn', value: 'linkedin.com/in/praveen32', href: 'https://linkedin.com/in/praveen32', icon: '💼' },
  { label: 'GitHub', value: 'github.com/praveen-analyze', href: 'https://github.com/praveen-analyze', icon: '⌨' },
  { label: 'Phone', value: '+91 88258 40357', href: 'tel:+918825840357', icon: '📱' },
]

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow opacity-50 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-brand-violet" />

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <span className="font-mono text-xs text-brand-violet uppercase tracking-widest">Let's Work Together</span>
        <h2 className="font-display font-bold text-4xl md:text-6xl text-white mt-2 mb-4">
          Say{' '}
          <span className="gradient-text">Hello</span>
        </h2>
        <p className="font-body text-brand-muted text-base mb-12 max-w-xl mx-auto leading-relaxed">
          I'm actively looking for full-time MERN Stack roles in Chennai, Bengaluru, Hyderabad, or remote.
          Open to product companies and startups.
        </p>

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {socials.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl bg-brand-card border border-brand-border card-hover text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center text-lg flex-shrink-0">
                {s.icon}
              </div>
              <div>
                <p className="font-mono text-xs text-brand-muted">{s.label}</p>
                <p className="font-body text-sm text-white group-hover:text-brand-cyan transition-colors">{s.value}</p>
              </div>
            </a>
          ))}
        </div>

        <a
          href="mailto:epraveen952@gmail.com"
          className="inline-block px-10 py-4 rounded-xl bg-gradient-to-r from-brand-violet to-brand-cyan text-white font-display font-semibold text-sm hover:opacity-90 transition-opacity glow-violet"
        >
          Open to Opportunities — Email Me
        </a>

        <p className="font-mono text-xs text-brand-muted mt-16 opacity-50">
          Built with React · Node.js · MongoDB · Tailwind CSS
        </p>
      </div>
    </section>
  )
}
