import { useTranslation } from 'react-i18next'

const SKILL_GROUPS = [
  {
    icon: '⚙️', accentColor: '#60a5fa', name: 'Languages',
    tags: ['C#', 'Python', 'PHP', 'JavaScript', 'TypeScript'],
  },
  {
    icon: '🏗️', accentColor: '#38bdf8', name: 'Frameworks',
    tags: ['.NET Core', 'Laravel', 'FastAPI'],
  },
  {
    icon: '🔴', accentColor: '#f87171', name: 'Databases',
    tags: ['PostgreSQL', 'MySQL'],
  },
  {
    icon: '🚀', accentColor: '#a78bfa', name: 'DevOps & Tools',
    tags: ['Git', 'GitLab', 'CI/CD (GitLab CI)', 'Redis', 'RabbitMQ'],
  },
  {
    icon: '🌐', accentColor: '#34d399', name: 'Web Technologies',
    tags: ['HTML', 'CSS', 'Bootstrap', 'Vite'],
  },
  {
    icon: '💡', accentColor: '#fbbf24', name: 'Concepts',
    tags: ['REST APIs', 'System Design', 'Caching', 'Async Processing', 'API Integration'],
  },
  {
    icon: '🤖', accentColor: '#f472b6', name: 'AI / NLP',
    tags: ['spaCy', 'NLTK', 'HuggingFace', 'BERT', 'DistilBERT', 'Scrapy'],
  },
  {
    icon: '🛠️', accentColor: '#94a3b8', name: 'Tools & IDE',
    tags: ['GitHub', 'GitLab', 'Jira', 'Postman', 'IntelliJ', 'VS Code', 'Swagger'],
  },
]

export default function Skills() {
  const { t } = useTranslation()
  return (
    <section id="skills" style={{ background: 'var(--bg2)' }}>
      <div className="section-label">{t('skills.label')}</div>
      <div className="section-title">{t('skills.title')}</div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '1rem',
      }}>
        {SKILL_GROUPS.map(g => <SkillCard key={g.name} {...g} />)}
      </div>
    </section>
  )
}

function SkillCard({ icon, accentColor, name, tags }) {
  return (
    <div className="card" style={{ padding: '1.4rem' }}>
      {/* Top bar accent */}
      <div style={{
        height: 2, borderRadius: 2, marginBottom: '1.1rem',
        background: `linear-gradient(90deg, ${accentColor}, transparent)`,
      }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.9rem' }}>
        <span style={{
          width: 34, height: 34, borderRadius: 8,
          background: `${accentColor}15`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1rem', flexShrink: 0,
        }}>{icon}</span>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 600, fontSize: '0.85rem', color: 'var(--silver-hi)',
        }}>{name}</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {tags.map(t => (
          <span key={t} style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.67rem', padding: '0.2rem 0.6rem',
            background: `${accentColor}12`,
            border: `1px solid ${accentColor}25`,
            borderRadius: '4px', color: 'var(--silver)',
          }}>{t}</span>
        ))}
      </div>
    </div>
  )
}
