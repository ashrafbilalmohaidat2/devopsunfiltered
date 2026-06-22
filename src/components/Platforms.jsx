import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import { platforms } from '../data'

const barClass = {
  yt: 'plat-bar-yt',
  ig: 'plat-bar-ig',
  li: 'plat-bar-li',
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function Platforms() {
  return (
    <section id="platforms" className="pt-14 md:pt-20 pb-14 md:pb-20 border-b border-white/8">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            num="04"
            kicker="Where to follow"
            kickerIcon="fas fa-share-nodes"
            title={'FIND US\nEVERYWHERE'}
            meta="3 platforms<br/>Weekly cadence"
          />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 border-t border-white/8"
        >
          {platforms.map(p => (
            <motion.a
              key={p.key}
              variants={item}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className={`${barClass[p.key]}
                          relative overflow-hidden
                          flex flex-col gap-4 p-7 md:p-10
                          border-b md:border-b-0 md:border-r border-white/8
                          last:border-b-0 last:border-r-0
                          text-ink no-underline
                          bg-paper2 hover:bg-surface
                          transition-all duration-300 group`}
            >
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 bg-glow-center opacity-0 group-hover:opacity-100
                              transition-opacity duration-400 pointer-events-none" />

              {/* Icon + arrow */}
              <div className="flex items-center justify-between relative">
                <i
                  className={`${p.icon} text-[2.2rem] transition-transform duration-300 group-hover:scale-110`}
                  style={{ color: p.iconColor }}
                />
                <span className="font-mono text-[1.2rem] text-ink/15
                                 transition-all duration-300
                                 group-hover:text-ink/60 group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </div>

              {/* Name */}
              <div className="font-disp text-[clamp(1.5rem,3vw,2rem)] tracking-[.04em] text-ink relative">
                {p.name}
              </div>

              {/* Handle */}
              <div className="font-mono text-[.68rem] text-ink/35 flex items-center gap-[.35rem] relative">
                <i className={`${p.handleIcon} text-[.65rem]`} />
                {p.handle}
              </div>

              {/* Stat chips */}
              <div className="flex gap-2 flex-wrap relative">
                {p.stats.map(s => (
                  <span key={s.label}
                        className="inline-flex items-center gap-[.3rem]
                                   font-mono text-[.58rem] font-semibold tracking-[.08em] uppercase
                                   border border-white/10 text-ink/30 group-hover:text-ink/50
                                   px-2 py-[.2rem] transition-colors duration-200">
                    <i className={`${s.icon} text-[.6rem]`} />
                    {s.label}
                  </span>
                ))}
              </div>

              {/* Desc */}
              <p className="text-[.8rem] text-ink/40 leading-[1.65] relative">{p.desc}</p>

              {/* Type footer */}
              <div className="font-mono text-[.6rem] font-bold tracking-[.1em] uppercase
                              text-ink/25 mt-auto flex items-center gap-[.35rem] relative">
                <i className={`${p.typeIcon} text-accent text-[.6rem]`} />
                {p.typeLabel}
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
