import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { toolDetails, topics } from '../data'

/* ─── Reading progress bar ─────────────────────────────────── */
function ReadingProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const total = scrollHeight - clientHeight
      setPct(total > 0 ? (scrollTop / total) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return (
    <div
      id="reading-progress"
      className="fixed top-0 left-0 z-[60] h-[2px] bg-accent"
      style={{ width: `${pct}%` }}
    />
  )
}

/* ─── Table of contents ─────────────────────────────────────── */
const TOC = [
  { id: 'tp-what',     label: '01 — What is it?' },
  { id: 'tp-benefits', label: '02 — Benefits' },
  { id: 'tp-concepts', label: '03 — Concepts' },
  { id: 'tp-commands', label: '04 — Commands' },
]

function TableOfContents() {
  const [active, setActive] = useState('tp-what')
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 140
      let cur = 'tp-what'
      for (const { id } of TOC) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= y) cur = id
      }
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="sticky top-[60px] z-30 bg-paper/90 backdrop-blur-xl border-b border-white/8 overflow-x-auto">
      <div className="max-w-[1280px] mx-auto px-0 flex items-stretch">
        <span className="font-mono text-[.58rem] uppercase tracking-[.1em] text-ink/25
                         px-4 flex items-center border-r border-white/8 flex-shrink-0 whitespace-nowrap">
          On this page
        </span>
        {TOC.map(item => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`font-mono text-[.62rem] font-semibold tracking-[.07em] uppercase
                        whitespace-nowrap px-4 py-[.7rem]
                        border-r border-white/8 last:border-r-0
                        no-underline transition-colors duration-150 flex-shrink-0
                        ${active === item.id
                          ? 'text-accent bg-white/4'
                          : 'text-ink/35 hover:text-ink/70 hover:bg-white/3'}`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  )
}

/* ─── Syntax highlighter ────────────────────────────────────── */
function tokenizeLine(line) {
  if (line.trim().startsWith('#')) {
    return [<span key="comment" className="text-ink/20">{line}</span>]
  }
  const parts = line.split(/(\s+)/)
  return parts.map((part, i) => {
    if (!part.trim()) return <span key={i}>{part}</span>
    const isFirst = parts.slice(0, i).every(p => !p.trim())
    if (isFirst)                  return <span key={i} className="text-[#79c0ff] font-semibold">{part}</span>
    if (part.startsWith('--'))    return <span key={i} className="text-[#ff7b72]">{part}</span>
    if (part.startsWith('-') && part.length > 1) return <span key={i} className="text-[#ffa657]">{part}</span>
    if (part.startsWith('$'))     return <span key={i} className="text-[#7ee787]">{part}</span>
    if (part.includes('/') || (part.includes('.') && !part.endsWith('.')))
                                  return <span key={i} className="text-[#a5d6ff]">{part}</span>
    return <span key={i} className="text-ink/70">{part}</span>
  })
}

function HighlightedCmd({ text }) {
  return (
    <>
      {text.split('\n').map((line, i) => (
        <div key={i}>{tokenizeLine(line)}</div>
      ))}
    </>
  )
}

/* ─── Copy button ───────────────────────────────────────────── */
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <button
      onClick={copy}
      className={`flex-shrink-0 flex items-center gap-1
                  font-mono text-[.58rem] tracking-[.06em] uppercase
                  px-2 py-1 border transition-all duration-200
                  ${copied
                    ? 'border-green-400/40 text-green-400 bg-green-400/10'
                    : 'border-white/10 text-ink/25 hover:border-accent hover:text-accent hover:bg-accent/8'}`}
    >
      <i className={`text-[.58rem] ${copied ? 'fas fa-check' : 'fas fa-copy'}`} />
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

/* ─── Section header ────────────────────────────────────────── */
function SNum({ num, kicker, kickerIcon, title }) {
  return (
    <div className="border-b border-white/8 pb-4 mb-0">
      <div className="flex items-stretch gap-0">
        <div className="font-disp text-[clamp(2.5rem,5vw,4rem)] gradient-text leading-none
                        flex-shrink-0 pr-5 mr-5 border-r border-white/10
                        flex items-end pb-1">
          {num}
        </div>
        <div className="flex flex-col justify-end pb-1">
          <div className="font-mono text-[.62rem] font-bold tracking-[.18em] uppercase
                          text-ink/30 mb-[.2rem] flex items-center gap-[.35rem]">
            <i className={`${kickerIcon} text-[.6rem] text-accent`} />
            {kicker}
          </div>
          <div className="font-disp text-[clamp(1.5rem,3.5vw,2.8rem)] leading-none tracking-[.04em] text-ink">
            {title}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Page hero ─────────────────────────────────────────────── */
function HeroSection({ tool }) {
  return (
    <section className="pt-[60px] bg-paper2 border-b border-accent/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-glow-accent opacity-50 pointer-events-none" />
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-10">
        {/* Breadcrumb */}
        <div className="border-b border-white/8 py-3 flex items-center justify-between">
          <Link to="/#topics"
            className="font-mono text-[.62rem] tracking-[.1em] uppercase
                       text-ink/30 hover:text-ink/70 transition-colors
                       flex items-center gap-2 no-underline">
            <i className="fas fa-chevron-left text-[.5rem]" /> Back to Topics
          </Link>
          <span className="font-mono text-[.58rem] tracking-[.1em] uppercase text-ink/15 hidden sm:block">
            DevOps Unfiltered — Tool Guide
          </span>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="py-12 md:py-20 grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-8 items-end"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <i className={`${tool.icon} text-[3.5rem] md:text-[4.5rem]`} style={tool.iconStyle || {}} />
              <span className="font-mono text-[.62rem] font-bold tracking-[.18em] uppercase
                               bg-accent text-white px-3 py-[.22rem]">
                {tool.sub}
              </span>
            </div>
            <h1 className="font-disp leading-none tracking-[.02em] text-ink mb-6
                           text-[clamp(3rem,10vw,9rem)]">
              {tool.name}
            </h1>
            <p className="font-mono text-[clamp(.78rem,1.4vw,.92rem)] text-ink/40
                          border-l-[2px] border-accent pl-4 leading-[1.8] max-w-2xl">
              {tool.tagline}
            </p>
          </div>

          {/* Guide map */}
          <div className="hidden lg:flex flex-col gap-3 pb-2">
            <div className="font-mono text-[.6rem] tracking-[.16em] uppercase text-accent mb-1
                            flex items-center gap-2">
              <i className="fas fa-list-check text-[.6rem]" /> Guide contents
            </div>
            {['What it is', 'Key benefits', 'Core concepts', 'Essential commands'].map((it, i) => (
              <a key={i} href={`#${TOC[i].id}`}
                 className="flex items-center gap-3 font-mono text-[.68rem] text-ink/25
                            no-underline hover:text-ink/60 transition-colors">
                <span className="text-accent font-bold">{String(i + 1).padStart(2, '0')}</span>
                {it}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── What is section ───────────────────────────────────────── */
function WhatSection({ tool }) {
  return (
    <section id="tp-what" className="border-b border-white/8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-[1280px] mx-auto px-4 md:px-10 py-12 md:py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-8 md:gap-16 items-start">
          <div>
            <div className="font-mono text-[.62rem] font-bold tracking-[.18em] uppercase
                            text-accent flex items-center gap-2 mb-3">
              <i className="fas fa-circle-info" /> What is it?
            </div>
            <div className="font-disp text-[3rem] text-ink/[.05] leading-none select-none">01</div>
          </div>
          <p className="text-[clamp(.95rem,2vw,1.12rem)] leading-[1.95] text-ink/60">
            {tool.what}
          </p>
        </div>
      </motion.div>
    </section>
  )
}

/* ─── Benefits section ──────────────────────────────────────── */
function BenefitsSection({ tool }) {
  return (
    <section id="tp-benefits" className="border-b border-white/8">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 pt-12 md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SNum num="02" kicker="Benefits" kickerIcon="fas fa-check-circle" title="WHY USE IT" />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-white/8"
        >
          {tool.benefits.map((b, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}
              className="border-r border-b border-white/8 p-6 md:p-8
                         flex flex-col gap-3
                         sm:[&:nth-child(2n)]:border-r-0
                         lg:[&:nth-child(2n)]:border-r
                         lg:[&:nth-child(3n)]:border-r-0
                         hover:bg-white/3 group
                         transition-colors duration-200"
            >
              <i className={`${b.icon} text-accent text-[1.1rem]`} />
              <div className="font-disp text-[1.3rem] tracking-[.04em] text-ink">{b.title}</div>
              <div className="text-[.8rem] text-ink/40 leading-[1.65]">{b.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Concepts section ──────────────────────────────────────── */
function ConceptsSection({ tool }) {
  return (
    <section id="tp-concepts" className="border-b border-white/8">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 pt-12 md:pt-16 pb-12 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <SNum num="03" kicker="Vocabulary" kickerIcon="fas fa-book" title="CORE CONCEPTS" />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
          className="grid grid-cols-1 md:grid-cols-2 border-t border-white/8"
        >
          {tool.concepts.map((c, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0, transition: { duration: 0.4 } } }}
              className="border-b border-r border-white/8 p-5
                         md:[&:nth-child(2n)]:border-r-0
                         flex gap-4 hover:bg-white/3 group
                         transition-colors duration-200"
            >
              <div className="font-disp text-accent text-[.75rem] opacity-25 flex-shrink-0
                              w-6 text-right leading-[1.6] pt-[2px]
                              group-hover:opacity-55 transition-opacity">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div>
                <div className="font-mono text-[.7rem] font-bold tracking-[.09em] uppercase
                                text-ink/70 mb-1 group-hover:text-accent transition-colors duration-200">
                  {c.term}
                </div>
                <div className="text-[.82rem] text-ink/40 leading-[1.65] group-hover:text-ink/60 transition-colors">
                  {c.def}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Commands section ──────────────────────────────────────── */
function CommandsSection({ tool }) {
  return (
    <section id="tp-commands" className="border-b border-white/8">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 pt-12 md:pt-16 pb-12 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <SNum num="04" kicker="Reference" kickerIcon="fas fa-terminal" title="KEY COMMANDS" />
        </motion.div>
        <div className="flex flex-col border-t border-white/8">
          {tool.commands.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              className="border-b border-white/8
                         grid grid-cols-1 md:grid-cols-[1fr_260px]"
            >
              <div className="relative group/cmd bg-paper2 px-4 md:px-6 py-4 md:border-r border-white/6">
                <pre className="font-mono text-[.76rem] leading-[1.7] whitespace-pre-wrap overflow-x-auto pr-20">
                  <HighlightedCmd text={c.cmd} />
                </pre>
                <div className="absolute top-3 right-3
                                opacity-0 group-hover/cmd:opacity-100
                                transition-opacity duration-200">
                  <CopyButton text={c.cmd} />
                </div>
              </div>
              <div className="px-4 md:px-5 py-4 font-mono text-[.68rem]
                              text-ink/35 leading-[1.6] flex items-center">
                {c.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Related topics strip ──────────────────────────────────── */
function RelatedTopics({ currentSlug }) {
  const others = topics.filter(t => t.slug !== currentSlug).slice(0, 4)
  return (
    <section className="pb-16 md:pb-24">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 pt-12 md:pt-16">
        <div className="font-mono text-[.62rem] font-bold tracking-[.18em] uppercase
                        text-ink/30 mb-0 flex items-center gap-2">
          <i className="fas fa-layer-group text-accent text-[.6rem]" />
          Explore more tools
        </div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-2 md:grid-cols-4 border-t border-white/8 mt-4"
        >
          {others.map(t => (
            <motion.div
              key={t.slug}
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}
            >
              <Link to={`/topics/${t.slug}`}
                    className="topic-bar topic-card-glow relative border-r border-b border-white/8 p-5 md:p-6
                               flex flex-col gap-3 text-ink no-underline overflow-hidden
                               even:border-r-0 md:even:border-r md:[&:nth-child(4n)]:border-r-0
                               hover:bg-white/3 group transition-colors duration-200 block">
                <i className={`${t.icon} text-[1.8rem] transition-transform duration-300 group-hover:scale-110`}
                   style={t.iconStyle} />
                <div className="font-disp text-[1.1rem] tracking-[.04em] text-ink group-hover:text-accent transition-colors duration-200">
                  {t.name}
                </div>
                <div className="font-mono text-[.58rem] text-ink/25 uppercase tracking-[.1em]">{t.sub}</div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Main page ─────────────────────────────────────────────── */
export default function TopicPage() {
  const { slug } = useParams()
  const tool     = toolDetails[slug]

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  if (!tool) {
    return (
      <div className="pt-[90px] min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="font-disp text-[6rem] gradient-text leading-none">404</div>
          <div className="font-mono text-[.8rem] text-ink/40 mb-6 uppercase tracking-[.1em]">
            Topic not found
          </div>
          <Link to="/#topics"
                className="font-mono text-[.75rem] font-bold
                           border border-white/15 hover:border-white/40
                           px-5 py-3 hover:bg-white/5
                           transition-all duration-200
                           no-underline text-ink/60 hover:text-ink">
            ← Back to Topics
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <ReadingProgress />
      <HeroSection     tool={tool} />
      <TableOfContents />
      <WhatSection     tool={tool} />
      <BenefitsSection tool={tool} />
      <ConceptsSection tool={tool} />
      <CommandsSection tool={tool} />
      <RelatedTopics   currentSlug={slug} />
    </>
  )
}
