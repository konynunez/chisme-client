"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import axios from "axios";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid"; 

// Fetch posts from the API (Supabase)
const fetchPosts = async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`);
  return data;
};

export default function PostsPage() {
  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  // Loading state
  if (isLoading) return <div className="text-center text-white">Loading...</div>;

  // Error state
  if (isError) return <div className="text-center text-red-500">Error loading posts</div>;

  return (
    <div className="min-h-screen text-white bg-gradient-to-r from-rose-500 to-rose-700">
      <section className="px-6 py-12">
        <h2 className="text-4xl font-bold text-center text-yellow-400">All Gossip Posts</h2>
        <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post.id} className="p-4 bg-white rounded-lg shadow-lg">
              <ChatBubbleLeftRightIcon className="w-8 h-8 text-rose-500 mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">{post.content.slice(0, 50)}...</h3>
              <p className="mt-2 text-gray-700">{post.content.slice(0, 100)}...</p>
              <Link href={`/post/${post.id}`}>
                <span className="block mt-2 text-rose-600 hover:underline">Read More</span>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
