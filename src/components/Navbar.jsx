import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

const links = [
  { href: `${BASE}/#about`,      id: 'about',      icon: 'fas fa-user-gear',         label: 'About' },
  { href: `${BASE}/#topics`,     id: 'topics',     icon: 'fas fa-layer-group',        label: 'Topics' },
  { href: `${BASE}/#episodes`,   id: 'episodes',   icon: 'fas fa-circle-play',        label: 'Episodes' },
  { href: `${BASE}/#platforms`,  id: 'platforms',  icon: 'fas fa-share-nodes',        label: 'Platforms' },
  { href: `${BASE}/#newsletter`, id: 'newsletter', icon: 'fas fa-envelope-open-text', label: 'Newsletter' },
]

export default function Navbar() {
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active,   setActive]   = useState('')
  const location = useLocation()
  const isHome   = location.pathname === '/'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 5)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    if (!isHome) { setActive(''); return }
    const ids = links.map(l => l.id)
    const onScroll = () => {
      const y = window.scrollY + 130
      let cur = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= y) cur = id
      }
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome, location])

  const close = () => setOpen(false)

  return (
    <nav
      className={`fixed left-0 right-0 z-40 h-[60px]
                  flex items-center justify-between px-4 md:px-10
                  transition-all duration-300
                  ${scrolled
                    ? 'bg-paper/90 backdrop-blur-xl border-b border-white/8 shadow-[0_4px_32px_rgba(0,0,0,0.5)]'
                    : 'bg-paper/60 backdrop-blur-md border-b border-white/5'}`}
    >
      {/* Logo */}
      <a href={import.meta.env.BASE_URL} className="flex items-center gap-3 no-underline flex-shrink-0 group">
        <svg width="34" height="34" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"
             className="transition-transform duration-300 group-hover:scale-105">
          <rect width="36" height="36" fill="#0f0f14" rx="2"/>
          <rect width="36" height="3" fill="#f97316" rx="1"/>
          <path d="M6,18 C6,11 11,8 18,18 C25,28 30,25 30,18 C30,11 25,8 18,18 C11,28 6,25 6,18 Z"
                stroke="#f0ede8" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="18" cy="18" r="2" fill="#f97316"/>
        </svg>
        <span className="font-disp text-[1.25rem] tracking-[.07em] text-ink">
          DEVOPS<span className="text-accent">/</span>UNFILTERED
        </span>
      </a>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center list-none">
        {links.map(l => {
          const isActive = isHome && active === l.id
          return (
            <li key={l.href} className="nav-li">
              <a
                href={l.href}
                className={`relative flex items-center gap-[.4rem] h-[60px] px-3 lg:px-4
                           font-mono text-[.67rem] font-semibold tracking-[.07em]
                           uppercase no-underline whitespace-nowrap
                           transition-colors duration-200 group
                           ${isActive
                             ? 'text-accent'
                             : 'text-ink/50 hover:text-ink'}`}
              >
                <i className={`${l.icon} text-[.7rem]
                               ${isActive ? 'opacity-100' : 'opacity-55 group-hover:opacity-100'}`} />
                {l.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                  />
                )}
              </a>
            </li>
          )
        })}
        <li className="nav-li">
          <a
            href={`${BASE}/#contact`}
            className="flex items-center gap-[.4rem] h-[60px] px-3 lg:px-4
                       font-mono text-[.67rem] font-semibold tracking-[.07em]
                       bg-accent text-white uppercase no-underline whitespace-nowrap
                       transition-colors duration-200 hover:bg-accent2"
          >
            <i className="fas fa-paper-plane text-[.7rem]" />
            Contact
          </a>
        </li>
      </ul>

      {/* Hamburger */}
      <button
        className="md:hidden flex flex-col gap-[5px] cursor-pointer p-1"
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle menu"
      >
        <span className={`w-6 h-[2px] bg-ink block transition-all duration-200 origin-center ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
        <span className={`w-6 h-[2px] bg-ink block transition-all duration-200 ${open ? 'opacity-0 scale-x-0' : ''}`} />
        <span className={`w-6 h-[2px] bg-ink block transition-all duration-200 origin-center ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0
                       bg-paper/95 backdrop-blur-xl
                       border-b border-white/8
                       flex flex-col
                       max-h-[calc(100vh-60px)] overflow-y-auto z-50"
          >
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={close}
                className={`flex items-center gap-2 px-6 py-4
                           font-mono text-[.75rem] font-semibold tracking-[.07em]
                           uppercase no-underline
                           border-t border-white/6
                           transition-colors
                           ${isHome && active === l.id
                             ? 'text-accent bg-white/4'
                             : 'text-ink/60 hover:text-ink hover:bg-white/4'}`}
              >
                <i className={`${l.icon} text-[.75rem] opacity-60`} />
                {l.label}
              </a>
            ))}
            <a
              href={`${BASE}/#contact`}
              onClick={close}
              className="flex items-center gap-2 px-6 py-4
                         font-mono text-[.75rem] font-semibold tracking-[.07em]
                         bg-accent text-white uppercase no-underline
                         border-t border-white/6
                         hover:bg-accent2 transition-colors"
            >
              <i className="fas fa-paper-plane text-[.75rem]" />
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
