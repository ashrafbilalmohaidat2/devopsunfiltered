import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

const pillars = [
  { icon: 'fas fa-terminal',    title: 'Hands-On First',     desc: 'Every concept ships with real code and a working environment. No theory without execution.' },
  { icon: 'fas fa-filter',      title: 'Zero Fluff',          desc: 'We name common mistakes, call out overhyped tools, and skip the filler. Brutal honesty only.' },
  { icon: 'fas fa-layer-group', title: 'Full Stack Coverage', desc: 'Docker → K8s → AWS → CI/CD → Terraform → Ansible.' },
  { icon: 'fas fa-rocket',      title: 'Production-Grade',    desc: "Real configs from real environments — not toy examples you'd never run in prod." },
  { icon: 'fas fa-code-branch', title: 'Open & Honest',       desc: 'We share failures as much as wins. If a tool is overhyped — we say so, clearly.' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
})

export default function About() {
  return (
    <section id="about" className="pt-14 md:pt-20 pb-14 md:pb-20 border-b border-white/8">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <motion.div {...fadeUp()}>
          <SectionHeader
            num="01"
            kicker="About the brand"
            kickerIcon="fas fa-user-gear"
            title={'BUILT FOR\nENGINEERS'}
            meta="DevOps Unfiltered<br/>Est. 2026"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 mt-2">
          {/* Left — manifesto */}
          <motion.div
            {...fadeUp(0.1)}
            className="md:pr-10 lg:pr-14 py-10 md:border-r border-white/8"
          >
            <div className="font-disp text-[clamp(4rem,8vw,7rem)] text-ink/[.04] leading-none mb-[-1.2rem] select-none">
              01
            </div>
            {[
              <><strong className="font-semibold text-ink border-b border-accent/50"><span className="text-accent">DevOps Unfiltered</span></strong> is not your average tech channel. No recycled beginner tutorials. No <em className="text-accent not-italic font-semibold">five-minute intros</em> before anything useful.</>,
              <>The audience: engineers who prefer the terminal over slides, and understand that <strong className="font-semibold text-ink border-b border-accent/50">DevOps is a practice and a culture</strong> — not just a toolset.</>,
              <>Every piece of content has a <em className="text-accent not-italic font-semibold">real technical reason</em> to exist. If there isn't one — it doesn't ship.</>,
            ].map((t, i) => (
              <p key={i} className="text-[clamp(.9rem,1.5vw,1.05rem)] leading-[1.85] mb-5 text-ink/65">
                {t}
              </p>
            ))}
          </motion.div>

          {/* Right — pillars */}
          <motion.div
            {...fadeUp(0.2)}
            className="md:pl-10 lg:pl-14 py-10 border-t border-white/8 md:border-t-0"
          >
            <ul className="list-none border-t border-white/8">
              {pillars.map((p, i) => (
                <motion.li
                  key={p.title}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
                  className="pillar-row grid grid-cols-[1.8rem_1fr] gap-3 items-start py-4"
                >
                  <i className={`${p.icon} pillar-icon text-accent text-[.95rem] mt-[2px] transition-colors duration-200`} />
                  <div>
                    <div className="font-semibold text-[.9rem] mb-[.2rem] text-ink">{p.title}</div>
                    <div className="pillar-desc text-[.78rem] text-ink/40 leading-[1.6] transition-opacity duration-200">{p.desc}</div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
