"use client"; 

import { useQuery } from '@tanstack/react-query'; 
import Link from "next/link"; 
import axios from "axios";  
import { NewspaperIcon } from "@heroicons/react/24/solid";  

// Fetch news articles from the News API
const fetchNews = async () => {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/news/celebrity`);
    return data;  
  } catch (error) {
    console.error('Error fetching news articles:', error.response ? error.response.data : error.message); // Log detailed error
    throw new Error('Error fetching news articles');  
  }
};

// Component definition
export default function NewsPage() {
  // React Query hook to fetch data
  const { data: news, isLoading, isError, error } = useQuery({
    queryKey: ["news"],  
    queryFn: fetchNews,  
  });

  // Loading state
  if (isLoading) {
    return <div className="text-center text-white">Loading news...</div>;
  }

  // Error state
  if (isError) {
    return <div className="text-center text-red-500">{error.message}</div>; // Display the error message
  }

  // Handle no news articles
  if (!news || news.length === 0) {
    return <div className="text-center text-white">No news articles found.</div>;
  }

  // Render the news articles
  return (
    <div className="min-h-screen text-white bg-gradient-to-r from-rose-500 to-rose-700">
      {/* Hero Section */}
      <section className="px-6 py-12">
        <h2 className="text-4xl font-bold text-center text-yellow-400">Celebrity News</h2>
        <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Map over news articles and display them */}
          {news.map((article, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow-lg">
              <NewspaperIcon className="w-8 h-8 text-rose-500 mb-2" aria-hidden="true" />
              <h3 className="text-2xl font-bold text-gray-900">{article.title}</h3>
              <p className="mt-2 text-gray-700">{article.description?.slice(0, 100)}...</p>
              <Link
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 text-rose-600 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
              >
                Read Full Article
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
