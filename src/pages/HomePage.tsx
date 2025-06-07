import { Link } from 'react-router-dom';
import { BookOpen, FileCheck, FilePlus2, FileText } from 'lucide-react';

const features = [
  {
    title: 'Court-Ready Documents',
    description: 'Create professionally formatted legal documents that adhere to court standards',
    icon: <FileText className="h-12 w-12 text-blue-700" />,
  },
  {
    title: 'Jurisdiction Compliance',
    description: 'Documents tailored to comply with your state\'s specific court requirements',
    icon: <BookOpen className="h-12 w-12 text-blue-700" />,
  },
  {
    title: 'Document Compilation',
    description: 'Organize multiple documents with proper labeling, exhibits, and table of contents',
    icon: <FileCheck className="h-12 w-12 text-blue-700" />,
  },
  {
    title: 'E-Filing Ready',
    description: 'Export court-ready PDFs formatted for electronic filing systems',
    icon: <FilePlus2 className="h-12 w-12 text-blue-700" />,
  },
];

const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
      <section className="text-center py-12 px-4 rounded-2xl bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Libre Baskerville, serif' }}>
          AI-Powered Legal Document Assistant
        </h1>
        <p className="text-xl max-w-3xl mx-auto mb-8">
          Create professional court documents, motions, and orders that comply with local court rules—without a lawyer.
        </p>
        <Link to="/jurisdiction" className="inline-block bg-white text-blue-800 font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
          Create Your First Document
        </Link>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-center mb-8" style={{ fontFamily: 'Libre Baskerville, serif' }}>
          How It Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-blue-800 font-bold">1</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Select Your Jurisdiction</h3>
            <p className="text-gray-600">Choose your state to ensure your documents follow local court rules</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-blue-800 font-bold">2</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Create Your Document</h3>
            <p className="text-gray-600">Fill in your information with AI guidance for proper legal formatting</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-blue-800 font-bold">3</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Export & File</h3>
            <p className="text-gray-600">Download court-ready PDFs formatted for electronic filing</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-center mb-8" style={{ fontFamily: 'Libre Baskerville, serif' }}>
          Features
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="card flex gap-4 items-start">
              <div className="shrink-0">{feature.icon}</div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center bg-gray-100 py-12 px-4 rounded-xl">
        <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Libre Baskerville, serif' }}>
          Ready to prepare your legal documents?
        </h2>
        <p className="max-w-2xl mx-auto mb-6 text-gray-600">
          Start creating professional court-ready documents that adhere to your local jurisdiction's standards.
        </p>
        <Link to="/jurisdiction" className="btn-primary">
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
