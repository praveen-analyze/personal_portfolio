import { useEffect, useState } from 'react'
import api from '../api/axios'

function ProjectCard({ project }) {
  return (
    <div className="group relative p-6 rounded-2xl bg-brand-card border border-brand-border card-hover flex flex-col h-full">
      {project.featured && (
        <div className="absolute top-4 right-4">
          <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-brand-violet/20 text-brand-violet border border-brand-violet/30">
            Featured
          </span>
        </div>
      )}

      <div className="mb-4">
        <h3 className="font-display font-semibold text-lg text-white mb-2 group-hover:text-brand-cyan transition-colors pr-20">
          {project.title}
        </h3>
        <p className="font-body text-sm text-brand-muted leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
        {project.techStack.map(tech => (
          <span key={tech} className="px-2 py-0.5 rounded-md text-xs font-mono text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20">
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-2 rounded-lg bg-gradient-to-r from-brand-violet to-brand-purple text-white text-xs font-display font-semibold hover:opacity-90 transition-opacity"
          >
            Live Demo ↗
          </a>
        )}
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-2 rounded-lg border border-brand-border text-brand-muted text-xs font-display font-semibold hover:border-brand-violet hover:text-white transition-all"
          >
            GitHub ↗
          </a>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    api.get('/projects')
      .then(res => setProjects(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const filtered = filter === 'featured'
    ? projects.filter(p => p.featured)
    : projects

  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-radial from-brand-violet/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12 text-center">
          <span className="font-mono text-xs text-brand-violet uppercase tracking-widest">What I've Built</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mt-2">
            Featured{' '}
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="font-body text-brand-muted text-sm mt-3 max-w-xl mx-auto">
            Full-stack MERN applications built and deployed from scratch — all live.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-3 mb-10">
          {['all', 'featured'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-xs font-mono font-medium transition-all duration-200 ${
                filter === f
                  ? 'bg-brand-violet text-white'
                  : 'bg-brand-surface border border-brand-border text-brand-muted hover:border-brand-violet'
              }`}
            >
              {f === 'all' ? 'All Projects' : 'Featured'}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-72 rounded-2xl bg-brand-card border border-brand-border animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-mono text-brand-muted text-sm">No projects found.</p>
            <p className="font-mono text-brand-muted/50 text-xs mt-1">
              Go to <a href="/admin" className="text-brand-violet hover:underline">/admin</a> to seed your projects.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(project => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
