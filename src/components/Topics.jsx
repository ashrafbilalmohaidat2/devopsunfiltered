import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import { topics } from '../data'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function Topics() {
  return (
    <section id="topics" className="pt-14 md:pt-20 pb-14 md:pb-20 border-b border-white/8">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            num="02"
            kicker="What we cover"
            kickerIcon="fas fa-layer-group"
            title={'THE FULL\nSTACK'}
            meta="9 core topics<br/>All layers"
          />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 md:grid-cols-3 border-t border-white/8 mt-0"
        >
          {topics.map(t => (
            <motion.div key={t.id} variants={item}>
              <Link
                to={`/topics/${t.slug}`}
                className="topic-bar topic-card-glow relative border-r border-b border-white/8 p-5 md:p-7
                           flex flex-col gap-[.65rem] text-ink no-underline
                           overflow-hidden
                           even:border-r-0 md:even:border-r md:[&:nth-child(3n)]:border-r-0
                           transition-all duration-300
                           hover:bg-white/3 group block"
              >
                <span className="font-mono text-[.55rem] text-ink/20 absolute top-3 right-3">{t.id}</span>
                <i
                  className={`${t.icon} text-[2rem] transition-all duration-300 group-hover:scale-110`}
                  style={t.iconStyle}
                />
                <div className="font-disp text-[clamp(1rem,2vw,1.4rem)] tracking-[.04em] text-ink group-hover:text-accent transition-colors duration-200">
                  {t.name}
                </div>
                <div className="font-mono text-[.6rem] text-ink/30 uppercase tracking-[.1em]">{t.sub}</div>
                <div className="font-mono text-[.58rem] text-accent/0 group-hover:text-accent/70
                                transition-all duration-300 flex items-center gap-1 -mb-1">
                  Explore guide <i className="fas fa-arrow-right text-[.5rem]" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
