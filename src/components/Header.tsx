import { Link } from 'react-router-dom';
import { Menu, Scale } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-900" style={{ fontFamily: 'Libre Baskerville, serif' }}>
          <Scale className="h-6 w-6" />
          <span>LegalEase</span>
        </Link>
        
        <div className="md:hidden">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <Menu />
          </button>
        </div>
        
        <nav className={`${menuOpen ? 'block absolute top-16 left-0 right-0 bg-white p-4 shadow-md z-50' : 'hidden'} md:block md:static md:shadow-none`}>
          <ul className="md:flex md:space-x-8 space-y-4 md:space-y-0">
            <li>
              <Link 
                to="/" 
                className="text-gray-600 hover:text-blue-700 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/jurisdiction" 
                className="text-gray-600 hover:text-blue-700 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                New Document
              </Link>
            </li>
            <li>
              <Link 
                to="/document-compile" 
                className="text-gray-600 hover:text-blue-700 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Compile Documents
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
