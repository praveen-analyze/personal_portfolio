import { useEffect, useState } from 'react'
import api from '../api/axios'

const emptyForm = {
  title: '', description: '', techStack: '', liveLink: '', githubLink: '', featured: false, order: 0
}

export default function Admin() {
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editing, setEditing] = useState(null)
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchProjects = () => {
    api.get('/projects')
      .then(res => setProjects(res.data))
      .catch(() => setMsg('Failed to load projects'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchProjects() }, [])

  const notify = (text) => { setMsg(text); setTimeout(() => setMsg(''), 3000) }

  const handleSubmit = async () => {
    if (!form.title || !form.description) return notify('Title and description required')
    const payload = { ...form, techStack: form.techStack.split(',').map(s => s.trim()).filter(Boolean) }
    try {
      if (editing) {
        await api.put(`/projects/${editing}`, payload)
        notify('Project updated!')
      } else {
        await api.post('/projects', payload)
        notify('Project added!')
      }
      setForm(emptyForm)
      setEditing(null)
      fetchProjects()
    } catch { notify('Error saving project') }
  }

  const handleEdit = (p) => {
    setForm({ ...p, techStack: p.techStack.join(', ') })
    setEditing(p._id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return
    await api.delete(`/projects/${id}`)
    notify('Deleted')
    fetchProjects()
  }

  const handleSeed = async () => {
    if (!confirm('This will replace all projects with defaults. Continue?')) return
    await api.post('/projects/seed')
    notify('Seeded default projects!')
    fetchProjects()
  }

  const inp = 'w-full px-4 py-2.5 rounded-xl bg-brand-surface border border-brand-border text-white font-mono text-sm focus:outline-none focus:border-brand-violet transition-colors'

  return (
    <div className="min-h-screen bg-brand-bg text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display font-bold text-3xl gradient-text">Admin Panel</h1>
            <p className="font-mono text-xs text-brand-muted mt-1">Manage portfolio projects</p>
          </div>
          <div className="flex gap-3">
            <button onClick={handleSeed} className="px-4 py-2 text-xs font-mono rounded-xl border border-brand-border text-brand-muted hover:border-brand-violet hover:text-brand-violet transition-all">
              Seed Defaults
            </button>
            <a href="/" className="px-4 py-2 text-xs font-mono rounded-xl bg-brand-violet text-white hover:opacity-90 transition-opacity">
              ← Portfolio
            </a>
          </div>
        </div>

        {/* Notification */}
        {msg && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-brand-violet/20 border border-brand-violet/30 font-mono text-sm text-brand-violet">
            {msg}
          </div>
        )}

        {/* Form */}
        <div className="p-6 rounded-2xl bg-brand-card border border-brand-border mb-10">
          <h2 className="font-display font-semibold text-lg mb-5 text-white">
            {editing ? 'Edit Project' : 'Add New Project'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="font-mono text-xs text-brand-muted mb-1 block">Project Title *</label>
              <input className={inp} placeholder="e.g. Smart Issue Reporting System" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="font-mono text-xs text-brand-muted mb-1 block">Description *</label>
              <textarea rows={3} className={inp} placeholder="Brief project description..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="font-mono text-xs text-brand-muted mb-1 block">Tech Stack (comma separated)</label>
              <input className={inp} placeholder="MongoDB, Express.js, React.js, Node.js" value={form.techStack} onChange={e => setForm({ ...form, techStack: e.target.value })} />
            </div>
            <div>
              <label className="font-mono text-xs text-brand-muted mb-1 block">Live Link</label>
              <input className={inp} placeholder="https://..." value={form.liveLink} onChange={e => setForm({ ...form, liveLink: e.target.value })} />
            </div>
            <div>
              <label className="font-mono text-xs text-brand-muted mb-1 block">GitHub Link</label>
              <input className={inp} placeholder="https://github.com/..." value={form.githubLink} onChange={e => setForm({ ...form, githubLink: e.target.value })} />
            </div>
            <div>
              <label className="font-mono text-xs text-brand-muted mb-1 block">Display Order</label>
              <input type="number" className={inp} value={form.order} onChange={e => setForm({ ...form, order: Number(e.target.value) })} />
            </div>
            <div className="flex items-center gap-3 pt-5">
              <input type="checkbox" id="featured" className="w-4 h-4 accent-brand-violet" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
              <label htmlFor="featured" className="font-mono text-sm text-brand-muted cursor-pointer">Mark as Featured</label>
            </div>
          </div>
          <div className="flex gap-3 mt-2">
            <button onClick={handleSubmit} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-violet to-brand-purple text-white font-display font-semibold text-sm hover:opacity-90 transition-opacity">
              {editing ? 'Update Project' : 'Add Project'}
            </button>
            {editing && (
              <button onClick={() => { setForm(emptyForm); setEditing(null) }} className="px-6 py-2.5 rounded-xl border border-brand-border text-brand-muted font-display font-semibold text-sm hover:border-brand-pink hover:text-brand-pink transition-all">
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Projects list */}
        <h2 className="font-display font-semibold text-lg mb-4 text-white">All Projects ({projects.length})</h2>
        {loading ? (
          <div className="space-y-3">
            {[1,2,3].map(i => <div key={i} className="h-20 rounded-xl bg-brand-card border border-brand-border animate-pulse" />)}
          </div>
        ) : projects.length === 0 ? (
          <div className="py-12 text-center font-mono text-sm text-brand-muted">
            No projects yet — add one above or click "Seed Defaults"
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map(p => (
              <div key={p._id} className="flex items-center justify-between p-4 rounded-xl bg-brand-card border border-brand-border hover:border-brand-border/60 transition-all">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-display font-medium text-sm text-white">{p.title}</p>
                    {p.featured && <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-brand-violet/20 text-brand-violet">Featured</span>}
                  </div>
                  <p className="font-mono text-xs text-brand-muted mt-0.5">{p.techStack.slice(0,4).join(' · ')}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(p)} className="px-3 py-1.5 text-xs font-mono rounded-lg border border-brand-border text-brand-muted hover:border-brand-cyan hover:text-brand-cyan transition-all">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(p._id)} className="px-3 py-1.5 text-xs font-mono rounded-lg border border-brand-border text-brand-muted hover:border-brand-pink hover:text-brand-pink transition-all">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
