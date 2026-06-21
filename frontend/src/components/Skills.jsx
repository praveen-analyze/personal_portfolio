const skillGroups = [
  {
    category: 'Frontend',
    color: 'from-brand-pink to-brand-violet',
    border: 'border-brand-pink/30',
    glow: 'rgba(236,72,153,0.15)',
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'JavaScript (ES6+)', level: 85 },
      { name: 'Tailwind CSS', level: 88 },
      { name: 'HTML5 / CSS3', level: 92 },
      { name: 'React Hooks', level: 85 },
      { name: 'Framer Motion', level: 70 },
    ]
  },
  {
    category: 'Backend',
    color: 'from-brand-violet to-brand-cyan',
    border: 'border-brand-violet/30',
    glow: 'rgba(124,58,237,0.15)',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 88 },
      { name: 'REST APIs', level: 90 },
      { name: 'JWT Auth', level: 85 },
      { name: 'Middleware', level: 80 },
    ]
  },
  {
    category: 'Database & Tools',
    color: 'from-brand-cyan to-green-400',
    border: 'border-brand-cyan/30',
    glow: 'rgba(6,182,212,0.15)',
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'Mongoose', level: 82 },
      { name: 'Postman', level: 90 },
      { name: 'Git / GitHub', level: 88 },
    ]
  },
  {
    category: 'Integrations',
    color: 'from-green-400 to-brand-pink',
    border: 'border-green-400/30',
    glow: 'rgba(74,222,128,0.15)',
    skills: [
      { name: 'Firebase Auth', level: 80 },
      { name: 'Razorpay', level: 78 },
      { name: 'Cloudinary', level: 82 },
      { name: 'Vercel / Render', level: 85 },
      { name: 'Google Maps API', level: 72 },
    ]
  }
]

function SkillBar({ name, level }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="font-mono text-xs text-brand-muted">{name}</span>
        <span className="font-mono text-xs text-brand-violet">{level}%</span>
      </div>
      <div className="h-1 bg-brand-border rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-violet to-brand-cyan"
          style={{ width: `${level}%`, transition: 'width 1s ease' }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="font-mono text-xs text-brand-violet uppercase tracking-widest">Technical Expertise</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mt-2">
            Skills &{' '}
            <span className="gradient-text">Stack</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillGroups.map(group => (
            <div
              key={group.category}
              className={`p-6 rounded-2xl bg-brand-card border ${group.border} card-hover`}
              style={{ boxShadow: `0 0 30px ${group.glow}` }}
            >
              <div className={`inline-block font-display font-semibold text-sm px-3 py-1 rounded-full bg-gradient-to-r ${group.color} text-white mb-5`}>
                {group.category}
              </div>
              {group.skills.map(skill => (
                <SkillBar key={skill.name} {...skill} />
              ))}
            </div>
          ))}
        </div>

        {/* Tech badges */}
        <div className="mt-12 text-center">
          <p className="font-mono text-xs text-brand-muted mb-4 uppercase tracking-widest">Also familiar with</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Axios', 'Nodemailer', 'Recharts', 'Bcrypt', 'Tiptap', 'Firebase Admin SDK', 'MongoDB Atlas', 'Render', 'Context API'].map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs font-mono text-brand-muted bg-brand-surface border border-brand-border hover:border-brand-violet hover:text-brand-violet transition-all duration-200">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
