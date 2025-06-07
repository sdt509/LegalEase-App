import { createContext, useState, useContext, ReactNode } from 'react';

interface Document {
  id: string;
  type: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Exhibit {
  id: string;
  label: string;
  title: string;
  content: string;
  file?: File;
}

interface MotionType {
  id: string;
  title: string;
}

interface AppContextType {
  jurisdiction: string;
  setJurisdiction: (jurisdiction: string) => void;
  documents: Document[];
  addDocument: (document: Document) => void;
  updateDocument: (id: string, document: Partial<Document>) => void;
  removeDocument: (id: string) => void;
  exhibits: Exhibit[];
  addExhibit: (exhibit: Exhibit) => void;
  updateExhibit: (id: string, exhibit: Partial<Exhibit>) => void;
  removeExhibit: (id: string) => void;
  currentDocumentId: string | null;
  setCurrentDocumentId: (id: string | null) => void;
  motionType: MotionType | null;
  setMotionType: (motionType: MotionType | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [jurisdiction, setJurisdiction] = useState<string>('');
  const [documents, setDocuments] = useState<Document[]>([]);
  const [exhibits, setExhibits] = useState<Exhibit[]>([]);
  const [currentDocumentId, setCurrentDocumentId] = useState<string | null>(null);
  const [motionType, setMotionType] = useState<MotionType | null>(null);

  const addDocument = (document: Document) => {
    setDocuments((prev) => [...prev, document]);
  };

  const updateDocument = (id: string, document: Partial<Document>) => {
    setDocuments((prev) => 
      prev.map((doc) => (doc.id === id ? { ...doc, ...document, updatedAt: new Date() } : doc))
    );
  };

  const removeDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  const addExhibit = (exhibit: Exhibit) => {
    setExhibits((prev) => [...prev, exhibit]);
  };

  const updateExhibit = (id: string, exhibit: Partial<Exhibit>) => {
    setExhibits((prev) => 
      prev.map((ex) => (ex.id === id ? { ...ex, ...exhibit } : ex))
    );
  };

  const removeExhibit = (id: string) => {
    setExhibits((prev) => prev.filter((ex) => ex.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        jurisdiction,
        setJurisdiction,
        documents,
        addDocument,
        updateDocument,
        removeDocument,
        exhibits,
        addExhibit,
        updateExhibit,
        removeExhibit,
        currentDocumentId,
        setCurrentDocumentId,
        motionType,
        setMotionType,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
