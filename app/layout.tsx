import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DisclaimerPopup from './components/DisclaimerPopup';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Multi API Builder",
  description: "A collection of useful APIs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col relative overflow-hidden">
          <ParticleBackground />
          <main className="container mx-auto px-4 py-8 flex-grow relative z-10">
            {children}
          </main>
          <Footer />
          <DisclaimerPopup />
        </div>
      </body>
    </html>
  );
}
