import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import JurisdictionPage from './pages/JurisdictionPage';
import DocumentTypePage from './pages/DocumentTypePage';
import MotionTypePage from './pages/MotionTypePage';
import DocumentEditorPage from './pages/DocumentEditorPage';
import DocumentCompilePage from './pages/DocumentCompilePage';
import Header from './components/Header';
import Footer from './components/Footer';
import { AppProvider } from './contexts/AppContext';
import './index.css';

export function App() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Libre+Baskerville:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <Router>
      <AppProvider>
        <div className="min-h-screen flex flex-col bg-gray-50" style={{ fontFamily: 'Inter, sans-serif' }}>
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/jurisdiction" element={<JurisdictionPage />} />
              <Route path="/document-type" element={<DocumentTypePage />} />
              <Route path="/motion-type" element={<MotionTypePage />} />
              <Route path="/document-editor" element={<DocumentEditorPage />} />
              <Route path="/document-compile" element={<DocumentCompilePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AppProvider>
    </Router>
  );
}

export default App;
