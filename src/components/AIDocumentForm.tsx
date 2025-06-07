import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader, Sparkles } from 'lucide-react';
import { DocumentGenerationParams, generateDocumentContent } from '../services/AIService';

interface AIDocumentFormProps {
  jurisdiction: string;
  documentType: string;
  motionType?: string;
  onGenerateDocument: (content: string) => void;
}

const AIDocumentForm = ({ jurisdiction, documentType, motionType, onGenerateDocument }: AIDocumentFormProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = async (data: any) => {
    try {
      setIsGenerating(true);
      setError(null);
      
      const params: DocumentGenerationParams = {
        jurisdiction,
        documentType,
        motionType,
        caseNumber: data.caseNumber,
        plaintiffName: data.plaintiffName,
        defendantName: data.defendantName,
        filingParty: data.filingParty,
        reliefSought: data.reliefSought,
        legalBasis: data.legalBasis,
        facts: data.facts,
        additionalInfo: data.additionalInfo
      };
      
      const documentContent = await generateDocumentContent(params);
      onGenerateDocument(documentContent);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating the document');
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
      <div className="border-b border-gray-200 px-4 py-3 flex justify-between items-center bg-gray-50">
        <h2 className="font-medium flex items-center">
          <Sparkles className="w-4 h-4 mr-2 text-blue-600" />
          AI Document Generator
        </h2>
      </div>
      
      <div className="p-4">
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Case Number</label>
              <input
                type="text"
                {...register('caseNumber')}
                className="input-field"
                placeholder="e.g. CV-2025-12345"
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm font-medium">Filing Party</label>
              <select
                {...register('filingParty', { required: 'Filing party is required' })}
                className="input-field"
              >
                <option value="">Select...</option>
                <option value="Plaintiff">Plaintiff</option>
                <option value="Defendant">Defendant</option>
                <option value="Third Party">Third Party</option>
              </select>
              {errors.filingParty && (
                <p className="mt-1 text-sm text-red-600">{String(errors.filingParty.message)}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Plaintiff Name</label>
              <input
                type="text"
                {...register('plaintiffName')}
                className="input-field"
                placeholder="Full name of plaintiff"
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm font-medium">Defendant Name</label>
              <input
                type="text"
                {...register('defendantName')}
                className="input-field"
                placeholder="Full name of defendant"
              />
            </div>
          </div>
          
          {documentType === 'motion' && (
            <div>
              <label className="block mb-1 text-sm font-medium">Relief Sought</label>
              <input
                type="text"
                {...register('reliefSought', { required: 'Relief sought is required for motions' })}
                className="input-field"
                placeholder="e.g. Summary Judgment, Dismissal, etc."
              />
              {errors.reliefSought && (
                <p className="mt-1 text-sm text-red-600">{String(errors.reliefSought.message)}</p>
              )}
            </div>
          )}
          
          <div>
            <label className="block mb-1 text-sm font-medium">Legal Basis</label>
            <textarea
              {...register('legalBasis')}
              className="input-field min-h-[100px]"
              placeholder="Cite relevant laws, rules, statutes or precedents that support your position"
            ></textarea>
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium">Relevant Facts</label>
            <textarea
              {...register('facts')}
              className="input-field min-h-[100px]"
              placeholder="Describe the facts that support your document"
            ></textarea>
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium">Additional Information</label>
            <textarea
              {...register('additionalInfo')}
              className="input-field"
              placeholder="Any other details that should be included"
            ></textarea>
          </div>
          
          <button
            type="submit"
            disabled={isGenerating}
            className="btn-primary w-full flex items-center justify-center"
          >
            {isGenerating ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Generating Document...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Document with AI
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIDocumentForm;
