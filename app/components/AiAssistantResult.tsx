import React, { useState } from 'react';
import { FaRobot, FaUser, FaPaperPlane } from 'react-icons/fa';

interface AiAssistantData {
  response?: string;
  prompt?: string;
  candidates?: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
      role: string;
    };
    finishReason: string;
  }>;
  usageMetadata?: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
  };
  modelVersion?: string;
  // Add additional fields that might be in the response
  [key: string]: any;
}

interface AiAssistantResultProps {
  data: AiAssistantData;
  onNewMessage?: (message: string) => void;
}

export default function AiAssistantResult({ data, onNewMessage }: AiAssistantResultProps) {
  const [newMessage, setNewMessage] = useState('');
  
  // Extract the response text from the data object
  const getResponseText = () => {
    // Check for Gemini API format
    if (data.candidates && data.candidates.length > 0 && 
        data.candidates[0].content && 
        data.candidates[0].content.parts && 
        data.candidates[0].content.parts.length > 0) {
      return data.candidates[0].content.parts[0].text;
    }
    
    // Check if response is directly available
    if (data.response) {
      return data.response;
    }
    
    // Check if response is in a nested object
    if (data.data && data.data.response) {
      return data.data.response;
    }
    
    // If we can't find a response field, stringify the entire object
    return JSON.stringify(data, null, 2);
  };
  
  // Extract the prompt from the data object
  const getPromptText = () => {
    if (data.prompt) {
      return data.prompt;
    }
    
    if (data.data && data.data.prompt) {
      return data.data.prompt;
    }
    
    return null;
  };
  
  const handleNewMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && onNewMessage) {
      onNewMessage(newMessage);
      setNewMessage('');
    }
  };
  
  const responseText = getResponseText();
  const promptText = getPromptText();
  
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg backdrop-blur-sm">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 flex items-center justify-center bg-blue-500/20 rounded-full mr-4">
          <FaRobot className="text-blue-500 text-xl" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">AI Assistant Response</h2>
          <p className="text-gray-400">Here's what the AI has to say</p>
        </div>
      </div>
      
      {promptText && (
        <div className="mb-4 bg-gray-700/50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <FaUser className="text-purple-400 mr-2" />
            <span className="text-gray-300">Your Question</span>
          </div>
          <p className="text-white">{promptText}</p>
        </div>
      )}
      
      <div className="bg-gray-700/50 p-4 rounded-lg mb-4">
        <div className="flex items-center mb-2">
          <FaRobot className="text-blue-400 mr-2" />
          <span className="text-gray-300">AI Response</span>
        </div>
        <div className="text-white whitespace-pre-wrap">
          {responseText}
        </div>
      </div>
      
      {data.modelVersion && (
        <div className="text-xs text-gray-500 mb-4">
          Model: {data.modelVersion}
        </div>
      )}
      
      {onNewMessage && (
        <form onSubmit={handleNewMessage} className="mt-4">
          <div className="flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ask a follow-up question..."
              className="flex-grow bg-gray-700 text-white rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FaPaperPlane />
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 