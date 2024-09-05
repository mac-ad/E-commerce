import { fetchTVCollection, Products } from "@/app/components/TvCollection";
import Spinner from "@/app/ui/Spinner";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import React from "react";

export default function SearchResult() {
  const {
    data: search,
    isLoading,
    isError,
  }: UseQueryResult<Products[], Error> = useQuery({
    queryKey: ["search"],
    queryFn: fetchTVCollection,
  });

  if (isLoading) {
    return (
      <div className="w-full bg-gray-100 p-3 min-h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (isError || !search) {
    return <div>Error fetching members</div>;
  }
  return (
    <>
      <div className="pt-[130px]">
        <p>All the search result will be viewed here</p>
      </div>
    </>
  );
}
