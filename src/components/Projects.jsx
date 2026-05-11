import { useTranslation } from 'react-i18next'
import projects from '../data/projects.json'

const COLOR_MAP = {
  cyan:   { bg: 'rgba(56,189,248,0.1)',   text: '#38bdf8', border: 'rgba(56,189,248,0.2)' },
  blue:   { bg: 'rgba(30,111,255,0.12)',  text: '#60a5fa', border: 'rgba(30,111,255,0.22)' },
  indigo: { bg: 'rgba(129,140,248,0.1)',  text: '#a5b4fc', border: 'rgba(129,140,248,0.2)' },
  silver: { bg: 'rgba(148,163,184,0.08)', text: '#94a3b8', border: 'rgba(148,163,184,0.18)' },
  green:  { bg: 'rgba(52,211,153,0.1)',   text: '#34d399', border: 'rgba(52,211,153,0.2)' },
  amber:  { bg: 'rgba(251,191,36,0.1)',   text: '#fbbf24', border: 'rgba(251,191,36,0.2)' },
}

export default function Projects() {
  const { t, i18n } = useTranslation()
  const lang = ['fr','en','ar'].includes(i18n.language) ? i18n.language : 'fr'

  return (
    <section id="projects" style={{ background: 'var(--bg2)' }}>
      <div className="section-label">{t('projects.label')}</div>
      <div className="section-title">{t('projects.title')}</div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.2rem',
      }}>
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} lang={lang} t={t} delay={i * 0.07} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project, lang, t, delay }) {
  const c = COLOR_MAP[project.color] || COLOR_MAP.blue

  return (
    <div className="card" style={{
      padding: '1.8rem',
      display: 'flex', flexDirection: 'column',
      animation: `fadeUp 0.5s ${delay}s ease both`,
    }}>
      {/* Top accent line */}
      <div style={{
        height: 1, marginBottom: '1.4rem',
        background: `linear-gradient(90deg, ${c.text}60, transparent)`,
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{
          width: 46, height: 46, borderRadius: 10,
          background: c.bg, border: `1px solid ${c.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.4rem',
        }}>{project.icon}</div>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.68rem', color: 'var(--muted)',
        }}>{project.year}</span>
      </div>

      <div style={{
        fontWeight: 700, fontSize: '1rem', color: 'var(--text)',
        marginBottom: '0.6rem', lineHeight: 1.3,
      }}>{project.title[lang]}</div>

      <div style={{
        fontSize: '0.85rem', color: 'var(--silver)',
        lineHeight: 1.7, flex: 1, marginBottom: '1.2rem',
      }}>{project.description[lang]}</div>

      {/* Stack */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.9rem' }}>
        {project.stack.map(s => (
          <span key={s} style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.66rem', padding: '0.2rem 0.6rem',
            background: c.bg, color: c.text,
            border: `1px solid ${c.border}`, borderRadius: '4px',
          }}>{s}</span>
        ))}
      </div>

      {/* Impact */}
      {project.impact?.[lang] && (
        <div style={{
          fontSize: '0.72rem', color: '#34d399',
          background: 'rgba(52,211,153,0.07)',
          border: '1px solid rgba(52,211,153,0.15)',
          padding: '0.35rem 0.75rem', borderRadius: '4px',
          marginBottom: '1rem',
        }}>▲ {project.impact[lang]}</div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: '0.6rem' }}>
        <button
          onClick={() => {
            const url = project.previewUrl || project.githubUrl
            if (url) window.open(url, '_blank', 'noopener,noreferrer')
          }}
          style={{
            flex: 1, padding: '0.55rem',
            background: c.bg, border: `1px solid ${c.border}`,
            borderRadius: '6px', color: c.text,
            fontSize: '0.78rem', fontWeight: 600,
            cursor: 'pointer', transition: 'opacity 0.2s',
            fontFamily: "'JetBrains Mono', monospace",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          {project.previewUrl ? `⎋ ${t('projects.preview')}` : `⎋ ${t('projects.github')}`}
        </button>
        {project.githubUrl && project.previewUrl && (
          <button
            onClick={() => window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
            style={{
              padding: '0.55rem 0.9rem',
              background: 'transparent',
              border: '1px solid var(--border-hi)',
              borderRadius: '6px', color: 'var(--muted)',
              fontSize: '0.78rem', cursor: 'pointer',
              fontFamily: "'JetBrains Mono', monospace",
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color='var(--cyan)'; e.currentTarget.style.borderColor='var(--cyan)' }}
            onMouseLeave={e => { e.currentTarget.style.color='var(--muted)'; e.currentTarget.style.borderColor='var(--border-hi)' }}
          >gh</button>
        )}
      </div>
    </div>
  )
}
