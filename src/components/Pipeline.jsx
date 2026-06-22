import { useReveal } from '../hooks/useReveal'

const STAGES = [
  { icon: 'fas fa-code',       label: 'CODE',    sub: 'git push',      status: 'done'    },
  { icon: 'fas fa-hammer',     label: 'BUILD',   sub: 'docker build',  status: 'done'    },
  { icon: 'fas fa-vial',       label: 'TEST',    sub: 'run suite',     status: 'done'    },
  { icon: 'fas fa-rocket',     label: 'DEPLOY',  sub: 'kubectl apply', status: 'running' },
  { icon: 'fas fa-chart-line', label: 'MONITOR', sub: 'prometheus',    status: 'pending' },
]

export default function Pipeline() {
  const ref = useReveal()

  return (
    <div className="bg-ink border-b-[3px] border-ink py-5 overflow-x-auto">
      <div
        ref={ref}
        className="reveal-init max-w-[1280px] mx-auto px-4 md:px-10"
      >
        <div className="flex items-center min-w-[460px]">
          {STAGES.map((s, i) => (
            <div key={s.label} className="flex items-center flex-1">
              {/* Stage */}
              <div className="flex flex-col items-center gap-[.45rem] flex-shrink-0 min-w-[80px]">
                <div className={`w-9 h-9 border-2 flex items-center justify-center transition-colors
                                 ${s.status === 'done'
                                   ? 'border-green-400/60 text-green-400'
                                   : s.status === 'running'
                                   ? 'border-accent text-accent'
                                   : 'border-white/12 text-white/18'}`}>
                  <i className={`${s.icon} text-[.78rem]`} />
                </div>
                <div className="text-center">
                  <div className="font-mono text-[.6rem] font-bold tracking-[.12em] uppercase text-white">
                    {s.label}
                  </div>
                  <div className="font-mono text-[.54rem] text-white/28 mt-[1px]">{s.sub}</div>
                  <div className={`font-mono text-[.54rem] mt-[2px]
                                   ${s.status === 'done'    ? 'text-green-400/80' :
                                     s.status === 'running' ? 'text-accent' :
                                     'text-white/18'}`}>
                    {s.status === 'done'    ? '✓ passed'  :
                     s.status === 'running' ? '● running' : '○ pending'}
                  </div>
                </div>
              </div>

              {/* Connector */}
              {i < STAGES.length - 1 && (
                <div className="flex-1 flex items-center gap-[.25rem] mx-2">
                  <div className={`flex-1 h-[1px] ${s.status !== 'pending' ? 'bg-white/20' : 'bg-white/8'}`} />
                  <i className="fas fa-chevron-right text-white/15 text-[.48rem] flex-shrink-0" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
