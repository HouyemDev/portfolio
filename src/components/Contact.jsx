import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'

// ⚠️  REPLACE with your real Formspree form ID
// 1. Go to https://formspree.io → free account → New Form
// 2. Copy the form ID (e.g. "xpwzgkqr")
// 3. Paste it below replacing YOUR_FORMSPREE_ID
const FORMSPREE_ID = 'YOUR_FORMSPREE_ID'

const inp = (focused, name) => ({
  width: '100%',
  background: 'rgba(255,255,255,0.03)',
  border: `1px solid ${focused === name ? 'rgba(30,111,255,0.6)' : 'rgba(148,163,184,0.12)'}`,
  borderRadius: '8px',
  padding: '0.8rem 1rem',
  color: 'var(--text)',
  fontSize: '0.88rem',
  outline: 'none',
  fontFamily: "'Space Grotesk', sans-serif",
  transition: 'border-color 0.2s, background 0.2s',
  background: focused === name ? 'rgba(30,111,255,0.04)' : 'rgba(255,255,255,0.03)',
})

export default function Contact() {
  const { t } = useTranslation()
  const fileRef = useRef()
  const [form, setForm] = useState({ name:'', email:'', company:'', subject:'', message:'' })
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('idle')
  const [focused, setFocused] = useState(null)

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async e => {
    e.preventDefault()
    if (FORMSPREE_ID === 'YOUR_FORMSPREE_ID') {
      alert('⚠️  Set your Formspree ID in src/components/Contact.jsx line 10')
      return
    }
    setStatus('sending')
    try {
      const data = new FormData()
      Object.entries(form).forEach(([k,v]) => data.append(k,v))
      if (file) data.append('attachment', file)
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST', body: data, headers: { Accept: 'application/json' },
      })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) { setForm({ name:'',email:'',company:'',subject:'',message:'' }); setFile(null) }
    } catch { setStatus('error') }
  }

  const DIRECT = [
    { icon: '✉️', label: 'Email', value: 'noomene.houyem@gmail.com', href: 'mailto:noomene.houyem@gmail.com' },
    { icon: '📞', label: 'Téléphone', value: '+216 25 837 574', href: 'tel:+21625837574' },
    { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/houyem-noomene', href: 'https://linkedin.com/in/houyem-noomene-41390a224' },
  ]

  return (
    <section id="contact" style={{ background: 'var(--bg2)' }}>
      <div style={{ maxWidth: 720 }}>
        <div className="section-label">{t('contact.label')}</div>
        <div className="section-title">{t('contact.title')}</div>
        <p style={{ color: 'var(--silver)', fontSize: '0.95rem', marginBottom: '2.5rem', marginTop: '-1.5rem' }}>
          {t('contact.sub')}
        </p>

        <div className="card" style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
          {/* Glow */}
          <div style={{
            position: 'absolute', top: -60, right: -60,
            width: 240, height: 240, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(30,111,255,0.1), transparent)',
            pointerEvents: 'none',
          }} />

          {status === 'success' ? (
            <div style={{
              padding: '2.5rem', textAlign: 'center',
              background: 'rgba(52,211,153,0.07)',
              border: '1px solid rgba(52,211,153,0.2)',
              borderRadius: '10px',
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>✅</div>
              <div style={{ color: '#34d399', fontWeight: 600 }}>{t('contact.success')}</div>
            </div>
          ) : (
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {['name','email'].map(f => (
                  <div key={f}>
                    <label style={{ fontSize: '0.73rem', color: 'var(--muted)', display: 'block', marginBottom: '0.35rem', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.05em' }}>
                      {t(`contact.${f}`)} {f !== 'company' ? '*' : ''}
                    </label>
                    <input
                      type={f === 'email' ? 'email' : 'text'}
                      name={f} value={form[f]} onChange={onChange}
                      required={f !== 'company'} placeholder={t(`contact.${f}`)}
                      style={inp(focused, f)}
                      onFocus={() => setFocused(f)} onBlur={() => setFocused(null)}
                    />
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {['company','subject'].map(f => (
                  <div key={f}>
                    <label style={{ fontSize: '0.73rem', color: 'var(--muted)', display: 'block', marginBottom: '0.35rem', fontFamily: "'JetBrains Mono', monospace" }}>
                      {t(`contact.${f}`)}
                    </label>
                    <input
                      type="text" name={f} value={form[f]}
                      onChange={onChange} placeholder={t(`contact.${f}`)}
                      style={inp(focused, f)}
                      onFocus={() => setFocused(f)} onBlur={() => setFocused(null)}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label style={{ fontSize: '0.73rem', color: 'var(--muted)', display: 'block', marginBottom: '0.35rem', fontFamily: "'JetBrains Mono', monospace" }}>
                  {t('contact.message')} *
                </label>
                <textarea
                  name="message" value={form.message} onChange={onChange}
                  required rows={5} placeholder={t('contact.message')}
                  style={{ ...inp(focused, 'message'), resize: 'vertical' }}
                  onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                />
              </div>

              {/* File attach */}
              <div>
                <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.txt"
                  onChange={e => setFile(e.target.files[0] || null)} style={{ display: 'none' }} />
                <button type="button" onClick={() => fileRef.current.click()}
                  style={{
                    width: '100%', background: 'transparent',
                    border: `1px dashed ${file ? 'rgba(56,189,248,0.4)' : 'rgba(148,163,184,0.2)'}`,
                    borderRadius: '8px', padding: '0.75rem',
                    color: file ? 'var(--cyan)' : 'var(--muted)',
                    fontSize: '0.82rem', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '0.6rem',
                    fontFamily: "'JetBrains Mono', monospace",
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => !file && (e.currentTarget.style.borderColor = 'rgba(30,111,255,0.4)')}
                  onMouseLeave={e => !file && (e.currentTarget.style.borderColor = 'rgba(148,163,184,0.2)')}
                >
                  <span>📎</span>
                  <span style={{ flex: 1, textAlign: 'left' }}>
                    {file ? `${file.name}  (${(file.size/1024).toFixed(0)} KB)` : t('contact.attach')}
                  </span>
                  {file && (
                    <span onClick={ev => { ev.stopPropagation(); setFile(null) }}
                      style={{ color: '#f87171', cursor: 'pointer', fontSize: '0.9rem' }}>✕</span>
                  )}
                </button>
              </div>

              {status === 'error' && (
                <div style={{
                  padding: '0.75rem', borderRadius: '8px', fontSize: '0.82rem',
                  background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)',
                  color: '#f87171', fontFamily: "'JetBrains Mono', monospace",
                }}>{t('contact.error')}</div>
              )}

              <button type="submit" className="btn-primary"
                disabled={status === 'sending'}
                style={{ marginTop: '0.5rem', justifyContent: 'center', opacity: status === 'sending' ? 0.65 : 1 }}>
                {status === 'sending' ? t('contact.sending') : `→ ${t('contact.send')}`}
              </button>
            </form>
          )}
        </div>

        {/* Direct links */}
        <div style={{ marginTop: '2rem' }}>
          <div style={{ fontSize: '0.73rem', color: 'var(--muted)', fontFamily: "'JetBrains Mono', monospace", marginBottom: '0.9rem' }}>
            // {t('contact.or')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {DIRECT.map(d => (
              <a key={d.href} href={d.href}
                target={d.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="card"
                style={{
                  padding: '0.9rem 1.2rem',
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  textDecoration: 'none', color: 'var(--text)',
                }}>
                <span style={{ fontSize: '1.1rem' }}>{d.icon}</span>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', color: 'var(--muted)' }}>{d.label}</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 500 }}>{d.value}</div>
                </div>
                <span style={{ marginLeft: 'auto', color: 'var(--muted)', fontSize: '0.8rem' }}>↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
