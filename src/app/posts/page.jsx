"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Page({ params }) {
  const fetchPostById = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/`);  
  };
  console.log(data);
  const post =data.filter((elm) => elm.id == params.id);
  console.log(post);
  return post[0];
  // Using React Query to fetch the specific post
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["post"],  // Unique query key based on the post ID
    queryFn: fetchPostById,  // Call the function to fetch the post by ID      
    });

  if (isLoading) return <div>Loading....</div>;
  if (usError)
    return <div>Error...{error.message} Our servers are having trouble </div>

  return <div>{data?.title}</div>;
}