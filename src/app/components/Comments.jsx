"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function Comments({ postId }) {
  const [comment, setComment] = useState("");

  const queryClient = useQueryClient();

  // Fetch comments for a specific post
  const fetchComments = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/comments`
    );
    console.log(res.data);
    return res.data;
  };

  // Fetch comments using useQuery
  const {
    data: comments,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: fetchComments,
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Data stays in the cache for 10 minutes
  });

  // Add a new comment using useMutation
  const addComment = async (newComment) => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/comments`,
      newComment
    );
  };

  const mutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      // Invalidate and refetch the comments query after posting
      queryClient.invalidateQueries(["comments", postId]);

      // Reset our comment state
      setComment("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment) return; // Don't submit incomplete comments

    const newComment = { content: comment };
    mutation.mutate(newComment);
  };

  if (isLoading)
    return <div className="text-center text-white">Loading comments...</div>;
  if (isError)
    return (
      <div className="text-center text-red-500">
        Error... {error.message}. Our servers are having trouble
      </div>
    );

  return (
    <div>
      <h2 className="py-3 mb-5 text-3xl border-b text-white">Comments</h2>

      <form onSubmit={handleSubmit} className="mb-6 text-black">
        <textarea
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
          rows={3}
          required
        />

        <button
          type="submit"
          className="px-4 py-2 text-white transition bg-rose-600 rounded-lg hover:bg-rose-500"  // Rose button
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Posting..." : "Post Comment"}
        </button>
      </form>
      {comments?.length > 0 ? (
        <ul className="space-y-4">
          {comments.map((comment, index) => (
            <li key={index} className="p-4 bg-rose-100 rounded-lg shadow">
              <p className="text-gray-600">{comment.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div>No comments yet. Be the first to comment!</div>
      )}
    </div>
  );
}
