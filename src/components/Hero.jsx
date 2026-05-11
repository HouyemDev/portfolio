import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

/* Typewriter hook */
function useTypewriter(words, speed = 80, pause = 2000) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    const delay = deleting
      ? speed / 2
      : charIdx === current.length ? pause : speed

    const timer = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setDisplay(current.slice(0, charIdx + 1))
        setCharIdx(c => c + 1)
      } else if (!deleting && charIdx === current.length) {
        setDeleting(true)
      } else if (deleting && charIdx > 0) {
        setDisplay(current.slice(0, charIdx - 1))
        setCharIdx(c => c - 1)
      } else {
        setDeleting(false)
        setWordIdx(i => (i + 1) % words.length)
      }
    }, delay)
    return () => clearTimeout(timer)
  }, [charIdx, deleting, wordIdx, words, speed, pause])

  return display
}

export default function Hero() {
  const { t } = useTranslation()
  const typed = useTypewriter([
    '.NET Core Engineer',
    'Laravel Developer',
    'FastAPI Builder',
    'NLP / AI Engineer',
    'Backend Architect',
  ])

  return (
    <section style={{
      minHeight: '100vh', position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'center',
      padding: '7rem 5vw 5rem',
    }}>
      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(30,111,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(30,111,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
      }} />

      {/* Radial glows */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: `
          radial-gradient(ellipse 70% 60% at 55% 45%, rgba(30,111,255,0.1) 0%, transparent 65%),
          radial-gradient(ellipse 50% 40% at 85% 20%, rgba(56,189,248,0.07) 0%, transparent 60%),
          radial-gradient(ellipse 40% 50% at 10% 80%, rgba(30,111,255,0.05) 0%, transparent 60%)
        `,
      }} />

      {/* Scanline effect */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.4), transparent)',
        animation: 'scanline 6s linear infinite',
        zIndex: 1,
      }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 780 }}>

        {/* Terminal badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.72rem', color: 'var(--cyan)',
          background: 'rgba(56,189,248,0.07)',
          border: '1px solid rgba(56,189,248,0.2)',
          padding: '0.4rem 0.9rem', borderRadius: '6px',
          marginBottom: '1.8rem',
          animation: 'fadeUp 0.5s ease both',
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: 'var(--cyan)',
            animation: 'pulseBlue 2s infinite',
            display: 'inline-block',
          }} />
          {t('hero.badge')}
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)',
          lineHeight: 1.08, letterSpacing: '-1.5px',
          animation: 'fadeUp 0.5s 0.1s ease both',
          color: 'var(--text)',
        }}>
          Houyem{' '}
          <span style={{
            background: 'linear-gradient(135deg, #60a5fa 0%, #38bdf8 50%, #93c5fd 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>Noomen</span>
        </h1>

        {/* Typewriter */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 'clamp(0.95rem, 2vw, 1.2rem)',
          color: 'var(--silver)',
          marginTop: '0.6rem',
          marginBottom: '1.4rem',
          animation: 'fadeUp 0.5s 0.15s ease both',
          minHeight: '1.8em',
        }}>
          <span style={{ color: 'var(--muted)' }}>$ role = </span>
          <span style={{ color: 'var(--cyan)' }}>"</span>
          <span>{typed}</span>
          <span style={{
            display: 'inline-block', width: '2px', height: '1em',
            background: 'var(--cyan)', marginLeft: '2px', verticalAlign: 'text-bottom',
            animation: 'blink 1s step-end infinite',
          }} />
          <span style={{ color: 'var(--cyan)' }}>"</span>
        </div>

        {/* Subtitle */}
        <p style={{
          maxWidth: 540, color: 'var(--silver)',
          fontSize: '1rem', fontWeight: 300, lineHeight: 1.8,
          animation: 'fadeUp 0.5s 0.2s ease both',
        }}
          dangerouslySetInnerHTML={{ __html: t('hero.sub') }}
        />

        {/* CTAs */}
        <div style={{
          marginTop: '2.2rem', display: 'flex', gap: '0.8rem', flexWrap: 'wrap',
          animation: 'fadeUp 0.5s 0.3s ease both',
        }}>
          <a href="#projects" className="btn-primary">{t('hero.cta_work')} →</a>
          <a href="/resume.pdf" download className="btn-outline">
            ↓ {t('hero.cta_resume')}
          </a>
          <a href="#contact" className="btn-outline">{t('hero.cta_contact')}</a>
        </div>

        {/* Stats */}
        <div style={{
          marginTop: '3.5rem',
          display: 'grid', gridTemplateColumns: 'repeat(3,auto)',
          gap: '0 3rem', width: 'fit-content',
          animation: 'fadeUp 0.5s 0.4s ease both',
        }}>
          {[
            [t('hero.stat1_num'), t('hero.stat1_label')],
            [t('hero.stat2_num'), t('hero.stat2_label')],
            [t('hero.stat3_num'), t('hero.stat3_label')],
          ].map(([num, label], i) => (
            <div key={i} style={{
              display: 'flex', flexDirection: 'column', gap: '0.1rem',
              paddingRight: i < 2 ? '3rem' : 0,
              borderRight: i < 2 ? '1px solid var(--border)' : 'none',
            }}>
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700, fontSize: '2rem', letterSpacing: '-1px',
                background: 'linear-gradient(135deg, #e2e8f0, #94a3b8)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>{num}</span>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.68rem', color: 'var(--muted)',
                letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Corner decoration */}
      <div style={{
        position: 'absolute', right: '8vw', top: '50%', transform: 'translateY(-50%)',
        opacity: 0.07, zIndex: 1, pointerEvents: 'none',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.65rem', color: 'var(--cyan)',
        lineHeight: 1.8, textAlign: 'left',
        animation: 'fadeUp 0.5s 0.5s ease both',
      }}>
        {[
          'class Engineer {',
          '  stack = [".NET", "Laravel",',
          '           "FastAPI", "Redis"];',
          '  skills = ["Backend", "APIs",',
          '            "NLP", "DevOps"];',
          '  location = "Sousse, TN";',
          '  status = "available";',
          '}',
        ].map((line, i) => (
          <div key={i}><span style={{ color: 'var(--muted)', marginRight: '1rem' }}>{String(i + 1).padStart(2, '0')}</span>{line}</div>
        ))}
      </div>
    </section>
  )
}
