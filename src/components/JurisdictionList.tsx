import { MapPin } from 'lucide-react';

// Combined list of states and federal district courts
const jurisdictions = {
  states: [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 
    'Wisconsin', 'Wyoming', 'District of Columbia'
  ],
  federal: [
    // Alabama
    'U.S. District Court - Northern District of Alabama',
    'U.S. District Court - Middle District of Alabama',
    'U.S. District Court - Southern District of Alabama',
    // Alaska
    'U.S. District Court - District of Alaska',
    // Arizona
    'U.S. District Court - District of Arizona',
    // Arkansas
    'U.S. District Court - Eastern District of Arkansas',
    'U.S. District Court - Western District of Arkansas',
    // California
    'U.S. District Court - Central District of California',
    'U.S. District Court - Eastern District of California',
    'U.S. District Court - Northern District of California',
    'U.S. District Court - Southern District of California',
    // Colorado
    'U.S. District Court - District of Colorado',
    // Connecticut
    'U.S. District Court - District of Connecticut',
    // Delaware
    'U.S. District Court - District of Delaware',
    // District of Columbia
    'U.S. District Court - District of Columbia',
    // Florida
    'U.S. District Court - Middle District of Florida',
    'U.S. District Court - Northern District of Florida',
    'U.S. District Court - Southern District of Florida',
    // Georgia
    'U.S. District Court - Middle District of Georgia',
    'U.S. District Court - Northern District of Georgia',
    'U.S. District Court - Southern District of Georgia',
    // Hawaii
    'U.S. District Court - District of Hawaii',
    // Idaho
    'U.S. District Court - District of Idaho',
    // Illinois
    'U.S. District Court - Central District of Illinois',
    'U.S. District Court - Northern District of Illinois',
    'U.S. District Court - Southern District of Illinois',
    // Indiana
    'U.S. District Court - Northern District of Indiana',
    'U.S. District Court - Southern District of Indiana',
    // Iowa
    'U.S. District Court - Northern District of Iowa',
    'U.S. District Court - Southern District of Iowa',
    // Kansas
    'U.S. District Court - District of Kansas',
    // Kentucky
    'U.S. District Court - Eastern District of Kentucky',
    'U.S. District Court - Western District of Kentucky',
    // Louisiana
    'U.S. District Court - Eastern District of Louisiana',
    'U.S. District Court - Middle District of Louisiana',
    'U.S. District Court - Western District of Louisiana',
    'U.S. District Court - 10th District Court of Louisiana Natchitoches',
    // Maine
    'U.S. District Court - District of Maine',
    // Maryland
    'U.S. District Court - District of Maryland',
    // Massachusetts
    'U.S. District Court - District of Massachusetts',
    // Michigan
    'U.S. District Court - Eastern District of Michigan',
    'U.S. District Court - Western District of Michigan',
    // Minnesota
    'U.S. District Court - District of Minnesota',
    // Mississippi
    'U.S. District Court - Northern District of Mississippi',
    'U.S. District Court - Southern District of Mississippi',
    // Missouri
    'U.S. District Court - Eastern District of Missouri',
    'U.S. District Court - Western District of Missouri',
    // Montana
    'U.S. District Court - District of Montana',
    // Nebraska
    'U.S. District Court - District of Nebraska',
    // Nevada
    'U.S. District Court - District of Nevada',
    // New Hampshire
    'U.S. District Court - District of New Hampshire',
    // New Jersey
    'U.S. District Court - District of New Jersey',
    // New Mexico
    'U.S. District Court - District of New Mexico',
    // New York
    'U.S. District Court - Eastern District of New York',
    'U.S. District Court - Northern District of New York',
    'U.S. District Court - Southern District of New York',
    'U.S. District Court - Western District of New York',
    // North Carolina
    'U.S. District Court - Eastern District of North Carolina',
    'U.S. District Court - Middle District of North Carolina',
    'U.S. District Court - Western District of North Carolina',
    // North Dakota
    'U.S. District Court - District of North Dakota',
    // Ohio
    'U.S. District Court - Northern District of Ohio',
    'U.S. District Court - Southern District of Ohio',
    // Oklahoma
    'U.S. District Court - Eastern District of Oklahoma',
    'U.S. District Court - Northern District of Oklahoma',
    'U.S. District Court - Western District of Oklahoma',
    // Oregon
    'U.S. District Court - District of Oregon',
    // Pennsylvania
    'U.S. District Court - Eastern District of Pennsylvania',
    'U.S. District Court - Middle District of Pennsylvania',
    'U.S. District Court - Western District of Pennsylvania',
    // Puerto Rico
    'U.S. District Court - District of Puerto Rico',
    // Rhode Island
    'U.S. District Court - District of Rhode Island',
    // South Carolina
    'U.S. District Court - District of South Carolina',
    // South Dakota
    'U.S. District Court - District of South Dakota',
    // Tennessee
    'U.S. District Court - Eastern District of Tennessee',
    'U.S. District Court - Middle District of Tennessee',
    'U.S. District Court - Western District of Tennessee',
    // Texas
    'U.S. District Court - Eastern District of Texas',
    'U.S. District Court - Northern District of Texas',
    'U.S. District Court - Southern District of Texas',
    'U.S. District Court - Western District of Texas',
    // Utah
    'U.S. District Court - District of Utah',
    // Vermont
    'U.S. District Court - District of Vermont',
    // Virginia
    'U.S. District Court - Eastern District of Virginia',
    'U.S. District Court - Western District of Virginia',
    // Washington
    'U.S. District Court - Eastern District of Washington',
    'U.S. District Court - Western District of Washington',
    // West Virginia
    'U.S. District Court - Northern District of West Virginia',
    'U.S. District Court - Southern District of West Virginia',
    // Wisconsin
    'U.S. District Court - Eastern District of Wisconsin',
    'U.S. District Court - Western District of Wisconsin',
    // Wyoming
    'U.S. District Court - District of Wyoming',
    // Special courts
    'U.S. Court of Federal Claims',
    'U.S. Tax Court',
    'U.S. Court of International Trade',
    'U.S. Bankruptcy Court'
  ]
};

interface JurisdictionListProps {
  searchTerm: string;
  onSelectJurisdiction: (jurisdiction: string) => void;
}

const JurisdictionList = ({ searchTerm, onSelectJurisdiction }: JurisdictionListProps) => {
  // Function to filter jurisdictions based on search term
  const getFilteredJurisdictions = () => {
    const allJurisdictions = [...jurisdictions.states, ...jurisdictions.federal];
    if (!searchTerm) return allJurisdictions;
    
    return allJurisdictions.filter(jurisdiction => 
      jurisdiction.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredJurisdictions = getFilteredJurisdictions();
  
  // Determine if the jurisdiction is federal
  const isFederal = (jurisdiction: string) => jurisdiction.startsWith('U.S.');
  
  return (
    <div>
      {filteredJurisdictions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No jurisdictions match your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredJurisdictions.map((jurisdiction) => (
            <button
              key={jurisdiction}
              className="card flex items-center gap-3 hover:border-blue-500 cursor-pointer text-left"
              onClick={() => onSelectJurisdiction(jurisdiction)}
            >
              <MapPin className={`h-5 w-5 shrink-0 ${isFederal(jurisdiction) ? 'text-purple-700' : 'text-blue-700'}`} />
              <span className="text-sm">{jurisdiction}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default JurisdictionList;
