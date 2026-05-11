import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer style={{
      padding: '2rem 5vw', borderTop: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: '0.5rem',
    }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: 'var(--muted)' }}>
        {t('footer.built')} <a href="mailto:noomene.houyem@gmail.com"
          style={{ color: 'var(--cyan)', textDecoration: 'none' }}>Houyem Noomen</a>
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem',
          color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.4rem',
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: '#34d399', display: 'inline-block',
            animation: 'pulseBlue 2.5s infinite',
          }} />
          {t('footer.open')}
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', color: 'var(--muted)' }}>
          © {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  )
}
