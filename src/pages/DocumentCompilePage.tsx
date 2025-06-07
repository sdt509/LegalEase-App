import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, FileCheck, FilePlus, FileText, MoveDown, MoveUp, Plus, Trash2 } from 'lucide-react';

const DocumentCompilePage = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([
    { id: '1', name: 'Motion for Summary Judgment', type: 'motion' },
    { id: '2', name: 'Declaration in Support of Motion', type: 'declaration' },
    { id: '3', name: 'Exhibit A - Contract', type: 'exhibit' },
    { id: '4', name: 'Exhibit B - Correspondence', type: 'exhibit' },
    { id: '5', name: 'Proposed Order', type: 'order' },
  ]);

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newDocuments = [...documents];
    const temp = newDocuments[index];
    newDocuments[index] = newDocuments[index - 1];
    newDocuments[index - 1] = temp;
    setDocuments(newDocuments);
  };

  const handleMoveDown = (index: number) => {
    if (index === documents.length - 1) return;
    const newDocuments = [...documents];
    const temp = newDocuments[index];
    newDocuments[index] = newDocuments[index + 1];
    newDocuments[index + 1] = temp;
    setDocuments(newDocuments);
  };

  const handleRemove = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const handleAddDocument = () => {
    navigate('/document-editor');
  };

  const handleBack = () => {
    navigate('/document-editor');
  };

  const handleGeneratePdf = () => {
    // In a real app, this would generate a compiled PDF with TOC
    alert('In the full version, this would generate a properly compiled PDF with table of contents, proper pagination, and bookmarks.');
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'motion':
        return <FilePlus className="w-5 h-5 text-blue-700" />;
      case 'declaration':
        return <FileText className="w-5 h-5 text-green-700" />;
      case 'order':
        return <FileCheck className="w-5 h-5 text-purple-700" />;
      case 'exhibit':
        return <FileText className="w-5 h-5 text-amber-700" />;
      default:
        return <FileText className="w-5 h-5 text-gray-700" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={handleBack}
        className="flex items-center text-blue-700 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to document editor
      </button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Libre Baskerville, serif' }}>
          Document Compilation
        </h1>
        <p className="text-gray-600">
          Organize, reorder, and compile your documents into a single filing with proper formatting.
        </p>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
        <div className="border-b border-gray-200 px-4 py-3 flex justify-between items-center bg-gray-50">
          <h2 className="font-medium">Document Order</h2>
          <button 
            onClick={handleAddDocument}
            className="flex items-center text-sm text-blue-700 hover:text-blue-800"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Document
          </button>
        </div>
        
        <div className="p-4">
          {documents.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No documents added yet. Click "Add Document" to create your first document.
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {documents.map((doc, index) => (
                <li key={doc.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="w-6 text-center text-gray-500 mr-2">{index + 1}.</span>
                    {getDocumentIcon(doc.type)}
                    <span className="ml-3">{doc.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      className={`p-1 ${index === 0 ? 'text-gray-300' : 'text-gray-500 hover:text-blue-700'}`}
                    >
                      <MoveUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMoveDown(index)}
                      disabled={index === documents.length - 1}
                      className={`p-1 ${index === documents.length - 1 ? 'text-gray-300' : 'text-gray-500 hover:text-blue-700'}`}
                    >
                      <MoveDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleRemove(doc.id)}
                      className="p-1 text-gray-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
        <h2 className="font-medium mb-4">Compilation Settings</h2>
        
        <div className="space-y-4">
          <div>
            <label className="flex items-center mb-2">
              <input type="checkbox" className="rounded text-blue-700 mr-2" defaultChecked />
              <span>Include Table of Contents</span>
            </label>
          </div>
          
          <div>
            <label className="flex items-center mb-2">
              <input type="checkbox" className="rounded text-blue-700 mr-2" defaultChecked />
              <span>Add Bates Numbering</span>
            </label>
          </div>
          
          <div>
            <label className="flex items-center mb-2">
              <input type="checkbox" className="rounded text-blue-700 mr-2" defaultChecked />
              <span>Include Certificate of Service</span>
            </label>
          </div>
          
          <div>
            <label className="block mb-2">Page Numbering Format</label>
            <select className="input-field">
              <option>Page X of Y</option>
              <option>X/Y</option>
              <option>Simple (X)</option>
              <option>None</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <button 
          onClick={handleBack}
          className="btn-secondary"
        >
          Back
        </button>
        <button 
          onClick={handleGeneratePdf}
          className="btn-primary flex items-center"
        >
          <Download className="w-4 h-4 mr-2" />
          Generate Court-Ready PDF
        </button>
      </div>
    </div>
  );
};

export default DocumentCompilePage;
