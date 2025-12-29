import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { NewsProvider } from './context/NewsContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SpotlightBackground from './components/SpotlightBackground'
import Home from './pages/Home'
import Explore from './pages/Explore'
import About from './pages/About'
import NewsDetails from './components/NewsDetails'
import NotFound from './pages/NotFound'

function App() {
  return (
    <NewsProvider>
      <Router> {/* Changed from BrowserRouter to HashRouter */}
        <div className="min-h-screen bg-zinc-900 text-gray-400 relative overflow-hidden">
          <SpotlightBackground />
          <Navbar />
          <main className="container mx-auto px-4 py-8 relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/about" element={<About />} />
              <Route path="/news/:id" element={<NewsDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </NewsProvider>
  )
}

export default App