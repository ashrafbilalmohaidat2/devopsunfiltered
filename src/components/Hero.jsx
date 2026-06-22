import { motion } from 'framer-motion'
import Terminal from './Terminal'

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative pt-[90px] lg:min-h-screen flex flex-col border-b border-white/8 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px]
                      bg-glow-accent opacity-70" />

      {/* Body grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_360px] relative z-10">

        {/* Main */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="px-4 md:px-10 py-8 md:py-10
                     border-b border-white/8 lg:border-b-0 lg:border-r border-white/8
                     flex flex-col gap-8 lg:justify-between"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="font-mono text-[.68rem] font-bold tracking-[.18em] uppercase
                          bg-accent text-white inline-flex items-center gap-[.45rem]
                          px-3 py-[.22rem] mb-5"
            >
              <i className="fas fa-bolt" /> Real DevOps. No Fluff.
            </motion.div>

            {/* Glitch title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-disp leading-[.92] tracking-[.02em] text-ink mb-6
                         text-[clamp(3.5rem,10vw,10rem)]"
            >
              <span className="glitch block" data-text="DEVOPS">DEVOPS</span>
              <span className="text-outline block">UN</span>
              <span className="text-accent block">FILTERED</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="font-mono text-[clamp(.78rem,1.5vw,1rem)] text-ink/50 leading-[1.75]
                          max-w-xl lg:mb-8 border-l-[2px] border-accent pl-4"
            >
              Honest, hands-on technical content<br />
              for engineers who learn by doing —<br />
              not by watching someone explain slides.
            </motion.p>
          </div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="flex flex-wrap"
          >
            {[
              { href: 'https://www.youtube.com/@devops_unfiltered',            icon: 'fab fa-youtube',   label: 'Watch on YouTube', primary: true },
              { href: 'https://www.instagram.com/devopsunfiltered/?hl=en',     icon: 'fab fa-instagram', label: 'Instagram' },
              { href: 'https://www.linkedin.com/in/ashraf-mheidat-8471b9294',  icon: 'fab fa-linkedin',  label: 'LinkedIn' },
            ].map(b => (
              <a
                key={b.label}
                href={b.href}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-[.55rem]
                            font-mono text-[.75rem] font-bold tracking-[.07em] uppercase
                            no-underline px-5 py-[.85rem]
                            border-[2px] transition-all duration-200
                            -mr-[2px] -mb-[2px]
                            ${b.primary
                              ? 'bg-accent text-white border-accent hover:bg-accent2 hover:border-accent2 shadow-[0_4px_24px_rgba(249,115,22,.3)]'
                              : 'bg-transparent text-ink/70 border-white/15 hover:border-white/40 hover:text-ink'}`}
              >
                <i className={b.icon} />
                {b.label}
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex flex-col px-5 py-6"
        >
          {/* Active platforms ticker */}
          <div className="border-b border-white/8 pb-3 mb-3">
            <div className="font-mono text-[.7rem] font-bold tracking-[.16em] uppercase text-accent mb-[.45rem] flex items-center gap-[.35rem]">
              <i className="fas fa-share-nodes text-[.6rem]" /> Active On
            </div>
            <div className="overflow-hidden h-[1.4rem]">
              <div className="ticker-anim font-mono text-[.72rem] text-ink/60">
                <div className="h-[1.4rem] leading-[1.4rem] flex items-center gap-1">
                  <i className="fab fa-youtube text-[#ff4444]" /> YouTube — @devops_unfiltered
                </div>
                <div className="h-[1.4rem] leading-[1.4rem] flex items-center gap-1">
                  <i className="fab fa-instagram text-[#e1306c]" /> Instagram — @devopsunfiltered
                </div>
                <div className="h-[1.4rem] leading-[1.4rem] flex items-center gap-1">
                  <i className="fab fa-linkedin text-[#0077b5]" /> LinkedIn — Ashraf Mheidat
                </div>
              </div>
            </div>
          </div>

          {/* Build status */}
          <div className="border-b border-white/8 py-3 mb-3">
            <div className="flex items-center gap-2 font-mono text-[.62rem] tracking-[.06em]">
              <span className="w-[7px] h-[7px] rounded-full bg-green live-dot flex-shrink-0" />
              <span className="text-ink/35">CI/CD pipeline —</span>
              <span className="text-green font-semibold">build passing</span>
            </div>
          </div>

          {/* Terminal */}
          <div className="py-2 flex-1">
            <div className="font-mono text-[.7rem] font-bold tracking-[.16em] uppercase text-accent mb-[.45rem] flex items-center gap-[.35rem]">
              <i className="fas fa-terminal text-[.6rem]" /> Live Terminal
            </div>
            <Terminal />
          </div>
        </motion.div>
      </div>

    </section>
  )
}
