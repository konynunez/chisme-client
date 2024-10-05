"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";  

export default function Home() {
  // Function to fetch posts from the server
  const fetchPosts = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`);
    return data;
  };

  // Use React Query to fetch the posts
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  // Handle loading and error states
  if (isLoading) return <div>Loading posts...</div>;
  if (isError) return <div>Error fetching posts: {error.message}</div>;

  // Render posts with links to their individual page
  return (
    <div>
      <h2>Post List</h2>
      <ul>
        {data.map((post) => (
          <li key={post.id}>
            {/* Link to the dynamic post page */}
            <Link href={`/posts/${post.id}`}>
              {post.content}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
