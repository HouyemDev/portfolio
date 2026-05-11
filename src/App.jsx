import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const { i18n } = useTranslation()
  useEffect(() => {
    const rtl = i18n.language === 'ar'
    document.documentElement.setAttribute('dir', rtl ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', i18n.language)
  }, [i18n.language])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
