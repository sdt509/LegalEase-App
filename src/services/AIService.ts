// Remove OpenAI import and direct initialization
// import OpenAI from 'openai';
import axios from 'axios'; // Make sure axios is installed (npm install axios or yarn add axios)

// // Initialize the OpenAI client - THIS WILL BE REMOVED
// const openai = new OpenAI({
//   apiKey: 'dummy-key-replace-in-production', // Replace with actual key in production
//   dangerouslyAllowBrowser: true // This should be handled properly in production
// });

export interface DocumentGenerationParams {
  jurisdiction: string;
  documentType: string;
  motionType?: string; // Added for specific motion type
  caseNumber?: string;
  plaintiffName?: string;
  defendantName?: string;
  filingParty?: string;
  caseDetails?: string;
  reliefSought?: string;
  legalBasis?: string;
  facts?: string;
  additionalInfo?: string;
}

// Helper function to construct the prompt (remains the same)
const constructPrompt = (params: DocumentGenerationParams): string => {
  let prompt = `Draft a ${params.documentType} for the jurisdiction of ${params.jurisdiction}.`;
  if (params.motionType) {
    prompt += ` The specific type of motion is: ${params.motionType}.`;
  }
  if (params.caseNumber) {
    prompt += `\nCase Number: ${params.caseNumber}`;
  }
  if (params.plaintiffName) {
    prompt += `\nPlaintiff: ${params.plaintiffName}`;
  }
  if (params.defendantName) {
    prompt += `\nDefendant: ${params.defendantName}`;
  }
  if (params.filingParty) {
    prompt += `\nFiling Party: ${params.filingParty}`;
  }
  if (params.caseDetails) {
    prompt += `\nCase Details: ${params.caseDetails}`;
  }
  if (params.reliefSought) {
    prompt += `\nRelief Sought: ${params.reliefSought}`;
  }
  if (params.legalBasis) {
    prompt += `\nLegal Basis: ${params.legalBasis}`;
  }
  if (params.facts) {
    prompt += `\nRelevant Facts: ${params.facts}`;
  }
  if (params.additionalInfo) {
    prompt += `\nAdditional Information: ${params.additionalInfo}`;
  }
  prompt += "\n\nPlease ensure the document is formatted correctly with appropriate headings, sections, and legal language suitable for a pro se litigant.";
  return prompt;
};

export const generateDocumentContent = async (params: DocumentGenerationParams): Promise<string> => {
  try {
    const prompt = constructPrompt(params);

    // Instead of calling OpenAI directly, call your Vercel Function proxy
    const response = await axios.post('/api/ai-proxy', {
      // The body of this request should match what your ai-proxy.ts expects.
      // Based on the ai-proxy.ts, it expects a 'data' field which contains the actual request body for the AI service.
      // We'll send the prompt and model details, similar to how openai.chat.completions.create would structure it.
      data: {
        model: "gpt-4-turbo", // Or your desired model
        messages: [
          {
            role: "system",
            content: "You are an expert legal document drafter specializing in creating court documents for pro se litigants. Format documents according to court rules with proper structure, headings, and legal language."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7, // Or your desired temperature
        // Add any other parameters the AI service API supports and you want to control from the frontend
      }
    });

    // Assuming your proxy returns the AI's response data directly,
    // and the AI's response structure is { choices: [{ message: { content: "..." } }] }
    // If your proxy transforms the response, adjust this accordingly.
    // If your proxy returns the direct 'message.content', then it would just be response.data
    if (response.data && response.data.choices && response.data.choices[0] && response.data.choices[0].message) {
      return response.data.choices[0].message.content || '';
    }
    // If the proxy sends back just the content string directly:
    // return response.data || ''; 
    // You might need to adjust this based on the exact structure your proxy returns.
    // For the provided ai-proxy.ts, it returns aiServiceResponse.data, which should be the full AI response.
    
    // Fallback if the expected structure isn't found
    console.warn('Unexpected response structure from AI proxy:', response.data);
    return '';

  } catch (error) {
    console.error('Error generating document via proxy:', error);
    // It's good practice to check if the error is an Axios error and has a response
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`Failed to generate document content: ${error.response.data.error || error.message}`);
    }
    throw new Error('Failed to generate document content. Please try again.');
  }
};

// Remove the entire second declaration of constructPrompt below this line
// const constructPrompt = (params: DocumentGenerationParams): string => {  <-- REMOVE FROM HERE
//   const { 
//     jurisdiction, 
//     documentType, 
//     motionType,
//     caseNumber,
//     plaintiffName,
//     defendantName,
//     filingParty,
//     caseDetails,
//     reliefSought,
//     legalBasis,
//     facts,
//     additionalInfo
//   } = params;

// }; <-- TO HERE (or wherever the second function declaration ends)

export const getJurisdictionSpecificTips = async (jurisdiction: string, documentType: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: "You are a legal expert specializing in court procedures and document formatting. Provide concise, practical tips for document preparation."
        },
        {
          role: "user",
          content: `Provide 5 specific tips for preparing a ${documentType} in ${jurisdiction}. Focus on formatting requirements, common pitfalls to avoid, and jurisdiction-specific rules. Keep each tip under 2 sentences.`
        }
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content || '';
  } catch (error) {
    console.error('Error getting jurisdiction tips:', error);
    return 'Unable to load jurisdiction-specific tips. Please consult local court rules for guidance.';
  }
};
