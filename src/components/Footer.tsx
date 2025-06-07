const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 py-6 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              © {currentYear} LegalMotion Pro. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Not a substitute for legal advice. Consult with a licensed attorney for legal matters.
            </p>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-600 hover:text-blue-700">Terms of Service</a>
            <a href="#" className="text-sm text-gray-600 hover:text-blue-700">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-600 hover:text-blue-700">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
