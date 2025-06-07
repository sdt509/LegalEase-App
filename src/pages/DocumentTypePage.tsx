import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileCog, FileText, FileX, ScrollText } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

const documentTypes = [
  {
    id: 'motion',
    title: 'Motion',
    description: 'Request the court to make a decision on a specific issue in your case',
    icon: <FileCog className="w-8 h-8 text-blue-700" />,
  },
  {
    id: 'response',
    title: 'Response/Opposition',
    description: 'Respond to a motion filed by another party',
    icon: <FileText className="w-8 h-8 text-blue-700" />,
  },
  {
    id: 'order',
    title: 'Proposed Order',
    description: 'Submit a draft order for the judge to sign if they rule in your favor',
    icon: <FileX className="w-8 h-8 text-blue-700" />,
  },
  {
    id: 'brief',
    title: 'Legal Brief',
    description: 'Submit a written argument that supports your position',
    icon: <ScrollText className="w-8 h-8 text-blue-700" />,
  },
];

const DocumentTypePage = () => {
  const { jurisdiction } = useAppContext();
  const navigate = useNavigate();

  const handleDocumentSelect = (documentType: string) => {
    // For motion documents, navigate to motion type selection
    if (documentType === 'motion') {
      navigate('/motion-type');
    } else {
      // For other document types, go directly to editor
      navigate('/document-editor');
    }
  };

  const handleBack = () => {
    navigate('/jurisdiction');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <button 
        onClick={handleBack}
        className="flex items-center text-blue-700 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to jurisdiction selection
      </button>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Libre Baskerville, serif' }}>
          Select Document Type
        </h1>
        <p className="text-gray-600">
          You selected <span className="font-semibold">{jurisdiction}</span> as your jurisdiction.
          Now choose the type of legal document you need to create.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documentTypes.map((docType) => (
          <div 
            key={docType.id}
            className="card hover:border-blue-500 cursor-pointer transition-colors"
            onClick={() => handleDocumentSelect(docType.id)}
          >
            <div className="flex gap-4 items-start mb-3">
              {docType.icon}
              <h3 className="text-xl font-semibold">{docType.title}</h3>
            </div>
            <p className="text-gray-600">{docType.description}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-600 text-sm">
          Need a different document type? Contact us for assistance.
        </p>
      </div>
    </div>
  );
};

export default DocumentTypePage;
