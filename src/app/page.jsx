"use client";

import Link from "next/link";
import { ChatBubbleLeftRightIcon, NewspaperIcon } from "@heroicons/react/24/solid"; 

export default function HomePage() {
  return (
    <div className="min-h-screen text-white bg-gradient-to-r from-rose-500 to-rose-700">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-5xl font-extrabold">Welcome to Chisme Social</h1>
        <p className="mt-4 text-xl">Catch up on the latest gossip and trending news!</p>
        <div className="mt-8 space-x-4">
          {/* Button to go to Posts page */}
          <Link href="/posts">
            <button className="px-6 py-3 bg-rose-600 text-white font-bold rounded-lg hover:bg-rose-500">
              <ChatBubbleLeftRightIcon className="w-6 h-6 mr-2 inline" />
              Explore Posts
            </button>
          </Link>
          {/* Button to go to News page */}
          <Link href="/news">
            <button className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400">
              <NewspaperIcon className="w-6 h-6 mr-2 inline" />
              Explore News
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
