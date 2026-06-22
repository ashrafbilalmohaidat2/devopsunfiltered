import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import { episodes } from '../data'

const platformColors = {
  yt: { bg: '#ff0000', icon: 'fab fa-youtube', label: 'YouTube' },
}

function EpisodeCard({ ep, i }) {
  return (
    <motion.a
      href={ep.url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
      className="ep-card group flex flex-col no-underline text-ink
                 bg-paper2 border border-white/7 overflow-hidden"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden aspect-video bg-surface">
        <img
          src={ep.thumbnail}
          alt={ep.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center
                        opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-12 h-12 rounded-full bg-accent/90 flex items-center justify-center
                          shadow-[0_4px_24px_rgba(249,115,22,0.5)]
                          transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <i className="fas fa-play text-white text-sm ml-[2px]" />
          </div>
        </div>
        {/* Episode number badge */}
        <div className="absolute top-3 left-3 font-mono text-[.58rem] font-bold
                        bg-paper/90 backdrop-blur-sm text-ink/60 px-2 py-[.2rem]">
          EP {String(ep.num).padStart(2, '0')}
        </div>
        {/* Platform badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1
                        font-mono text-[.58rem] font-bold
                        bg-black/70 backdrop-blur-sm text-white px-2 py-[.2rem]">
          <i className={`${ep.platformIcon} text-[#ff4444] text-[.7rem]`} />
          {ep.platformLabel}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        {/* Tag */}
        <span className="self-start font-mono text-[.55rem] font-bold
                         tracking-[.09em] uppercase border border-accent/40 text-accent
                         inline-flex items-center gap-[.3rem]
                         px-[.45rem] py-[.15rem]">
          <i className={`${ep.tagIcon} text-[.6rem]`} />
          {ep.tag}
        </span>

        {/* Title */}
        <h3 className="font-disp text-[clamp(.95rem,2vw,1.2rem)] tracking-[.03em] leading-[1.2]
                       text-ink group-hover:text-accent transition-colors duration-200">
          {ep.title}
        </h3>

        {/* Desc */}
        <p className="text-[.78rem] text-ink/40 leading-[1.55] flex-1">{ep.desc}</p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-white/6">
          <span className="font-mono text-[.6rem] text-ink/30">{ep.date}</span>
          <span className="font-mono text-[.6rem] text-accent/0 group-hover:text-accent/70
                           transition-colors duration-200 flex items-center gap-1">
            Watch now <i className="fas fa-arrow-up-right-from-square text-[.5rem]" />
          </span>
        </div>
      </div>
    </motion.a>
  )
}

export default function Episodes() {
  return (
    <section id="episodes" className="pt-14 md:pt-20 pb-14 md:pb-20 border-b border-white/8">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            num="03"
            kicker="Latest content"
            kickerIcon="fas fa-circle-play"
            title={'RECENT\nEPISODES'}
            meta={`${episodes.length} episodes<br/>YouTube`}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-[.88rem] text-ink/40 leading-[1.75] py-5 border-b border-white/8"
        >
          Each episode has a real technical reason to exist — no fluff, no intro music, no "don't forget to subscribe."
          Just the problem, the code, and the solution.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {episodes.map((ep, i) => (
            <EpisodeCard key={ep.num} ep={ep} i={i} />
          ))}
        </div>

        {/* More episodes CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8 flex justify-center"
        >
          <a
            href="https://www.youtube.com/@devops_unfiltered"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2
                       font-mono text-[.72rem] font-bold tracking-[.08em] uppercase
                       text-ink/50 hover:text-ink border border-white/12 hover:border-white/30
                       px-5 py-3 transition-all duration-200 no-underline"
          >
            <i className="fab fa-youtube text-[#ff4444]" />
            View all episodes on YouTube
            <i className="fas fa-arrow-right text-[.6rem]" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
