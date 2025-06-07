import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CircleHelp, FileOutput, Save, Sparkles } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { useLocation } from 'react-router-dom';
import AIDocumentForm from '../components/AIDocumentForm';
import { getJurisdictionSpecificTips } from '../services/AIService';

const DocumentEditorPage = () => {
  const { jurisdiction, motionType } = useAppContext();
  const navigate = useNavigate();
  const [documentContent, setDocumentContent] = useState('');
  const [showTips, setShowTips] = useState(true);
  const [showAIForm, setShowAIForm] = useState(false);
  const [jurisdictionTips, setJurisdictionTips] = useState<string>('');
  const [isLoadingTips, setIsLoadingTips] = useState(false);
  
  // Get document type from context or default to motion
  const documentType = 'motion';
  // Get the specific motion type if available
  const specificMotionType = motionType?.title || '';
  
  useEffect(() => {
    // Load jurisdiction-specific tips when the component mounts
    const loadTips = async () => {
      setIsLoadingTips(true);
      try {
        const tips = await getJurisdictionSpecificTips(jurisdiction, documentType);
        setJurisdictionTips(tips);
      } catch (error) {
        console.error('Error loading tips:', error);
      } finally {
        setIsLoadingTips(false);
      }
    };
    
    loadTips();
  }, [jurisdiction, documentType]);

  const handleSaveDraft = () => {
    // In a real app, this would save to the AppContext and possibly localStorage
    alert('Document draft saved successfully!');
  };
  
  const handleExport = () => {
    // In a real app, this would generate and download a PDF
    alert('In the full version, this would generate a properly formatted PDF for e-filing.');
  };
  
  const handleBack = () => {
    navigate('/document-type');
  };
  
  const handleNext = () => {
    navigate('/document-compile');
  };

  const handleGenerateDocument = (content: string) => {
    setDocumentContent(content);
    setShowAIForm(false);
  };

  // Default template if no AI-generated content
  const getDocumentTemplate = () => {
    if (documentContent) return documentContent;
    
    return `IN THE ${jurisdiction.toUpperCase()}
[CASE CAPTION]

[PLAINTIFF NAME],                  )  Case No. [CASE NUMBER]
                                   )
                  Plaintiff,       )  [DOCUMENT TITLE]
                                   )
v.                                )  [Other header information based on local rules]
                                   )
[DEFENDANT NAME],                  )  
                                   )
                  Defendant.       )
____________________________________)

${specificMotionType || '[DOCUMENT TITLE]'}

[Document content will appear here after you use the AI Generator]

DATED this [DAY] day of [MONTH], [YEAR].

Respectfully submitted,

________________________
[YOUR NAME]
[YOUR ADDRESS]
[YOUR PHONE]
[YOUR EMAIL]
[Pro Se Litigant or Self-Represented]`;
  };

  return (
    <div className="max-w-5xl mx-auto">
      <button 
        onClick={handleBack}
        className="flex items-center text-blue-700 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to document selection
      </button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Libre Baskerville, serif' }}>
          Document Editor
        </h1>
        <p className="text-gray-600">
          Creating a {specificMotionType || documentType} for {jurisdiction}. Use the AI generator or edit the template manually.
        </p>
      </div>
      
      {showAIForm ? (
        <AIDocumentForm 
          jurisdiction={jurisdiction}
          documentType={documentType}
          motionType={specificMotionType}
          onGenerateDocument={handleGenerateDocument}
        />
      ) : (
        <button 
          onClick={() => setShowAIForm(true)}
          className="btn-primary mb-6 flex items-center justify-center mx-auto"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Generate Document with AI
        </button>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 px-4 py-3 flex justify-between items-center bg-gray-50">
              <h2 className="font-medium">Document Content</h2>
              <div className="flex gap-2">
                <button 
                  onClick={handleSaveDraft}
                  className="flex items-center text-sm text-gray-600 hover:text-blue-700"
                >
                  <Save className="w-4 h-4 mr-1" />
                  Save Draft
                </button>
                <button 
                  onClick={handleExport}
                  className="flex items-center text-sm text-gray-600 hover:text-blue-700"
                >
                  <FileOutput className="w-4 h-4 mr-1" />
                  Export PDF
                </button>
              </div>
            </div>
            <textarea
              className="w-full h-[600px] p-4 font-mono text-sm border-0 focus:ring-0"
              value={documentContent || getDocumentTemplate()}
              onChange={(e) => setDocumentContent(e.target.value)}
            ></textarea>
          </div>
          
          <div className="flex justify-between mt-6">
            <button 
              onClick={handleBack}
              className="btn-secondary"
            >
              Back
            </button>
            <button 
              onClick={handleNext}
              className="btn-primary"
            >
              Continue to Document Compilation
            </button>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold flex items-center">
                <CircleHelp className="w-4 h-4 mr-1 text-blue-700" />
                {jurisdiction} Tips
              </h3>
              <button 
                className="text-sm text-gray-500"
                onClick={() => setShowTips(!showTips)}
              >
                {showTips ? 'Hide' : 'Show'}
              </button>
            </div>
            
            {showTips && (
              <div className="text-sm text-gray-600">
                {isLoadingTips ? (
                  <p className="text-center py-4">Loading jurisdiction-specific tips...</p>
                ) : (
                  <div className="space-y-3">
                    {jurisdictionTips ? (
                      <div dangerouslySetInnerHTML={{ __html: jurisdictionTips.replace(/\n/g, '<br/>') }} />
                    ) : (
                      <>
                        <p>• Replace all bracketed text [LIKE THIS] with your specific information</p>
                        <p>• Use formal language and avoid contractions</p>
                        <p>• State facts clearly and concisely</p>
                        <p>• Number paragraphs for easier reference</p>
                        <p>• Include only relevant information that supports your request</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mt-6">
            <h3 className="font-semibold mb-3">Document Structure</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start">
                <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs mr-2 mt-0.5">1</div>
                <span>Caption/Header - Court information and parties</span>
              </li>
              <li className="flex items-start">
                <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs mr-2 mt-0.5">2</div>
                <span>Title - Type of document and what you're requesting</span>
              </li>
              <li className="flex items-start">
                <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs mr-2 mt-0.5">3</div>
                <span>Introduction - Brief overview of who you are and what you want</span>
              </li>
              <li className="flex items-start">
                <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs mr-2 mt-0.5">4</div>
                <span>Body - Facts, arguments, and legal basis for your request</span>
              </li>
              <li className="flex items-start">
                <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs mr-2 mt-0.5">5</div>
                <span>Conclusion - Restate what you want the court to do</span>
              </li>
              <li className="flex items-start">
                <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs mr-2 mt-0.5">6</div>
                <span>Date and Signature - Your information and signature line</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentEditorPage;
