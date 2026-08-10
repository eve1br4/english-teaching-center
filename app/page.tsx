'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { ArrowRight, Clock3, HeartHandshake, Menu, MonitorPlay, Star, Video, X } from 'lucide-react'

const testimonials = [
  { initials: 'LM', quote: 'Por fin una forma de aprender que sí encaja conmigo.', name: 'Laura M.', category: 'Papá de Alumno' },
  { initials: 'JR', quote: '¡Increíble método! He mejorado mi conversación en solo semanas.', name: 'Juan R.', category: 'Estudiante Activo' },
  { initials: 'AS', quote: 'Los profesores son súper dedicados. Recomendado.', name: 'Ana S.', category: 'Egresado/a ETC' },
  { initials: 'DC', quote: 'Ahora puedo desenvolverme en inglés con mucha más confianza.', name: 'Daniela C.', category: 'Young Adults' },
]

const benefits = [
  { title: 'Clases Interactivas', copy: 'Practica de forma activa y dinámica para que cada clase te acerque a hablar con soltura.', icon: MonitorPlay, tone: 'blue' },
  { title: 'Atención Personalizada', copy: 'Recibe el acompañamiento y la guía que necesitas en cada paso de tu aprendizaje.', icon: HeartHandshake, tone: 'orange' },
  { title: 'A tu propio ritmo', copy: 'Avanza sin presión, celebra tu progreso y construye confianza a tu manera.', icon: Clock3, tone: 'purple' },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [active, setActive] = useState(0)
  const scroller = useRef<HTMLDivElement>(null)
  const submit = (event: React.FormEvent) => { event.preventDefault(); setMessage(email.includes('@') ? '¡Listo! Te esperamos dentro.' : 'Ingresa un correo válido para comenzar.') }
  const selectTestimonial = (index: number) => { setActive(index); scroller.current?.children[index]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }) }

  return (
    <main id="top" className="page-shell">
      <section className="hero" aria-labelledby="hero-title">
        <header className="site-header">
          <div className="header-inner">
            <a href="#top" className="brand" aria-label="English Teaching Center, inicio"><Image src="/english_teaching_center_logo.png" alt="English Teaching Center" width={220} height={110} priority /></a>
            <nav className="desktop-nav" aria-label="Navegación principal"><a href="#why-us">Método</a><a href="#benefits">Beneficios</a><a href="#stories">Comunidad</a></nav>
            <div className="header-actions"><a className="login-nav" href="#login">Iniciar Sesión</a><a className="button header-cta" href="#join">¡Inscríbete!</a><button className="menu-button" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button></div>
          </div>
          {menuOpen && <nav className="mobile-nav" aria-label="Navegación móvil"><a href="#why-us" onClick={() => setMenuOpen(false)}>Método</a><a href="#benefits" onClick={() => setMenuOpen(false)}>Beneficios</a><a href="#stories" onClick={() => setMenuOpen(false)}>Comunidad</a><a href="#login">Iniciar Sesión</a></nav>}
        </header>
        <div className="hero-content"><p className="eyebrow">ENGLISH TEACHING CENTER</p><h1 id="hero-title">¡Aprender inglés nunca había sido tan fácil!</h1><p className="hero-subtitle">Descubre una metodología interactiva pensada para que hables con confianza desde el primer día.</p><form className="join-form" id="join" onSubmit={submit}><label className="sr-only" htmlFor="email">Tu correo electrónico</label><input id="email" type="email" placeholder="Tu correo electrónico..." value={email} onChange={(event) => setEmail(event.target.value)} /><button className="button join-button" type="submit">Comenzar ahora <ArrowRight aria-hidden="true" /></button></form>{message && <p className="form-message" role="status">{message}</p>}<p className="privacy-note">Sin tarjeta de crédito · Aprende a tu ritmo</p></div>
      </section>

      <section className="why-us" id="why-us" aria-labelledby="why-title"><div className="section-intro"><p className="eyebrow">TU PRÓXIMO PASO</p><h2 id="why-title">¿Por qué aprender <em>con nosotros?</em></h2><p className="section-subtitle">Una experiencia diseñada para que disfrutar aprendiendo sea parte del camino.</p></div><div className="benefit-grid" id="benefits">{benefits.map(({ title, copy, icon: Icon, tone }) => <article className="benefit-card" key={title}><div className={`benefit-icon ${tone}`}><Icon aria-hidden="true" /></div><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

      <section className="stories" id="stories" aria-labelledby="stories-title"><div className="section-intro"><p className="eyebrow">HISTORIAS REALES</p><h2 id="stories-title">El inglés que abre <em>puertas.</em></h2></div><div className="testimonial-carousel"><div className="testimonial-grid" ref={scroller} onScroll={() => { if (!scroller.current) return; const index = Math.round(scroller.current.scrollLeft / scroller.current.clientWidth); setActive(Math.min(index, testimonials.length - 1)) }}>{testimonials.map((testimonial) => <article className="testimonial-card" key={testimonial.name}><div className="testimonial-top"><span className="stars" aria-label="5 de 5 estrellas">{Array.from({ length: 5 }).map((_, index) => <Star key={index} aria-hidden="true" />)}</span><span className="category-badge">{testimonial.category}</span></div><p className="quote">“{testimonial.quote}”</p><div className="student-meta"><span className="avatar">{testimonial.initials}</span><strong>{testimonial.name}</strong><span className="verified">Estudiante verificada</span></div></article>)}</div><div className="carousel-dots" aria-label="Seleccionar testimonio">{testimonials.map((testimonial, index) => <button key={testimonial.name} type="button" className={active === index ? 'is-active' : ''} aria-label={`Ver testimonio de ${testimonial.name}`} aria-current={active === index} onClick={() => selectTestimonial(index)} />)}</div></div></section>

      <footer className="footer"><div className="footer-inner"><a href="#top" className="brand" aria-label="English Teaching Center, inicio"><Image src="/english_teaching_center_logo.png" alt="English Teaching Center" width={220} height={110} /></a><p>El inglés que quieres. La confianza que necesitas.</p><div className="footer-socials"><a href="#instagram" aria-label="Instagram"><span aria-hidden="true">◎</span></a><a href="#youtube" aria-label="YouTube"><Video aria-hidden="true" /></a><a href="#linkedin" aria-label="LinkedIn"><span aria-hidden="true">in</span></a></div><a href="#login" className="login-link">Acceso de estudiantes <ArrowRight aria-hidden="true" /></a></div><div className="footer-bottom"><span>© 2026 English Teaching Center</span><span>@english.teaching.center</span></div></footer>
    </main>
  )
}
