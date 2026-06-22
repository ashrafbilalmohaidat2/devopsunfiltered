import Hero       from '../components/Hero'
import Marquee    from '../components/Marquee'
import About      from '../components/About'
import Topics     from '../components/Topics'
import Episodes   from '../components/Episodes'
import Platforms  from '../components/Platforms'
import Newsletter from '../components/Newsletter'
import Contact    from '../components/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <About />
      <Topics />
      <Episodes />
      <Platforms />
      <Newsletter />
      <Contact />
    </main>
  )
}
