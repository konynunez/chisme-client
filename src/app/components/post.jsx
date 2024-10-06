"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Post({ id }) {
  // Fetch the specific post from the API
  const fetchPost = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`
    );
    // Filter the post by id
    const post = data.filter((elm) => elm.id == id);
    return post[0];
  };

  // React Query to fetch post data
  const {
    data: postData,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: fetchPost,
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Data stays in the cache for 10 minutes
  });

  // Display loading state
  if (isLoading) return <div className="text-center text-white">Loading...</div>;
  // Display error state
  if (isError)
    return <div className="text-center text-red-500">Error... {error.message}</div>;

  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center md:flex-row">
          <div className="mt-6 md:ml-8 md:mt-0">
            {/* Display Post Title */}
            <h1 className="text-3xl font-bold text-gray-900">
              {postData?.title}
            </h1>
            {/* Display Post Content */}
            <p className="mt-4 text-gray-700">{postData?.content}</p>
            {/* Display Timestamp */}
            <p className="mt-4 text-gray-500 text-sm">
              Posted on: {new Date(postData?.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
