'use client'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

export const fetchProductById = async(id:string| string[])=>{
    const data = await fetch(`/api/products/${id}`);
    if(!data.ok){
        throw new Error("Something Wrong");
    }
    return data.json();
}

export default function ProductById() {
    const params = useParams();
    console.log(params.id)
    const fetchProductById = async(id:string | string[]) =>{
        const data = await fetch(`/api/products/${id}`)

        if(!data.ok){
            throw new Error("Something went wrong");
        }

        const response = await data.json();
        console.log(response);
        return response;
    }
    useEffect(()=>{
        fetchProductById(params.id)
        console.log(fetchProductById(params.id))
    },[])
    
    console.log(params.id)
  return (
    <div className='pt-[130px] bg-white'>product by id page</div>
  )
}
