const items = [
  { icon: 'devicon-docker-plain colored',           label: 'Docker' },
  { icon: 'devicon-kubernetes-plain colored',       label: 'Kubernetes' },
  { icon: 'devicon-amazonwebservices-plain colored', label: 'AWS' },
  { icon: 'fas fa-code-branch',                     label: 'CI/CD' },
  { icon: 'devicon-terraform-plain colored',        label: 'Terraform' },
  { icon: 'devicon-ansible-plain',                  label: 'Ansible' },
  { icon: 'devicon-linux-plain',                    label: 'Linux' },
  { icon: 'fas fa-chart-line',                      label: 'Monitoring' },
  { icon: 'fas fa-terminal',                        label: 'Real DevOps. No Fluff.' },
]

function MarqueeItems() {
  return (
    <>
      {items.map((it, i) => (
        <span key={i} className="inline-flex items-center gap-1">
          <i className={`${it.icon} text-[.62rem] mx-[.4rem] opacity-70`} />
          {it.label}
          <span className="mx-[1rem] text-accent opacity-60">✦</span>
        </span>
      ))}
    </>
  )
}

export default function Marquee() {
  return (
    <div className="bg-paper2 overflow-hidden whitespace-nowrap
                    py-[.6rem]
                    border-t border-b border-white/6">
      <div className="marquee-track inline-block
                      font-mono text-[.7rem] font-semibold tracking-[.1em] uppercase
                      text-ink/50">
        <MarqueeItems />
        <MarqueeItems />
      </div>
    </div>
  )
}
