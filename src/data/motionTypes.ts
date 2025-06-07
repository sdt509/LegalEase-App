// Common motion types organized by jurisdiction categories
// These will be filtered and customized based on the selected jurisdiction

export interface MotionType {
  id: string;
  title: string;
  description: string;
  applicableJurisdictions: string[] | 'all'; // 'all' for universal motions
}

// Common motion types across jurisdictions
export const commonMotionTypes: MotionType[] = [
  {
    id: 'summary-judgment',
    title: 'Motion for Summary Judgment',
    description: 'Request the court to decide a case without a full trial when there are no disputed facts',
    applicableJurisdictions: 'all',
  },
  {
    id: 'dismiss',
    title: 'Motion to Dismiss',
    description: 'Request to dismiss all or part of a lawsuit for legal insufficiency',
    applicableJurisdictions: 'all',
  },
  {
    id: 'compel-discovery',
    title: 'Motion to Compel Discovery',
    description: 'Request the court to order the opposing party to provide requested information',
    applicableJurisdictions: 'all',
  },
  {
    id: 'continuance',
    title: 'Motion for Continuance',
    description: 'Request to postpone or reschedule a hearing, trial, or other proceeding',
    applicableJurisdictions: 'all',
  },
  {
    id: 'reconsideration',
    title: 'Motion for Reconsideration',
    description: 'Request the court to reconsider a prior decision or order',
    applicableJurisdictions: 'all',
  },
  {
    id: 'expedited-hearing',
    title: 'Motion for Expedited Hearing',
    description: 'Request to have a hearing scheduled sooner than normal procedures allow',
    applicableJurisdictions: 'all',
  },
  {
    id: 'ex-parte',
    title: 'Ex Parte Motion',
    description: 'Emergency motion that can be granted without waiting for a response from the other side',
    applicableJurisdictions: 'all',
  },
  {
    id: 'protective-order',
    title: 'Motion for Protective Order',
    description: 'Request protection from discovery or disclosure of certain information',
    applicableJurisdictions: 'all',
  },
  {
    id: 'sanctions',
    title: 'Motion for Sanctions',
    description: 'Request penalties against a party for violating court rules or procedures',
    applicableJurisdictions: 'all',
  },
  {
    id: 'default-judgment',
    title: 'Motion for Default Judgment',
    description: 'Request judgment when the opposing party fails to respond to a complaint',
    applicableJurisdictions: 'all',
  }
];

// State-specific motion types
export const stateSpecificMotionTypes: MotionType[] = [
  {
    id: 'anti-slapp',
    title: 'Anti-SLAPP Motion',
    description: 'Motion to strike a complaint that targets free speech on public issues',
    applicableJurisdictions: ['California', 'Texas', 'New York', 'Florida', 'Oregon', 'Washington'],
  },
  {
    id: 'demurrer',
    title: 'Demurrer',
    description: 'Challenge to the legal sufficiency of a complaint (similar to motion to dismiss)',
    applicableJurisdictions: ['California'],
  },
  {
    id: 'special-motion-to-strike',
    title: 'Special Motion to Strike',
    description: 'Seek dismissal of claims that arise from protected activity',
    applicableJurisdictions: ['California', 'Nevada', 'Oregon'],
  },
  {
    id: 'motion-in-limine',
    title: 'Motion in Limine',
    description: 'Request to exclude certain evidence before trial begins',
    applicableJurisdictions: 'all',
  },
  {
    id: 'rule-120-hearing',
    title: 'Rule 120 Hearing Motion',
    description: 'Request for hearing in foreclosure proceedings',
    applicableJurisdictions: ['Colorado'],
  }
];

// Federal-specific motion types
export const federalSpecificMotionTypes: MotionType[] = [
  {
    id: 'rule-12b6',
    title: 'Rule 12(b)(6) Motion to Dismiss',
    description: 'Motion to dismiss for failure to state a claim upon which relief can be granted',
    applicableJurisdictions: ['all'],
  },
  {
    id: 'summary-adjudication',
    title: 'Motion for Summary Adjudication',
    description: 'Request judgment on specific issues without resolving the entire case',
    applicableJurisdictions: ['all'],
  },
  {
    id: 'preliminary-injunction',
    title: 'Motion for Preliminary Injunction',
    description: 'Request court order requiring party to do or refrain from certain acts pending litigation',
    applicableJurisdictions: ['all'],
  },
  {
    id: 'tro',
    title: 'Motion for Temporary Restraining Order (TRO)',
    description: 'Request immediate but temporary order to prevent irreparable harm',
    applicableJurisdictions: ['all'],
  },
  {
    id: 'class-certification',
    title: 'Motion for Class Certification',
    description: 'Request to certify a lawsuit as a class action',
    applicableJurisdictions: ['all'],
  },
  {
    id: 'remand',
    title: 'Motion to Remand',
    description: 'Request to send case back to state court from federal court',
    applicableJurisdictions: ['all'],
  },
  {
    id: 'change-venue',
    title: 'Motion for Change of Venue',
    description: 'Request to transfer case to another district or division',
    applicableJurisdictions: ['all'],
  }
];

// Function to get motion types based on jurisdiction
export const getMotionTypesForJurisdiction = (jurisdiction: string): MotionType[] => {
  // Start with common motion types
  let motionTypes = [...commonMotionTypes];
  
  // Check if jurisdiction is federal
  const isFederal = jurisdiction.toLowerCase().includes('u.s.') || 
                    jurisdiction.toLowerCase().includes('district court');
  
  // Add federal-specific motion types for federal courts
  if (isFederal) {
    motionTypes = [...motionTypes, ...federalSpecificMotionTypes];
  } else {
    // For state courts, add applicable state-specific motion types
    const stateSpecificTypes = stateSpecificMotionTypes.filter(motion => 
      motion.applicableJurisdictions === 'all' || 
      (Array.isArray(motion.applicableJurisdictions) && 
        motion.applicableJurisdictions.some(j => jurisdiction.includes(j)))
    );
    motionTypes = [...motionTypes, ...stateSpecificTypes];
  }
  
  return motionTypes;
};
