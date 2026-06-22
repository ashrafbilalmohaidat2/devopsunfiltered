export default function Topbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[30px] bg-ink text-white
                    flex items-center justify-between
                    px-4 md:px-10
                    border-b border-white/[0.07]
                    font-mono text-[0.62rem] tracking-[0.09em]">

      {/* Left */}
      <div className="flex items-center gap-5 overflow-hidden">
        {/* LIVE */}
        <span className="flex items-center gap-1.5 opacity-100">
          <span className="live-dot w-[6px] h-[6px] bg-accent rounded-full flex-shrink-0" />
          <i className="fas fa-tower-broadcast text-accent text-[0.6rem]" />
          <span>LIVE</span>
        </span>
        {/* current ep */}
        <span className="hidden sm:flex items-center gap-1.5 opacity-60 whitespace-nowrap">
          <i className="fas fa-circle-play text-accent text-[0.6rem]" />
          EP#08 — Kubernetes Ingress Controllers
        </span>
        {/* series */}
        <span className="hidden lg:flex items-center gap-1.5 opacity-60 whitespace-nowrap">
          <i className="devicon-kubernetes-plain text-accent text-[0.7rem]" />
          Currently: Kubernetes series
        </span>
      </div>

      {/* Right */}
      <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
        <span className="flex items-center gap-1.5 opacity-60">
          <i className="fas fa-globe text-accent text-[0.6rem]" />
          devops-unfiltered.com
        </span>
        <span className="flex items-center gap-1.5 text-accent">
          <i className="fas fa-flag text-[0.6rem]" />
          EST. 2024
        </span>
      </div>
    </div>
  )
}
