import { ApiEndpoint } from '../types/api';

export async function callApi(endpoint: ApiEndpoint, param: string): Promise<any> {
  let url = '';
  let responseType: 'json' | 'blob' = 'json';

  try {
    // Construct the URL properly based on the endpoint format
    if (endpoint.name.toLowerCase().includes('video downloader')) {
      // For video downloads, use proxy to avoid CORS issues
      const videoApiUrl = `${endpoint.url}?${endpoint.paramName}=${param}`;
      url = `/api/proxy?url=${encodeURIComponent(videoApiUrl)}`;
    } else if (endpoint.name.toLowerCase().includes('spotify song downloader')) {
      // For Spotify song downloads, use proxy to avoid CORS issues
      const isUrl = param.startsWith('http');
      const spotifyApiUrl = `${endpoint.url}?${isUrl ? 'url' : 'name'}=${encodeURIComponent(param)}`;
      url = `/api/proxy?url=${encodeURIComponent(spotifyApiUrl)}`;
    } else if (endpoint.name.toLowerCase().includes('free fire uid info')) {
      // For Free Fire UID Info, use proxy to avoid CORS issues
      const freeFireApiUrl = `${endpoint.url}ff?id=${param}`;
      url = `/api/proxy?url=${encodeURIComponent(freeFireApiUrl)}`;
    } else if (endpoint.name.toLowerCase().includes('ip info')) {
      // For IP Info, use proxy to avoid CORS issues
      const ipApiUrl = `${endpoint.url}?${endpoint.paramName}=${param}`;
      url = `/api/proxy?url=${encodeURIComponent(ipApiUrl)}`;
    } else if (endpoint.name.toLowerCase().includes('instagram reels downloader')) {
      // For Instagram reel downloads, use proxy to avoid CORS issues
      const reelApiUrl = `${endpoint.url}?${endpoint.paramName}=${param}`;
      url = `/api/proxy?url=${encodeURIComponent(reelApiUrl)}`;
    } else if (endpoint.name.toLowerCase().includes('carbon image generator')) {
      // For Carbon Image Generator, use proxy to avoid CORS issues
      const carbonApiUrl = `${endpoint.url}?${endpoint.paramName}=${param}`;
      url = `/api/proxy?url=${encodeURIComponent(carbonApiUrl)}`;
      
      // Set responseType to 'blob' for binary responses
      responseType = 'blob';
    } else if (endpoint.name.toLowerCase().includes('call tracer')) {
      // For phone number lookups, use proxy to avoid CORS issues
      const phoneApiUrl = `${endpoint.url}?${endpoint.paramName}=${param}`;
      url = `/api/proxy?url=${encodeURIComponent(phoneApiUrl)}`;
    } else if (endpoint.name.toLowerCase().includes('free fire account status')) {
      // For Free Fire Account Status, use proxy to avoid CORS issues
      const ffStatusApiUrl = `${endpoint.url}?${endpoint.paramName}=${param}`;
      url = `/api/proxy?url=${encodeURIComponent(ffStatusApiUrl)}`;
    } else if (endpoint.name.toLowerCase().includes('gemini ai assistant') || 
               endpoint.name.toLowerCase().includes('chatgpt-3')) {
      // For AI assistants, use proxy to avoid CORS issues
      const aiApiUrl = `${endpoint.url}?${endpoint.paramName}=${encodeURIComponent(param)}`;
      // Use question parameter for ChatGPT-3 queries
      if (endpoint.name.toLowerCase().includes('chatgpt-3')) {
        // Add context parameter to maintain conversation flow
        url = `/api/proxy?url=${encodeURIComponent(endpoint.url + '?question=' + encodeURIComponent(param) + '&context=chat')}`;
      } else {
        url = `/api/proxy?url=${encodeURIComponent(aiApiUrl)}`;
      }
    } else {
      // Original logic for other endpoints (including Instagram)
      if (endpoint.url.includes('?')) {
        // If the URL already contains query parameters
        url = `${endpoint.url}${encodeURIComponent(param)}`;
      } else {
        // Otherwise, construct the query parameter
        url = `${endpoint.url}?${endpoint.paramName}=${encodeURIComponent(param)}`;
      }
    }
    
    console.log('Calling API:', url); // For debugging
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': responseType === 'blob' ? '*/*' : 'application/json',
      },
      cache: 'no-cache',
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API call failed with status: ${response.status} - ${errorText}`);
    }

    // Handle binary responses
    if (responseType === 'blob') {
      return await response.blob();
    }

    // Handle JSON responses
    const data = await response.json();
    
    // For AI assistants, include the prompt in the response data
    if (endpoint.name.toLowerCase().includes('gemini ai assistant') || 
        endpoint.name.toLowerCase().includes('chatgpt-3')) {
      console.log('AI Response data:', data); // Debug log
      
      // Handle empty or error responses from AI
      if (!data || typeof data !== 'object') {
        return {
          response: "I apologize, but I couldn't generate a response at the moment. Please try again or rephrase your question.",
          prompt: param
        };
      }

      // Handle empty response string
      if (data.response === '') {
        return {
          response: "I apologize, but I need more context. Could you please rephrase your question or provide more details?",
          prompt: param
        };
      }

      // If we have a message field, it might be an error message
      if (data.message && typeof data.message === 'string') {
        if (data.message.toLowerCase().includes('error')) {
          return {
            response: "I apologize, but there was an error processing your request. Please try again or rephrase your question.",
            prompt: param
          };
        }
        // If it's not an error message, it might be the actual response
        return {
          response: data.message,
          prompt: param
        };
      }

      // Return the response from whichever field contains it
      return {
        response: data.response || data.answer || data.message || "I apologize, but I couldn't understand that. Could you please rephrase your question?",
        prompt: param
      };
    }
    
    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
} 