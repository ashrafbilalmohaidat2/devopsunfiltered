import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import { contactLinks } from '../data'
import { useForm, ValidationError } from '@formspree/react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
})

export default function Contact() {
  const [state, handleSubmit] = useForm('xojpryzp')

  return (
    <section id="contact" className="pt-14 md:pt-20 pb-16 md:pb-24">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <motion.div {...fadeUp()}>
          <SectionHeader
            num="06"
            kicker="Get in touch"
            kickerIcon="fas fa-paper-plane"
            title={"LET'S\nTALK"}
            meta="Open to collabs<br/>&amp; questions"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-white/8">
          {/* Left — links */}
          <motion.div
            {...fadeUp(0.1)}
            className="py-10 md:py-12
                       pr-0 md:pr-10 lg:pr-14
                       border-b border-white/8 md:border-b-0 md:border-r border-white/8"
          >
            <p className="text-[clamp(.9rem,1.5vw,1.05rem)] leading-[1.8] text-ink/50 mb-8">
              Technical question, collaboration idea, or just want to say hi —{' '}
              <strong className="font-semibold text-ink">the door is open.</strong>
            </p>

            <div className="flex flex-col border-t border-white/8">
              {contactLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="clink-row grid grid-cols-[2.2rem_1fr_auto]
                             items-center gap-3 py-4
                             text-ink no-underline"
                >
                  <i
                    className={`${l.icon} clink-icon text-[.95rem] text-center transition-colors duration-200`}
                    style={{ color: l.iconColor }}
                  />
                  <div>
                    <div className="text-[.83rem] font-medium text-ink">{l.text}</div>
                    <span className="font-mono text-[.6rem] text-ink/30">{l.label}</span>
                  </div>
                  <span className="clink-arrow font-mono text-[.85rem] text-ink/15 transition-all duration-200">
                    →
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            {...fadeUp(0.15)}
            className="py-10 md:py-12 pl-0 md:pl-10 lg:pl-14"
          >
            {state.succeeded ? (
              <div className="flex items-center gap-3 text-green font-mono text-[.85rem]">
                <i className="fas fa-circle-check text-lg" />
                Message sent! We'll get back to you soon.
              </div>
            ) : (
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                {[
                  { label: 'Name',    icon: 'fas fa-user',     type: 'text',  name: 'name',    placeholder: 'Your name' },
                  { label: 'Email',   icon: 'fas fa-envelope', type: 'email', name: 'email',   placeholder: 'your@email.com' },
                  { label: 'Subject', icon: 'fas fa-tag',      type: 'text',  name: 'subject', placeholder: 'Collab / Question / Other' },
                ].map(f => (
                  <div key={f.label} className="flex flex-col gap-[.3rem]">
                    <label className="font-mono text-[.6rem] font-bold tracking-[.11em] uppercase
                                      text-ink/40 flex items-center gap-[.35rem]">
                      <i className={`${f.icon} text-accent text-[.6rem]`} />
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      name={f.name}
                      placeholder={f.placeholder}
                      required
                      className="bg-transparent border-b border-white/12
                                 focus:border-accent outline-none
                                 py-[.65rem]
                                 font-body text-[.85rem] text-ink
                                 placeholder:text-ink/20
                                 transition-colors duration-200"
                    />
                    {f.name === 'email' && (
                      <ValidationError prefix="Email" field="email" errors={state.errors} />
                    )}
                  </div>
                ))}

                {/* Message */}
                <div className="flex flex-col gap-[.3rem]">
                  <label className="font-mono text-[.6rem] font-bold tracking-[.11em] uppercase
                                    text-ink/40 flex items-center gap-[.35rem]">
                    <i className="fas fa-comment-dots text-accent text-[.6rem]" />
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="What's on your mind?"
                    rows={4}
                    required
                    className="bg-paper2/50 border border-white/10
                               focus:border-accent/50 outline-none
                               p-3
                               font-body text-[.85rem] text-ink
                               placeholder:text-ink/20
                               resize-none
                               transition-colors duration-200"
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>

                <button
                  type="submit"
                  disabled={state.submitting}
                  className="self-start inline-flex items-center gap-[.55rem]
                             font-mono text-[.75rem] font-bold tracking-[.09em] uppercase
                             px-6 py-[.8rem]
                             bg-accent text-white
                             hover:bg-accent2
                             transition-colors duration-200 cursor-pointer
                             disabled:opacity-50
                             shadow-[0_4px_20px_rgba(249,115,22,.25)]"
                >
                  <i className="fas fa-paper-plane" />
                  {state.submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
