'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { ArrowRight, BriefcaseBusiness, Globe2, Menu, Star, Video, X } from 'lucide-react'

const testimonials = [
  { initials: 'LM', quote: 'Por fin una forma de aprender que sí encaja conmigo.', name: 'Laura M.', category: 'Papá de Alumno' },
  { initials: 'JR', quote: '¡Increíble método! He mejorado mi conversación en solo semanas.', name: 'Juan R.', category: 'Estudiante Activo' },
  { initials: 'AS', quote: 'Los profesores son súper dedicados. Recomendado.', name: 'Ana S.', category: 'Egresado/a ETC' },
  { initials: 'DC', quote: 'Ahora puedo desenvolverme en inglés con mucha más confianza.', name: 'Daniela C.', category: 'Young Adults' },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [active, setActive] = useState(0)
  const scroller = useRef<HTMLDivElement>(null)

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    setMessage(email.includes('@') ? '¡Listo! Te esperamos dentro.' : 'Ingresa un correo válido para comenzar.')
  }

  const selectTestimonial = (index: number) => {
    setActive(index)
    scroller.current?.children[index]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  return (
    <main id="top" className="page-shell">
      <header className="site-header">
        <div className="header-inner">
          <a href="#top" className="brand" aria-label="English Teaching Center, inicio">
            <Image src="/english_teaching_center_logo.png" alt="English Teaching Center" width={220} height={110} priority />
          </a>
          <div className="header-actions">
            <a className="button header-cta" href="#join">¡Inscríbete!</a>
            <button className="menu-button" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>
        {menuOpen && <nav className="mobile-nav" aria-label="Navegación móvil"><a href="#stories" onClick={() => setMenuOpen(false)}>Historias</a><a href="#join" onClick={() => setMenuOpen(false)}>Inscríbete</a><a href="#login">Acceso de estudiantes</a></nav>}
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-silhouette silhouette-left" aria-hidden="true" />
        <div className="hero-silhouette silhouette-right" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow">ENGLISH TEACHING CENTER</p>
          <h1 id="hero-title">¡Aprender inglés nunca había sido tan fácil!</h1>
          <p className="hero-subtitle">Descubre una nueva forma interactiva de hablar inglés con confianza. El secreto para dominar el idioma está a un clic.</p>
          <form className="join-form" id="join" onSubmit={submit}>
            <label className="sr-only" htmlFor="email">Tu correo electrónico</label>
            <input id="email" type="email" placeholder="Ingresa tu correo para comenzar..." value={email} onChange={(event) => setEmail(event.target.value)} />
            <button className="button join-button" type="submit">Unirme ahora <ArrowRight aria-hidden="true" /></button>
          </form>
          {message && <p className="form-message" role="status">{message}</p>}
          <p className="privacy-note">Sin tarjeta de crédito · Aprende a tu ritmo</p>
        </div>
      </section>

      <section className="stories" id="stories" aria-labelledby="stories-title">
        <div className="section-intro"><p className="eyebrow">HISTORIAS REALES</p><h2 id="stories-title">El inglés que abre <em>puertas.</em></h2></div>
        <div className="testimonial-carousel">
          <div className="testimonial-grid" ref={scroller} onScroll={() => { if (!scroller.current) return; const index = Math.round(scroller.current.scrollLeft / scroller.current.clientWidth); setActive(Math.min(index, testimonials.length - 1)) }}>
            {testimonials.map((testimonial) => <article className="testimonial-card" key={testimonial.name}><div className="testimonial-top"><span className="stars" aria-label="5 de 5 estrellas">{Array.from({ length: 5 }).map((_, index) => <Star key={index} aria-hidden="true" />)}</span><span className="category-badge">{testimonial.category}</span></div><p className="quote">“{testimonial.quote}”</p><div className="student-meta"><span className="avatar">{testimonial.initials}</span><strong>{testimonial.name}</strong><span className="verified">Estudiante verificada</span></div></article>)}
          </div>
          <div className="carousel-dots" aria-label="Seleccionar testimonio">{testimonials.map((testimonial, index) => <button key={testimonial.name} type="button" className={active === index ? 'is-active' : ''} aria-label={`Ver testimonio de ${testimonial.name}`} aria-current={active === index} onClick={() => selectTestimonial(index)} />)}</div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner"><a href="#top" className="brand" aria-label="English Teaching Center, inicio"><Image src="/english_teaching_center_logo.png" alt="English Teaching Center" width={220} height={110} /></a><p>El inglés que quieres. La confianza que necesitas.</p><div className="footer-socials"><a href="#instagram" aria-label="Instagram"><Globe2 aria-hidden="true" /></a><a href="#youtube" aria-label="YouTube"><Video aria-hidden="true" /></a><a href="#linkedin" aria-label="LinkedIn"><BriefcaseBusiness aria-hidden="true" /></a></div><a href="#login" className="login-link">Acceso de estudiantes <ArrowRight aria-hidden="true" /></a></div>
        <div className="footer-bottom"><span>© 2026 English Teaching Center</span><span>@english.teaching.center</span></div>
      </footer>
    </main>
  )
}
