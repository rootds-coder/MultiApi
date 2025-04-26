export interface ApiEndpoint {
  name: string;
  description: string;
  url: string;
  paramName: string;
  placeholder: string;
}

export const API_ENDPOINTS: ApiEndpoint[] = [
  {
    name: "Instagram Username Lookup",
    description: "Get Instagram profile information",
    url: "/api/instagram",
    paramName: "username",
    placeholder: "Enter Instagram username"
  },
  {
    name: "Spotify Song Downloader",
    description: "Download songs from Spotify",
    url: "https://aoi-spotify-eternal.eternalowner06.workers.dev",
    paramName: "name",
    placeholder: "Enter song name or Spotify URL"
  },
  {
    name: "Video Downloader",
    description: "Download videos from various platforms",
    url: "https://api-by.eternalowner06.workers.dev/",
    paramName: "url",
    placeholder: "Enter video URL"
  },
  {
    name: "Free Fire UID Info",
    description: "Get Free Fire user information",
    url: "https://tele-tool.vercel.app/",
    paramName: "ff?id=",
    placeholder: "Enter Free Fire UID"
  },
  {
    name: "Free Fire Account Status",
    description: "Check if Free Fire account is banned",
    url: "https://api-indcc.eternalowner06.workers.dev",
    paramName: "uid",
    placeholder: "Enter Free Fire UID"
  },
  {
    name: "Gemini AI Assistant",
    description: "AI-powered assistant using Gemini",
    url: "https://api-aiassistant.eternalowner06.workers.dev",
    paramName: "prompt",
    placeholder: "Enter your question"
  },
  {
    name: "IP Info",
    description: "Get information about an IP address",
    url: "https://ipinfoapibyeliminator.tiiny.io",
    paramName: "ip",
    placeholder: "Enter IP address"
  },
  {
    name: "ChatGPT-3",
    description: "Get answers from GPT-3",
    url: "https://api-gpt3-eternal.eternalowner06.workers.dev",
    paramName: "question",
    placeholder: "Enter your question"
  },
  {
    name: "Instagram Reels Downloader",
    description: "Download Instagram reels",
    url: "https://ap-ig-eternal.aodousy.workers.dev",
    paramName: "url",
    placeholder: "Enter reel URL"
  },
  {
    name: "Carbon Image Generator",
    description: "Generate beautiful code images",
    url: "https://api-carbon.eternalowner06.workers.dev",
    paramName: "text",
    placeholder: "Enter code or text"
  },
  {
    name: "Call Tracer",
    description: "Trace phone number information",
    url: "https://api-calltracer-eternal.vercel.app/api",
    paramName: "number",
    placeholder: "Enter phone number"
  }
]; 