import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

const STEPS = [
  { num: '01', name: 'LINUX',      sub: 'Foundation',    icon: 'devicon-linux-plain',                    slug: 'linux',      desc: 'Start here. Everything runs on Linux.' },
  { num: '02', name: 'DOCKER',     sub: 'Containers',    icon: 'devicon-docker-plain colored',            slug: 'docker',     desc: 'Package once. Run anywhere.' },
  { num: '03', name: 'CI/CD',      sub: 'Pipelines',     icon: 'fas fa-code-branch',                      slug: 'cicd',       desc: 'Automate build, test, and deploy.' },
  { num: '04', name: 'KUBERNETES', sub: 'Orchestration', icon: 'devicon-kubernetes-plain colored',        slug: 'kubernetes', desc: 'Run containers at scale.' },
  { num: '05', name: 'TERRAFORM',  sub: 'IaC',           icon: 'devicon-terraform-plain colored',         slug: 'terraform',  desc: 'Infrastructure defined as code.' },
  { num: '06', name: 'AWS',        sub: 'Cloud',         icon: 'devicon-amazonwebservices-plain colored',  slug: 'aws',        desc: 'The cloud powering the internet.' },
  { num: '07', name: 'ANSIBLE',    sub: 'Automation',    icon: 'devicon-ansible-plain',                   slug: 'ansible',    desc: 'Configure machines without agents.' },
  { num: '08', name: 'MONITORING', sub: 'Observability', icon: 'devicon-prometheus-original',             slug: 'monitoring', desc: 'Measure it. Know when it breaks.', iconStyle: { color: '#e6522c' } },
]

export default function Roadmap() {
  return (
    <section id="roadmap" className="pt-14 md:pt-20 pb-14 md:pb-20 border-b border-white/8">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            num="03"
            kicker="Where to start"
            kickerIcon="fas fa-map"
            title={'LEARNING\nROADMAP'}
            meta="8 steps<br/>Beginner → prod"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          className="grid grid-cols-2 md:grid-cols-4 border-t border-white/8"
        >
          {STEPS.map((s) => (
            <motion.div
              key={s.slug}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            >
              <Link
                to={`/topics/${s.slug}`}
                className="topic-bar topic-card-glow relative border-r border-b border-white/8 p-5 md:p-6
                           flex flex-col gap-3 text-ink no-underline overflow-hidden
                           even:border-r-0 md:even:border-r md:[&:nth-child(4n)]:border-r-0
                           hover:bg-white/3 group transition-all duration-300 block"
              >
                <span className="font-disp text-[3.5rem] text-ink/[.04] leading-none
                                 absolute top-1 right-3 select-none">
                  {s.num}
                </span>

                <i
                  className={`${s.icon} text-[1.9rem] transition-transform duration-300 group-hover:scale-110`}
                  style={s.iconStyle || {}}
                />
                <div>
                  <div className="font-disp text-[1.15rem] tracking-[.04em] text-ink group-hover:text-accent transition-colors duration-200">
                    {s.name}
                  </div>
                  <div className="font-mono text-[.58rem] text-ink/25 uppercase tracking-[.1em]">{s.sub}</div>
                </div>
                <div className="text-[.76rem] text-ink/35 leading-[1.55] mt-auto">{s.desc}</div>
                <div className="font-mono text-[.58rem] text-accent/0
                                group-hover:text-accent/70 transition-colors duration-200
                                flex items-center gap-1">
                  Read guide <i className="fas fa-arrow-right text-[.5rem]" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
