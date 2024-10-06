"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import axios from "axios";
import { NewspaperIcon } from "@heroicons/react/24/solid";

export default function Posts() {
  // Fetch posts from API
  const fetchPosts = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`  // Adjusted to fetch posts
    );
    return data;
  };

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["posts"], // Changed from movies to posts
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Data stays in the cache for 10 minutes
  });

  if (isLoading)
    return <div className="text-center text-white">Loading....</div>;
  if (isError)
    return (
      <div className="text-center text-red-500">
        Error... {error.message}. Our servers are having trouble
      </div>
    );

  return (
    <div className="min-h-screen text-white bg-gradient-to-r from-rose-500 to-rose-700">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 text-center h-80">
        <h1 className="text-5xl font-extrabold drop-shadow-lg">
          Explore Our Gossip Collection
        </h1>
        <p className="max-w-2xl mt-4 text-xl leading-relaxed drop-shadow-md">
          Dive into our curated collection of the latest and juiciest gossip!
        </p>
      </section>

      {/* Posts Listing */}
      <section className="px-6 py-12 bg-black">
        <h2 className="mb-8 text-4xl font-bold text-center text-yellow-400">
          Available Gossips
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((post) => (
            <div
              key={post.id}
              className="p-4 text-black transition transform bg-white rounded-lg shadow-lg hover:scale-105"
            >
              <NewspaperIcon className="w-8 h-8 text-rose-500 mb-2" />
              <div className="mt-4">
                <h3 className="text-2xl font-bold">{post.title}</h3>
                <p className="mt-2 text-sm">{post.content.slice(0, 100)}...</p>
                <Link
                  href={`/post/${post.id}`}  // Dynamic route for posts
                  className="block mt-2 font-semibold text-rose-600 hover:underline"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
