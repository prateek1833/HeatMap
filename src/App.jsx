import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Description from './components/Description';
import About from './components/About';
import Heatmap from './components/Heatmap';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      {/* Navbar will be rendered on all pages */}
      <Navbar />
      <Routes>
        {/* Define the actual pages for your app */}
        <Route path="/" element={<Description />} />
        <Route path="/about" element={<About />} />
        <Route path="/heatmap" element={<Heatmap />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
