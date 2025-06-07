import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Search } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import JurisdictionList from '../components/JurisdictionList';

const JurisdictionPage = () => {
  const { setJurisdiction } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [jurisdictionType, setJurisdictionType] = useState<'all' | 'state' | 'federal'>('all');
  const navigate = useNavigate();
  
  const handleStateSelect = (jurisdiction: string) => {
    setJurisdiction(jurisdiction);
    navigate('/document-type');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Libre Baskerville, serif' }}>
          Select Your Jurisdiction
        </h1>
        <p className="text-gray-600">
          Choose the state or federal district court where you'll be filing your legal documents to ensure compliance with court rules.
        </p>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type="search"
            className="input-field pl-10"
            placeholder="Search for a jurisdiction..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="mb-6 flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Filter by:</span>
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-3 py-1 text-sm rounded-full ${jurisdictionType === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setJurisdictionType('all')}
          >
            All Courts
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-full ${jurisdictionType === 'state' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setJurisdictionType('state')}
          >
            State Courts
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-full ${jurisdictionType === 'federal' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setJurisdictionType('federal')}
          >
            Federal Courts
          </button>
        </div>
      </div>
      
      <JurisdictionList 
        searchTerm={searchTerm}
        onSelectJurisdiction={handleStateSelect}
      />
    </div>
  );
};

export default JurisdictionPage;
