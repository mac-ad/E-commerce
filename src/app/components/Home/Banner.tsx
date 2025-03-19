"use client"

import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useGetBannersQuery } from '@/features/api/bannerApiSlice';
import { setBanners } from '@/features/states/BannerSlice';
import { AppDispatch, RootState } from '@/store/store';
import Image from 'next/image';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Autoplay from "embla-carousel-autoplay"
import BannerSkeleton from '../skeleton/Banner';


const HomeBanner = () => {
    // const banners = useSelector((state: RootState) => state.banner);
    const {data:banners, isLoading, isError} = useGetBannersQuery();

    const plugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
      )
    const dispatch = useDispatch<AppDispatch>();
    // const banners = useSelector((state:RootState) => state.banner.data);


    return (
        <div className = "mx-auto p-4 flex justify-center items-center">
            {/* {
                banners?.map((banner) => (
                    <div key = {banner._id}>
                        <Image src={banner.image} alt="banner" width={100} height={100} />
                    </div>
                ))
            
            } */}
            {isLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                    <BannerSkeleton />
                </div>
            ) : (
                <Carousel className="w-full mx-auto border" 
                    plugins={[plugin.current]}
                >
                <CarouselContent className="w-full">
                    {banners?.data?.map((banner, index) => (
                    <CarouselItem key={index}>
                        <div>
                            <Image src={banner.image} alt="banner" width={1920} height={300} className="cursor-pointer" onClick={() => window.open(banner.link, "_blank")}/>
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            )}
        </div>
    )
}

export default HomeBanner
