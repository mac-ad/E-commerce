"use client";
import { Products } from "@/app/components/TvCollection";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function GetResultBySearch() {
  const params = useParams();
  const [searchedResult, setSearchResult] = useState([]);
  console.log(params.searchText);

  useEffect(()=>{
    fetchProducts();
  }, [])
  const fetchProducts = async() =>{
    const data = await fetch('/api/products');
    if(!data.ok){
        throw new Error("Data is not okay");
    }
    const result = await data.json();
    return setSearchResult(result)
  }

  const result = searchedResult.map((result:Products)=> result)
  const searchedOutput = result.filter((output)=>output.name.toLowerCase().includes(params.searchText.toLowerCase()))
  console.log(searchedOutput)

  console.log(searchedResult)
//   const {
//     data: search,
//     isLoading,
//     isError,
//   }: UseQueryResult<Products[], Error> = useQuery({
//     queryKey: ["search"],
//     queryFn: fetchTVCollection,
//   });

//   if (isLoading) {
//     return (
//       <div className="w-full bg-gray-100 p-3 min-h-screen flex justify-center items-center">
//         <Spinner />
//       </div>
//     );
//   }

//   if (isError || !search) {
//     return <div>Error fetching members</div>;
//   }
  return (
    <>
      <div className="pt-[130px]">
        <p>All the search result will be viewed here</p>
      </div>
    </>
  );
}
