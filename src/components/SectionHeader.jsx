export default function SectionHeader({ num, kicker, kickerIcon, title, meta }) {
  return (
    <div className="border-b border-white/8 pb-5 mb-0">
      <div className="flex items-stretch gap-0 flex-wrap">
        {/* Number */}
        <div className="font-disp text-[clamp(3rem,6vw,5rem)] gradient-text leading-none
                        flex-shrink-0 pr-5 mr-5 border-r border-white/10
                        flex items-end pb-1">
          {num}
        </div>
        {/* Text */}
        <div className="flex-1 min-w-[160px] flex flex-col justify-end pb-1">
          <div className="font-mono text-[.62rem] font-bold tracking-[.18em] uppercase
                          text-ink/40 mb-[.2rem] flex items-center gap-[.35rem]">
            <i className={`${kickerIcon} text-[.6rem] text-accent`} />
            {kicker}
          </div>
          <div className="font-disp text-[clamp(1.8rem,4vw,3.4rem)] leading-none tracking-[.04em] text-ink">
            {title}
          </div>
        </div>
        {/* Meta */}
        {meta && (
          <div className="hidden sm:flex items-end pb-1 ml-auto flex-shrink-0">
            <div className="font-mono text-[.65rem] text-ink/30 text-right leading-[1.7]"
                 dangerouslySetInnerHTML={{ __html: meta }} />
          </div>
        )}
      </div>
    </div>
  )
}
