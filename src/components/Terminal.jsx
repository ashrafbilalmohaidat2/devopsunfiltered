import { useState, useEffect, useRef } from 'react'

const SEQUENCE = [
  { cmd: 'docker build -t myapp:latest .', out: '✓  Built a3f9c2d1  (12.4s)' },
  { cmd: 'kubectl apply -f deployment.yaml', out: 'deployment.apps/myapp configured' },
  { cmd: 'terraform plan -out=tfplan', out: 'Plan: 3 to add, 0 to destroy.' },
  { cmd: 'ansible-playbook site.yml', out: 'RECAP: ok=8  changed=2  failed=0' },
]

export default function Terminal() {
  const [committed, setCommitted] = useState([])
  const [typing,    setTyping]    = useState('')

  const seqRef   = useRef(0)
  const charRef  = useRef(0)
  const phaseRef = useRef('type')
  const timerRef = useRef(null)
  const bodyRef  = useRef(null)

  useEffect(() => {
    function tick() {
      const { cmd, out } = SEQUENCE[seqRef.current % SEQUENCE.length]

      if (phaseRef.current === 'type') {
        const n = charRef.current + 1
        setTyping(cmd.slice(0, n))
        charRef.current = n
        if (n >= cmd.length) { phaseRef.current = 'output'; timerRef.current = setTimeout(tick, 380) }
        else                  { timerRef.current = setTimeout(tick, 44) }

      } else if (phaseRef.current === 'output') {
        setCommitted(prev => [...prev,
          { t: 'cmd', text: cmd },
          { t: 'out', text: out },
        ].slice(-12))
        setTyping('')
        charRef.current = 0
        phaseRef.current = 'pause'
        timerRef.current = setTimeout(tick, 1300)

      } else {
        seqRef.current++
        if (seqRef.current % SEQUENCE.length === 0) setCommitted([])
        phaseRef.current = 'type'
        timerRef.current = setTimeout(tick, 200)
      }
    }

    timerRef.current = setTimeout(tick, 700)
    return () => clearTimeout(timerRef.current)
  }, [])

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [committed])

  return (
    <div className="bg-[#111] border border-white/8 font-mono text-[.7rem] leading-relaxed overflow-hidden flex flex-col">
      {/* title bar */}
      <div className="flex items-center gap-[6px] px-3 py-[6px] bg-[#1e1e1e] border-b border-white/6 flex-shrink-0">
        <span className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]" />
        <span className="w-[10px] h-[10px] rounded-full bg-[#febc2e]" />
        <span className="w-[10px] h-[10px] rounded-full bg-[#28c840]" />
        <span className="ml-auto text-white/20 text-[.58rem] tracking-widest uppercase">bash</span>
      </div>
      {/* body */}
      <div ref={bodyRef} className="flex-1 p-3 space-y-[3px] max-h-[220px] overflow-y-auto"
           style={{ scrollbarWidth: 'none' }}>
        {committed.map((line, i) =>
          line.t === 'cmd' ? (
            <div key={i} className="flex gap-2">
              <span className="text-accent select-none flex-shrink-0">$</span>
              <span className="text-white/75 break-all">{line.text}</span>
            </div>
          ) : (
            <div key={i} className="text-green-400/75 pl-4 text-[.66rem]">{line.text}</div>
          )
        )}
        <div className="flex gap-2">
          <span className="text-accent select-none flex-shrink-0">$</span>
          <span className="text-white/75">{typing}</span>
          <span className="terminal-cursor inline-block w-[7px] h-[14px] bg-accent align-middle" />
        </div>
      </div>
    </div>
  )
}
