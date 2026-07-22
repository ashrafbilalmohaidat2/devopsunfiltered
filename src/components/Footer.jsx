const socials = [
  { href: 'https://www.youtube.com/@devops_unfiltered',              icon: 'fab fa-youtube',   label: 'YouTube',   color: 'hover:text-[#ff4444]' },
  { href: 'https://www.instagram.com/devopsunfiltered/?hl=en',       icon: 'fab fa-instagram', label: 'Instagram', color: 'hover:text-[#e1306c]' },
  { href: 'https://www.linkedin.com/in/ashraf-mheidat-8471b9294',    icon: 'fab fa-linkedin',  label: 'LinkedIn',  color: 'hover:text-[#0077b5]' },
]

export default function Footer() {
  return (
    <footer className="bg-paper2 border-t border-accent/30">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10
                      py-5 md:py-8
                      flex flex-col sm:flex-row items-start sm:items-center
                      justify-between gap-5 flex-wrap">

        {/* Logo */}
        <a href="/" aria-label="DevOps Unfiltered home" className="flex items-center gap-3 no-underline flex-shrink-0">
          <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="36" fill="#18181b" rx="2"/>
            <rect width="36" height="3" fill="#f97316" rx="1"/>
            <path d="M6,18 C6,11 11,8 18,18 C25,28 30,25 30,18 C30,11 25,8 18,18 C11,28 6,25 6,18 Z"
                  stroke="#f0ede8" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="18" cy="18" r="2" fill="#f97316"/>
          </svg>
          <span className="font-disp text-[1.2rem] tracking-[.07em] text-ink/80 whitespace-nowrap">
            DEVOPS<span className="text-accent">/</span>UNFILTERED
          </span>
        </a>

        {/* Socials */}
        <div className="flex items-center flex-wrap">
          {socials.map(s => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`DevOps Unfiltered on ${s.label}`}
              className={`flex items-center gap-[.35rem]
                          font-mono text-[.62rem] text-ink/30
                          no-underline
                          px-3 md:px-4 py-1
                          border-r border-white/6 first:border-l first:border-white/6
                          transition-all duration-200
                          hover:opacity-100 hover:text-ink/70 ${s.color}`}
            >
              <i className={`${s.icon} text-[.8rem]`} />
              <span className="hidden sm:inline">{s.label}</span>
            </a>
          ))}
        </div>

        {/* Meta */}
        <div className="font-mono text-[.6rem] text-ink/20
                        flex flex-col gap-[.2rem]
                        sm:text-right">
          {[
            { icon: 'fas fa-copyright', text: '2026 DevOps Unfiltered — Real DevOps. No Fluff.' },
            { icon: 'fas fa-terminal',  text: '$ echo "No Fluff" | grep -i unfiltered' },
          ].map(r => (
            <div key={r.text} className="flex items-center sm:justify-end gap-[.35rem]">
              <i className={`${r.icon} text-accent text-[.58rem]`} />
              {r.text}
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
