import localFont from "next/font/local";
import "./globals.css";

import { Providers } from "@/providers";
import {
  HomeIcon,
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

// Import local fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadata for the project
export const metadata = {
  title: "Chisme Social",
  description: "Stay updated with the latest gossips and social media buzz!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-white shadow-lg">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/">
                  <div className="flex items-center text-xl font-bold text-gray-800 hover:text-gray-900">
                    <ChatBubbleLeftRightIcon className="w-8 h-8 mr-2 text-rose-500" />
                    Chisme Social
                  </div>
                </Link>
              </div>

              <div className="flex items-center space-x-4">
                <Link href="/">
                  <div className="flex items-center text-gray-600 hover:text-gray-900">
                    <HomeIcon className="w-6 h-6 mr-1" />
                    Home
                  </div>
                </Link>

                <Link href="/posts">
                  <div className="flex items-center text-gray-600 hover:text-gray-900">
                    <ChatBubbleLeftRightIcon className="w-6 h-6 mr-1" />
                    Posts
                  </div>
                </Link>

                <Link href="/news">
                  <div className="flex items-center text-gray-600 hover:text-gray-900">
                    <NewspaperIcon className="w-6 h-6 mr-1" />
                    News
                  </div>
                </Link>

                <Link href="/profile">
                  <div className="flex items-center text-gray-600 hover:text-gray-900">
                    <UserCircleIcon className="w-6 h-6 mr-1" />
                    Profile
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="min-h-screen">
          <Providers>{children}</Providers>
        </main>

        {/* Footer */}
        <footer className="py-6 mt-12 text-center bg-rose-700">
          <p className="text-sm text-gray-200">
            © Chisme Social || Panoramix 2024 || All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
