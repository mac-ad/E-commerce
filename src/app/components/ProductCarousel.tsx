import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import React from 'react'
import { getFullUrl } from '../utils/utilityFunctions'

const ProductCarousel = ({images}:{images:string[]}) => {

    const plugins = [
        Autoplay({
            delay: 2000,
        }),
    ]

  return (
    <div className = "flex justify-center items-center">
        <Carousel plugins={plugins}>
            <CarouselContent>
                {
                    images?.map((image,index) => (
                        <CarouselItem>
                            <Image src={getFullUrl(image)} alt={`Product Image ${index}`} width={500} height={500} className = "mx-auto"/>    
                        </CarouselItem>
                    ))
                }
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    </div>
  )
}

export default ProductCarousel
