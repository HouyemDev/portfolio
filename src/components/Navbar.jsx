import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const LANGS = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'AR' },
]

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { href: '#skills',     label: t('nav.skills') },
    { href: '#experience', label: t('nav.experience') },
    { href: '#projects',   label: t('nav.projects') },
    { href: '#contact',    label: t('nav.contact') },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0.9rem 5vw',
      background: scrolled ? 'rgba(5,8,16,0.95)' : 'rgba(5,8,16,0.5)',
      backdropFilter: 'blur(16px)',
      borderBottom: `1px solid ${scrolled ? 'rgba(148,163,184,0.12)' : 'transparent'}`,
      transition: 'all 0.3s',
    }}>
      {/* Logo */}
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.75rem', color: 'var(--cyan)', letterSpacing: '0.05em',
        }}>{'<'}</span>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700, fontSize: '1rem',
          background: 'linear-gradient(90deg, #e8edf5, #94a3b8)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>HN</span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.75rem', color: 'var(--cyan)', letterSpacing: '0.05em',
        }}>{'/>'}</span>
      </a>

      {/* Links */}
      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', alignItems: 'center' }}
        className="hn-nav-links">
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href} style={{
              color: 'var(--muted)', fontSize: '0.85rem', fontWeight: 500,
              transition: 'color 0.2s', textDecoration: 'none',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--text)'}
              onMouseLeave={e => e.target.style.color = 'var(--muted)'}
            >{l.label}</a>
          </li>
        ))}
      </ul>

      {/* Right: lang + CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        {/* Lang switcher */}
        <div style={{
          display: 'flex', gap: '2px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid var(--border)',
          borderRadius: '8px', padding: '3px',
        }}>
          {LANGS.map(lang => (
            <button key={lang.code}
              onClick={() => i18n.changeLanguage(lang.code)}
              style={{
                background: i18n.language === lang.code
                  ? 'rgba(30,111,255,0.25)' : 'transparent',
                border: 'none',
                color: i18n.language === lang.code ? '#93c5fd' : 'var(--muted)',
                padding: '0.25rem 0.55rem',
                borderRadius: '6px',
                fontSize: '0.72rem', fontWeight: 600,
                cursor: 'pointer',
                fontFamily: "'JetBrains Mono', monospace",
                transition: 'all 0.15s',
              }}>
              {lang.label}
            </button>
          ))}
        </div>

        <a href="#contact" className="btn-primary"
          style={{ padding: '0.4rem 1rem', fontSize: '0.82rem', boxShadow: 'none' }}>
          {t('nav.hire')}
        </a>
      </div>

      <style>{`@media(max-width:680px){.hn-nav-links{display:none!important}}`}</style>
    </nav>
  )
}
