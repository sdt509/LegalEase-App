import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileCog, FileText, Search } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { getMotionTypesForJurisdiction } from '../data/motionTypes';

const MotionTypePage = () => {
  const { jurisdiction, setMotionType } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const motionTypes = getMotionTypesForJurisdiction(jurisdiction);
  
  const handleBack = () => {
    navigate('/document-type');
  };
  
  const handleMotionSelect = (motionId: string, motionTitle: string) => {
    if (setMotionType) {
      setMotionType({ id: motionId, title: motionTitle });
    }
    navigate('/document-editor');
  };
  
  const filteredMotionTypes = searchTerm
    ? motionTypes.filter(motion => 
        motion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        motion.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : motionTypes;

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={handleBack}
        className="flex items-center text-blue-700 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to document selection
      </button>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Libre Baskerville, serif' }}>
          Select Motion Type
        </h1>
        <p className="text-gray-600">
          Choose the specific type of motion you need to file in {jurisdiction}.
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
            placeholder="Search motion types..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {filteredMotionTypes.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No motion types match your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMotionTypes.map((motion) => (
            <div 
              key={motion.id}
              className="card hover:border-blue-500 cursor-pointer transition-colors"
              onClick={() => handleMotionSelect(motion.id, motion.title)}
            >
              <div className="flex gap-4 items-start mb-3">
                {motion.id === 'ex-parte' ? (
                  <FileCog className="w-8 h-8 text-red-700" />
                ) : (
                  <FileText className="w-8 h-8 text-blue-700" />
                )}
                <h3 className="text-lg font-semibold">{motion.title}</h3>
              </div>
              <p className="text-gray-600">{motion.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MotionTypePage;
