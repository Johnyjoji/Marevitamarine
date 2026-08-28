import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Fleet from './pages/Fleet';
import Safety from './pages/Safety';
import Careers from './pages/Careers';
import News from './pages/News';
import Contact from './pages/Contact';
import { HeroScrollProvider } from './context/HeroScrollContext';

function App() {
  return (
    <Router>
      <HeroScrollProvider>
        <div className="flex min-h-screen flex-col bg-white">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/fleet" element={<Fleet />} />
              <Route path="/safety" element={<Safety />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/news" element={<News />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HeroScrollProvider>
    </Router>
  );
}

export default App;
