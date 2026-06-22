import { motion } from 'framer-motion'
import { useForm, ValidationError } from '@formspree/react'

export default function Newsletter() {
  const [state, handleSubmit] = useForm('xdapbboo')

  return (
    <section
      id="newsletter"
      className="relative mt-14 md:mt-20 py-16 md:py-24 overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-paper2 via-paper to-paper2" />
      <div className="absolute inset-0 bg-glow-accent opacity-60" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="font-mono text-[.62rem] font-bold tracking-[.18em] uppercase
                            text-ink/35 mb-4 flex items-center gap-[.35rem]">
              <i className="fas fa-envelope-open-text text-accent text-[.6rem]" />
              Newsletter — Section 05
            </div>
            <h2 className="font-disp leading-none tracking-[.04em] mb-5 text-ink"
                style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}>
              <span className="gradient-text">DEVOPS</span><br />DIGEST
            </h2>
            <p className="text-[.9rem] text-ink/45 leading-[1.75] max-w-sm">
              Weekly. One DevOps concept explained properly, one tool worth your
              attention, and one mistake to avoid before you make it.
            </p>

            {/* Meta pills */}
            <div className="flex flex-wrap gap-2 mt-6">
              {[
                { icon: 'fas fa-calendar-week', text: 'Every Monday' },
                { icon: 'fas fa-clock',         text: '3-min read' },
                { icon: 'fas fa-shield-halved', text: 'No spam' },
              ].map(r => (
                <span key={r.text}
                      className="inline-flex items-center gap-[.35rem]
                                 font-mono text-[.62rem] text-ink/35
                                 border border-white/10 px-3 py-[.3rem]">
                  <i className={`${r.icon} text-accent text-[.58rem]`} />
                  {r.text}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="font-mono text-[.62rem] tracking-[.14em] uppercase
                            text-ink/30 mb-4 flex items-center gap-[.4rem]">
              <i className="fas fa-envelope-open-text text-accent text-[.6rem]" />
              Subscribe — Free Forever
            </div>

            {state.succeeded ? (
              <div className="flex items-center gap-3 text-green font-mono text-[.85rem] mb-6">
                <i className="fas fa-circle-check" />
                Subscribed! Check your inbox soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit}
                    className="flex border border-white/12 mb-3
                               focus-within:border-accent/50
                               transition-colors duration-200 bg-paper2/50 backdrop-blur-sm">
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                  className="flex-1 bg-transparent border-none outline-none
                             px-4 py-[.9rem]
                             font-mono text-[.78rem] text-ink placeholder:text-ink/25
                             min-w-0"
                />
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="flex items-center gap-[.45rem]
                             px-4 md:px-5 py-[.9rem]
                             bg-accent hover:bg-accent2
                             font-mono text-[.75rem] font-bold tracking-[.07em] uppercase
                             text-white border-none cursor-pointer
                             transition-colors duration-200 whitespace-nowrap
                             disabled:opacity-50 shadow-[0_0_24px_rgba(249,115,22,.25)]"
                >
                  <i className="fas fa-paper-plane" /> Subscribe
                </button>
              </form>
            )}

            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
              className="text-sm text-red-400 mb-4 font-mono"
            />

            <div className="font-mono text-[.6rem] text-ink/20 flex items-center gap-[.38rem]">
              <i className="fas fa-shield-halved text-accent text-[.6rem]" />
              No spam. No ads. Unsubscribe anytime.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
