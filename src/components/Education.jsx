import { useTranslation } from 'react-i18next'

const EDU = [
  {
    icon: '🎓',
    date: { fr: '2023 – 2025', en: '2023 – 2025', ar: '2023 – 2025' },
    degree: {
      fr: "Master – Génie Logiciel & Développement Rapide d'Applications (EAD)",
      en: "Master's – Software Engineering & Rapid Application Development (EAD)",
      ar: "ماجستير – هندسة البرمجيات وتطوير التطبيقات السريع"
    },
    school: 'ISET Sousse · Sousse, Tunisie',
  },
  {
    icon: '📚',
    date: { fr: '2020 – 2023', en: '2020 – 2023', ar: '2020 – 2023' },
    degree: {
      fr: 'Licence – Développement des Systèmes d\'Information',
      en: "Bachelor's – Information Systems Development",
      ar: 'ليسانس – تطوير أنظمة المعلومات'
    },
    school: 'ISET Sousse · Sousse, Tunisie',
  },
]

const LANGS = [
  { flag: '🇹🇳', name: 'العربية / Arabic', level: 'native' },
  { flag: '🇫🇷', name: 'Français', level: 'b2' },
  { flag: '🇬🇧', name: 'English', level: 'b2' },
]

export default function Education() {
  const { t, i18n } = useTranslation()
  const lang = ['fr','en','ar'].includes(i18n.language) ? i18n.language : 'fr'

  return (
    <section id="education">
      <div className="section-label">{t('education.label')}</div>
      <div className="section-title">{t('education.title')}</div>

      {/* Education cards */}
      <div style={{ maxWidth: 720, display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
        {EDU.map((e, i) => (
          <div key={i} className="card" style={{ padding: '1.5rem', display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, flexShrink: 0,
              background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem',
            }}>{e.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.68rem', color: 'var(--cyan)', marginBottom: '0.3rem',
              }}>{e.date[lang]}</div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text)', marginBottom: '0.25rem' }}>
                {e.degree[lang]}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>{e.school}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Languages */}
      <div style={{ marginBottom: '3rem' }}>
        <div className="section-label" style={{ marginBottom: '1rem' }}>{t('education.lang_label')}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {LANGS.map(l => (
            <div key={l.name} style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: '8px', padding: '0.6rem 1.2rem',
            }}>
              <span style={{ fontSize: '1.2rem' }}>{l.flag}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{l.name}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: 'var(--muted)' }}>
                  {l.level === 'native' ? t('education.native') : t('education.b2')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Organisations */}
      <div>
        <div className="section-label" style={{ marginBottom: '1rem' }}>{t('education.orgs_label')}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', maxWidth: 720 }}>
          {[
            {
              label: t('education.orgs_member'),
              bullets: {
                fr: ['Collaboration avec une équipe de développeurs pour des applications réelles.', 'Animation d\'ateliers techniques pour les étudiants.'],
                en: ['Collaborated with developers to build real-world applications.', 'Organized technical workshops for students.'],
                ar: ['التعاون مع فريق المطورين لبناء تطبيقات حقيقية.', 'تنظيم ورش عمل تقنية للطلاب.']
              }
            },
            {
              label: t('education.orgs_participant'),
              bullets: {
                fr: ['Développement d\'une mentalité entrepreneuriale via des ateliers intensifs.'],
                en: ['Developed an entrepreneurial mindset through intensive workshops.'],
                ar: ['تطوير عقلية ريادية من خلال ورش العمل المكثفة.']
              }
            }
          ].map((org, i) => (
            <div key={i} className="card" style={{ padding: '1.3rem', flex: '1', minWidth: '260px' }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.7rem', color: 'var(--cyan)',
                marginBottom: '0.7rem',
              }}>{org.label}</div>
              <ul style={{ paddingLeft: '1rem' }}>
                {org.bullets[lang].map((b, j) => (
                  <li key={j} style={{ fontSize: '0.83rem', color: 'var(--silver)', lineHeight: 1.7 }}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
