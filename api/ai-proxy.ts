import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Ensure this is the actual URL of the AI service you want to proxy to
  const AI_SERVICE_URL = 'YOUR_ACTUAL_AI_SERVICE_ENDPOINT_URL';
  const API_KEY = process.env.AI_SERVICE_API_KEY;

  if (request.method !== 'POST') {
    response.setHeader('Allow', ['POST']);
    return response.status(405).end('Method Not Allowed');
  }

  if (!API_KEY) {
    console.error('AI_SERVICE_API_KEY is not set in environment variables.');
    return response.status(500).json({ error: 'Internal Server Error: API key not configured.' });
  }

  try {
    const { data: requestBody } = request.body;
    
    const aiServiceResponse = await axios.post(AI_SERVICE_URL, requestBody, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        // Include any other headers the target AI service expects
      },
    });

    response.status(200).json(aiServiceResponse.data);
  } catch (error: any) {
    console.error('Error proxying request to AI service:', error.message);
    if (error.response) {
      // Forward the status and error from the AI service if available
      return response.status(error.response.status).json(error.response.data);
    } else {
      // Generic server error if the AI service didn't respond
      return response.status(500).json({ error: 'Failed to proxy request to AI service.' });
    }
  }
}