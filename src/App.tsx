import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CountdownPage from './pages/CountdownPage';
import GiftScenePage from './pages/GiftScenePage';
import Navigation from './components/Navigation/Navigation';
import './App.css';

function App() {
  // Get base path from environment or use '/'
  const basePath = import.meta.env.BASE_URL || '/';
  
  return (
    <div className="app">
      <Router basename={basePath}>
        <Navigation />
        <Routes>
          <Route path="/" element={<CountdownPage />} />
          <Route path="/gift" element={<GiftScenePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
