export interface ApiEndpoint {
  id: string;
  name: string;
  description: string;
  url: string;
  paramName: string;
  paramPlaceholder: string;
  icon?: string;
}

export const API_ENDPOINTS: ApiEndpoint[] = [
  {
    id: 'instagram',
    name: "Instagram Username Lookup",
    description: "Get Instagram profile information",
    url: "/api/instagram",
    paramName: "username",
    paramPlaceholder: "Enter Instagram username"
  },
  {
    id: 'spotify',
    name: "Spotify Song Downloader",
    description: "Download songs from Spotify",
    url: "https://aoi-spotify-eternal.eternalowner06.workers.dev",
    paramName: "name",
    paramPlaceholder: "Enter song name or Spotify URL"
  },
  {
    id: 'video',
    name: "Video Downloader",
    description: "Download videos from various platforms",
    url: "https://api-by.eternalowner06.workers.dev/",
    paramName: "url",
    paramPlaceholder: "Enter video URL"
  },
  {
    id: 'freefire',
    name: "Free Fire UID Info",
    description: "Get Free Fire user information",
    url: "https://tele-tool.vercel.app/",
    paramName: "ff?id=",
    paramPlaceholder: "Enter Free Fire UID"
  },
  {
    id: 'freefire-status',
    name: "Free Fire Account Status",
    description: "Check if Free Fire account is banned",
    url: "https://api-indcc.eternalowner06.workers.dev",
    paramName: "uid",
    paramPlaceholder: "Enter Free Fire UID"
  },
  {
    id: 'gemini',
    name: "Gemini AI Assistant",
    description: "AI-powered assistant using Gemini",
    url: "https://api-aiassistant.eternalowner06.workers.dev",
    paramName: "prompt",
    paramPlaceholder: "Enter your question"
  },
  {
    id: 'ipinfo',
    name: "IP Info",
    description: "Get information about an IP address",
    url: "https://ipinfoapibyeliminator.tiiny.io",
    paramName: "ip",
    paramPlaceholder: "Enter IP address"
  },
  {
    id: 'chatgpt',
    name: "ChatGPT-3",
    description: "Get answers from GPT-3",
    url: "https://api-gpt3-eternal.eternalowner06.workers.dev",
    paramName: "question",
    paramPlaceholder: "Enter your question"
  },
  {
    id: 'instagram-reels',
    name: "Instagram Reels Downloader",
    description: "Download Instagram reels",
    url: "https://ap-ig-eternal.aodousy.workers.dev",
    paramName: "url",
    paramPlaceholder: "Enter reel URL"
  },
  {
    id: 'carbon',
    name: "Carbon Image Generator",
    description: "Generate beautiful code images",
    url: "https://api-carbon.eternalowner06.workers.dev",
    paramName: "text",
    paramPlaceholder: "Enter code or text"
  },
  {
    id: 'call-tracer',
    name: "Call Tracer",
    description: "Trace phone number information",
    url: "https://api-calltracer-eternal.vercel.app/api",
    paramName: "number",
    paramPlaceholder: "Enter phone number"
  }
]; 