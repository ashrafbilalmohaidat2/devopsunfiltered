import { Routes, Route } from 'react-router-dom'
import Navbar    from './components/Navbar'
import Footer    from './components/Footer'
import BackToTop from './components/BackToTop'
import Home      from './pages/Home'
import TopicPage from './pages/TopicPage'

export default function App() {
  return (
    <div className="bg-paper text-ink font-body overflow-x-hidden min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/"             element={<Home />} />
        <Route path="/topics/:slug" element={<TopicPage />} />
      </Routes>
      <Footer />
      <BackToTop />
    </div>
  )
}
