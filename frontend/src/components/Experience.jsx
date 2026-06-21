const timeline = [
  {
    type: 'work',
    title: 'MERN Stack Developer Intern',
    org: 'Widezo Pvt Ltd',
    period: 'June 2025 – July 2025',
    color: 'brand-violet',
    points: [
      'Built 2 MERN Stack modules — user auth and product CRUD — within a 1-month timeline',
      'Developed and tested 10+ RESTful API endpoints using Postman; resolved response time issues via query optimization',
      'Implemented JWT Authentication and authorization for secure API access',
      'Collaborated on API Integration, CRUD Operations, and Git/GitHub workflows',
    ]
  },
  {
    type: 'edu',
    title: 'B.E. in Information Technology',
    org: 'Annamalai University',
    period: '2022 – 2026',
    color: 'brand-cyan',
    points: [
      'CGPA: 8.2 / 10',
      'Specialized in web development and software engineering fundamentals',
      'Built 3 full-stack MERN projects as part of self-learning and portfolio development',
    ]
  }
]

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 text-center">
          <span className="font-mono text-xs text-brand-violet uppercase tracking-widest">Background</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mt-2">
            Experience &{' '}
            <span className="gradient-text">Education</span>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-brand-border md:left-1/2" />

          <div className="space-y-12">
            {timeline.map((item, idx) => (
              <div key={idx} className={`relative flex gap-6 md:gap-0 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Dot */}
                <div className="absolute left-6 top-6 -translate-x-1/2 w-3 h-3 rounded-full bg-brand-violet border-2 border-brand-bg z-10 md:left-1/2" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-[45%] ${idx % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="p-5 rounded-2xl bg-brand-card border border-brand-border card-hover">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-display font-semibold text-white text-base">{item.title}</h3>
                        <p className={`font-mono text-sm text-${item.color} mt-0.5`}>{item.org}</p>
                      </div>
                      <span className="font-mono text-xs text-brand-muted whitespace-nowrap">{item.period}</span>
                    </div>
                    <ul className="space-y-1.5">
                      {item.points.map((pt, i) => (
                        <li key={i} className="flex gap-2 text-brand-muted text-sm font-body">
                          <span className="text-brand-violet mt-1 flex-shrink-0">▸</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
