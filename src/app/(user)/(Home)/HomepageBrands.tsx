'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useState } from 'react';
import { useGetBrandsQuery } from '@/features/api/brandApiSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import NoBrands from '@/app/components/NoBrands';
import { getFullUrl } from '@/utils/utilityFunctions';

interface Brand {
  id: string;
  name: string;
  logo: string;
  description?: string;
}

const HomepageBrands = () => {

  const brands = useSelector((state:RootState) => state.brand.data);

  return (
    <section className="py-12 w-[90%] mx-auto">
      <div className="  mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-primary">Our Partner Brands</h2>
        {
          brands.length > 0 ? (
            <Carousel
          opts={{
            align: 'center',
            loop: false,
          }}
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4 w-[300px] flex gap-3 py-2">
            {brands.map((brand) => (
              <CarouselItem 
                key={brand?._id} 
                className="pl-2 md:pl-4 "
              >
                <Card className="hover:shadow-lg transition-shadow duration-300 border-none rounded-none">
                  <CardContent className="flex flex-col items-center p-6">
                    <div className="relative w-32 aspect-square mb-4">
                      <Image
                        src={getFullUrl(brand?.logo)}
                        alt={brand?.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <NoBrands />
        )}
      </div>
    </section>
  );
};

export default HomepageBrands;

