'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  ArrowRight,
  Award,
  BookOpen,
  Check,
  ChevronDown,
  Clock3,
  Headphones,
  Globe2,
  BriefcaseBusiness,
  GraduationCap,
  MessageSquare,
  UserCheck,
  Menu,
  Mic,
  Play,
  Search,
  Sparkles,
  UserRound,
  Volume2,
  X,
  Video,
} from 'lucide-react'

const courses = [
  { level: 'A1–A2', title: 'Nivel Básico', description: 'Empieza desde cero y construye una base para comunicarte.', lessons: '42 lecciones', time: '6 h 20 min', color: 'blue', icon: BookOpen },
  { level: 'B1–B2', title: 'Nivel Intermedio', description: 'Habla con más soltura y expresa tus ideas con naturalidad.', lessons: '58 lecciones', time: '8 h 45 min', color: 'orange', icon: MessageSquare },
  { level: 'C1–C2', title: 'Nivel Avanzado', description: 'Perfecciona tu precisión para conversaciones complejas.', lessons: '36 lecciones', time: '5 h 10 min', color: 'navy', icon: GraduationCap },
  { level: 'PRO', title: 'Inglés Profesional', description: 'Impulsa reuniones, presentaciones y emails con confianza.', lessons: '24 lecciones', time: '3 h 40 min', color: 'violet', icon: Award },
]

const words = [
  ['thought', '/θɔːt/', 'pensamiento'],
  ['through', '/θruː/', 'a través de'],
  ['world', '/wɜːld/', 'mundo'],
  ['comfortable', '/ˈkʌmftəbl/', 'cómodo'],
  ['schedule', '/ˈʃedjuːl/', 'horario'],
]

const lessons = [
  ['Present simple: usos y trucos', 'Gramática', '12 min', 'B1'],
  ['10 expresiones para sonar natural', 'Vocabulario', '8 min', 'B2'],
  ['Cómo pedir indicaciones', 'Conversación', '15 min', 'A2'],
]

const testimonials = [
  ['LM', 'Por fin una forma de aprender que sí encaja conmigo.', 'Laura M.', 'Papá de Alumno'],
  ['JR', '¡Increíble método! He mejorado mi conversación en solo semanas.', 'Juan R.', 'Estudiante Activo'],
  ['AS', 'Los profesores son súper dedicados. Recomendado.', 'Ana S.', 'Egresado/a ETC'],
  ['DC', 'Ahora puedo desenvolverme en inglés con mucha más confianza.', 'Daniela C.', 'Young Adults'],
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [searchMessage, setSearchMessage] = useState('')
  const [recording, setRecording] = useState(false)
  const [wordOffset, setWordOffset] = useState(0)
  const [email, setEmail] = useState('')
  const [newsletterMessage, setNewsletterMessage] = useState('')
  const [testimonialIndex, setTestimonialIndex] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTestimonialIndex((current) => (current + 1) % testimonials.length)
    }, 6000)
    return () => window.clearInterval(interval)
  }, [])

  const speak = (word: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(word)
      utterance.lang = 'en-US'
      utterance.rate = 0.8
      window.speechSynthesis.speak(utterance)
    }
  }

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault()
    setSearchMessage(query.trim() ? `Buscando lecciones para “${query.trim()}”` : 'Escribe una palabra o tema para comenzar')
  }

  const submitNewsletter = (event: React.FormEvent) => {
    event.preventDefault()
    setNewsletterMessage(email.includes('@') ? '¡Listo! Revisa tu bandeja de entrada.' : 'Introduce un email válido para suscribirte.')
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="site-header"><div className="container header-inner">
        <a href="#top" className="brand" aria-label="English Teaching Center, inicio"><Image src="/english_teaching_center_logo.png" alt="English Teaching Center" width={220} height={110} priority /></a>
        <nav className="desktop-nav" aria-label="Navegación principal">
          <a href="#courses">Aprender</a><a href="#practice">Practicar</a><a href="#resources">Recursos</a>
        </nav>
        <div className="header-actions"><button className="icon-button" aria-label="Buscar" onClick={() => document.getElementById('search')?.focus()}><Search aria-hidden="true" /></button><button className="language" type="button">ES <ChevronDown aria-hidden="true" /></button><a className="login-link" href="#login">Entrar</a><a className="button button-small header-cta" href="#signup">¡Inscríbete!</a><button className="menu-button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div>
      </div>{menuOpen && <nav className="mobile-nav" aria-label="Navegación móvil"><a href="#courses" onClick={() => setMenuOpen(false)}>Cursos</a><a href="#lessons" onClick={() => setMenuOpen(false)}>Lecciones</a><a href="#practice" onClick={() => setMenuOpen(false)}>Practica</a><a href="#resources" onClick={() => setMenuOpen(false)}>Recursos</a><a href="#login">Entrar</a></nav>}</header>

      <section className="hero" id="top"><div className="container hero-grid"><div className="hero-copy"><div className="hero-badge"><span aria-hidden="true">●</span> Acarigua, Edo. Portuguesa</div><h1>¡Aprender inglés nunca había sido tan fácil!</h1><p>Descubre un método dinámico, clases interactivas y el acompañamiento que necesitas para hablar con confianza desde el primer día.</p><form className="search-form" onSubmit={submitSearch}><Search aria-hidden="true" /><input id="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="¿Qué quieres aprender hoy?" aria-label="Buscar una lección" /><button type="submit" className="search-submit" aria-label="Buscar"><ArrowRight aria-hidden="true" /></button></form>{searchMessage && <p className="form-message" role="status">{searchMessage}</p>}</div></div></section>

      <section className="proof-row" aria-label="Opiniones de estudiantes"><div className="container testimonial-grid">{testimonials.map(([initials, quote, name, audience], index) => <article className={`testimonial-card ${index === testimonialIndex ? 'is-featured' : ''}`} key={name}><div className="testimonial-ribbon">{audience}</div><div className="stars" aria-label="5 de 5 estrellas">★★★★★</div><p>“{quote}”</p><div className="student-meta"><span className="quote-avatar">{initials}</span><strong>{name}</strong><span className="verified">Estudiante verificada</span></div></article>)}</div></section>

      <section className="section" id="courses"><div className="container"><div className="section-heading"><div><p className="eyebrow">APRENDE A TU RITMO</p><h2>Encuentra tu próximo <em>nivel.</em></h2></div><a className="text-link" href="#all-courses">Ver todos los cursos <ArrowRight aria-hidden="true" /></a></div><div className="course-grid">{courses.map((course) => { const CourseIcon = course.icon; return <article className={`course-card ${course.color}`} key={course.title}><div className="course-visual"><CourseIcon aria-hidden="true" /></div><div className="course-card-top"><span className="level-tag">{course.level}</span><CourseIcon aria-hidden="true" /></div><h3>{course.title}</h3><p>{course.description}</p><div className="course-meta"><span><BookOpen aria-hidden="true" /> {course.lessons}</span><span><Clock3 aria-hidden="true" /> {course.time}</span></div><a className="course-cta" href={`#course-${course.title.toLowerCase().replaceAll(' ', '-')}`}><span>Explorar curso</span><ArrowRight aria-hidden="true" /></a></article> })}</div></div></section>

      <section className="practice-section" id="practice"><div className="container practice-grid"><div className="practice-copy"><p className="eyebrow">ENTRENA TU OÍDO</p><h2>Escucha. Repite. <em>Conecta.</em></h2><p>La pronunciación mejora cuando la practicas un poco cada día. Escucha el sonido, repítelo y gana confianza para hablar.</p><div className="practice-note"><Headphones aria-hidden="true" /><span><strong>Consejo de experto</strong><br />No busques sonar perfecto. Busca que te entiendan.</span></div><button className={`record-button ${recording ? 'is-recording' : ''}`} onClick={() => setRecording(!recording)}><Mic aria-hidden="true" /> {recording ? 'Grabando... pulsa para parar' : 'Practicar con mi voz'}</button></div><div className="word-panel"><div className="word-panel-header"><span>Palabras que suelen costar</span><span className="word-count">{wordOffset + 1} / 5</span></div><div className="word-list">{words.slice(wordOffset, wordOffset + 3).map(([word, phonetic, meaning]) => <div className="word-row" key={word}><button aria-label={`Escuchar ${word}`} className="listen-button" onClick={() => speak(word)}><Volume2 aria-hidden="true" /></button><div><strong>{word}</strong><span>{phonetic}</span></div><small>{meaning}</small></div>)}</div><button className="more-words" onClick={() => setWordOffset((wordOffset + 1) % 3)}>Más palabras <ArrowRight aria-hidden="true" /></button></div></div></section>

      <section className="section lessons-section" id="lessons"><div className="container"><div className="section-heading"><div><p className="eyebrow">PARA CADA MOMENTO</p><h2>Lecciones que te llevan <em>más lejos.</em></h2></div><a className="text-link" href="#all-lessons">Explorar lecciones <ArrowRight aria-hidden="true" /></a></div><div className="lesson-list">{lessons.map(([title, category, time, level], index) => <a className="lesson-row" href="#lesson" key={title}><span className={`lesson-number ${index === 1 ? 'orange' : ''}`}>0{index + 1}</span><span className="lesson-main"><small>{category}</small><strong>{title}</strong></span><span className="lesson-time"><Clock3 aria-hidden="true" /> {time}</span><span className="level-tag">{level}</span><span className="play-button"><Play fill="currentColor" aria-hidden="true" /></span></a>)}</div></div></section>

      <section className="resources-section" id="resources"><div className="container"><div className="section-heading light-heading"><div><p className="eyebrow">MUCHO MÁS QUE LECCIONES</p><h2>Herramientas para <em>desbloquearte.</em></h2></div><p>Todo lo que necesitas para convertir el inglés en parte de tu vida.</p></div><div className="resource-grid"><a className="resource-card resource-primary" href="#dictionary"><span className="resource-icon"><Search /></span><span><small>DICCIONARIO</small><strong>Busca cualquier palabra</strong><em>Ejemplos, pronunciación y mucho más.</em></span><ArrowRight /></a><a className="resource-card" href="#community"><span className="resource-icon"><UserRound /></span><span><small>COMUNIDAD</small><strong>Aprende acompañado</strong><em>Comparte dudas y descubre historias.</em></span><ArrowRight /></a><a className="resource-card" href="#test"><span className="resource-icon"><Sparkles /></span><span><small>TEST DE NIVEL</small><strong>¿Cuál es tu nivel?</strong><em>Descúbrelo en solo 10 minutos.</em></span><ArrowRight /></a></div></div></section>

      <section className="section community-section" id="community"><div className="container why-grid"><div><p className="eyebrow">APRENDER CON CONFIANZA</p><h2>Por qué estudiar <em>con nosotras.</em></h2><p className="community-intro">Un acompañamiento cercano, práctico y pensado para que avances de verdad desde la primera clase.</p><a className="button" href="#signup">Quiero empezar <ArrowRight aria-hidden="true" /></a></div><div className="why-card"><div className="why-card-head"><div><span className="online-dot" /> Metodología Personalizada</div><span className="open-label">• Inscripciones Abiertas</span></div><div className="why-feature"><span className="why-icon"><UserCheck aria-hidden="true" /></span><div><strong>Atención 100% Personalizada</strong><p>Clases adaptadas a tu nivel y ritmo real de aprendizaje.</p></div></div><div className="why-feature"><span className="why-icon"><GraduationCap aria-hidden="true" /></span><div><strong>Docentes Certificadas</strong><p>Guiado por profesoras con años de experiencia académica.</p></div></div><div className="why-feature"><span className="why-icon"><MessageSquare aria-hidden="true" /></span><div><strong>Enfoque Práctico</strong><p>Habla desde la primera semana con dinámicas reales.</p></div></div></div></div></section>

      <section className="signup-section" id="signup"><div className="container signup-inner"><div><p className="eyebrow">EMPIEZA HOY</p><h2>Un pequeño paso.<br /><em>Un gran cambio.</em></h2><p>Regístrate gratis y descubre una forma de aprender inglés que se adapta a ti.</p></div><div className="signup-actions"><a className="button button-light" href="#register">Crear mi cuenta gratis <ArrowRight aria-hidden="true" /></a><span><Check aria-hidden="true" /> Sin tarjeta de crédito</span><span><Check aria-hidden="true" /> Cancela cuando quieras</span></div></div></section>

      <footer className="footer"><div className="container footer-top"><div className="footer-brand"><Image src="/english_teaching_center_logo.png" alt="English Teaching Center" width={220} height={110} /><p>El inglés que quieres.<br />La confianza que necesitas.</p><div className="socials"><a href="#instagram" aria-label="Instagram"><Globe2 /></a><a href="#youtube" aria-label="Youtube"><Video /></a><a href="#linkedin" aria-label="LinkedIn"><BriefcaseBusiness /></a></div></div><div className="footer-links"><div><h3>Aprende</h3><a href="#courses">Cursos de inglés</a><a href="#lessons">Lecciones</a><a href="#practice">Pronunciación</a><a href="#test">Test de nivel</a></div><div><h3>Descubre</h3><a href="#resources">Recursos</a><a href="#dictionary">Diccionario</a><a href="#community">Comunidad</a><a href="#about">Sobre nosotros</a></div><div className="newsletter"><h3>Una dosis de inglés</h3><p>Ideas, trucos y novedades en tu bandeja.</p><form onSubmit={submitNewsletter}><input type="email" placeholder="Tu email" aria-label="Tu email" value={email} onChange={(event) => setEmail(event.target.value)} /><button aria-label="Suscribirse"><ArrowRight /></button></form>{newsletterMessage && <small role="status">{newsletterMessage}</small>}</div></div></div><div className="container footer-bottom"><span>© 2025 English Teaching Center</span><div><a href="#privacy">Privacidad</a><a href="#terms">Términos</a><a href="#cookies">Cookies</a></div><span>Hecho para aprender, hecho para ti.</span></div></footer>
    </main>
  )
}
