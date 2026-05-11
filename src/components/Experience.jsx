import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import experiences from '../data/experience.json'

export default function Experience() {
  const { t, i18n } = useTranslation()
  const lang = ['fr','en','ar'].includes(i18n.language) ? i18n.language : 'fr'
  return (
    <section id="experience">
      <div className="section-label">{t('experience.label')}</div>
      <div className="section-title">{t('experience.title')}</div>
      <div style={{ maxWidth: 820, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {experiences.map((exp, i) => (
          <ExpCard key={exp.id} exp={exp} lang={lang} t={t} delay={i * 0.08} />
        ))}
      </div>
    </section>
  )
}

function ExpCard({ exp, lang, t, delay }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="card" style={{ padding: '1.8rem', animation: `fadeUp 0.5s ${delay}s ease both` }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <div style={{
            width: 42, height: 42, borderRadius: 10, flexShrink: 0,
            background: 'rgba(30,111,255,0.1)',
            border: '1px solid rgba(30,111,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.1rem',
          }}>{exp.icon}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text)', marginBottom: '0.15rem' }}>
              {exp.role[lang]}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--silver)', marginBottom: '0.5rem' }}>
              {exp.company}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {exp.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem', flexShrink: 0 }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.72rem', color: 'var(--cyan)',
            background: 'rgba(56,189,248,0.08)',
            border: '1px solid rgba(56,189,248,0.18)',
            padding: '0.25rem 0.7rem', borderRadius: '4px',
          }}>{exp.date[lang]}</span>
          <button onClick={() => setOpen(o => !o)} style={{
            background: 'transparent', border: 'none',
            color: 'var(--muted)', cursor: 'pointer', fontSize: '0.78rem',
            fontFamily: "'JetBrains Mono', monospace",
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color = 'var(--cyan)'}
            onMouseLeave={e => e.target.style.color = 'var(--muted)'}
          >{open ? '[ collapse ]' : '[ expand ]'}</button>
        </div>
      </div>

      {/* Expandable bullets */}
      {open && (
        <div style={{
          marginTop: '1.2rem', paddingTop: '1.2rem',
          borderTop: '1px solid var(--border)',
          animation: 'fadeUp 0.3s ease both',
        }}>
          <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {exp.bullets[lang].map((b, i) => (
              <li key={i} style={{ fontSize: '0.88rem', color: 'var(--silver)', lineHeight: 1.7 }}>
                {b}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Impact badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
        marginTop: '1rem', fontSize: '0.73rem',
        color: '#34d399',
        background: 'rgba(52,211,153,0.08)',
        border: '1px solid rgba(52,211,153,0.18)',
        padding: '0.25rem 0.75rem', borderRadius: '4px',
      }}>
        <span>▲</span> {exp.impact[lang]}
      </div>
    </div>
  )
}
