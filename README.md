# Multi API Builder

A modern web application that provides a unified interface to access multiple API services. Built with Next.js, React, and Tailwind CSS, featuring a beautiful UI with glassmorphism effects and interactive particles background.

## Features

- **Instagram Username Lookup**: Get detailed Instagram profile information
- **Spotify Song Downloader**: Download songs using names or Spotify URLs
- **Video Downloader**: Download videos from various platforms
- **Free Fire Tools**:
  - UID Info: Get Free Fire user information
  - Account Status: Check if accounts are banned
- **AI Assistants**:
  - Gemini AI: Powered by Google's Gemini
  - ChatGPT-3: Get answers using GPT-3
- **Instagram Reels Downloader**: Download Instagram reels
- **Carbon Image Generator**: Create beautiful code images
- **Call Tracer**: Get phone number information
- **IP Info**: Get detailed IP address information

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS with glassmorphism effects
- **UI Components**: Custom React components
- **Background**: Interactive particles using tsParticles
- **API Integration**: Custom proxy setup to handle CORS

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/multiapibuild.git
cd multiapibuild
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
multiapibuild/
├── app/
│   ├── api/           # API routes
│   ├── components/    # React components
│   ├── types/        # TypeScript types
│   ├── utils/        # Utility functions
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Main page
├── public/           # Static files
└── README.md        # This file
```

## Components

- **ApiCard**: Reusable card component for each API service
- **ParticleBackground**: Interactive background animation
- **Modal**: Reusable modal for displaying results
- **Result Components**: Specialized components for each API response type

## API Integration

The project uses a proxy setup to handle CORS issues and maintain security. Each API endpoint is configured in `types/api.ts` and processed through `utils/api.ts`.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Disclaimer

This project is for educational purposes only. All APIs used in this project are sourced from third parties. We are not responsible for any misuse of the services.

## License

MIT License - feel free to use this project for your own purposes.

---

Made with ❤️ by [rootds-coder](https://github.com/rootds-coder)
