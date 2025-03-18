import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"

const BannerSkeleton = () => {
    return (
            <Skeleton className="w-full mx-auto h-[150px] sm:h-[200px] md:h-[300px] lg:h-[400px]">
                {/* <CarouselContent className="w-full">
                    {[1, 2, 3].map((_, index) => (
                        <CarouselItem key={index}>
                            <div>
                                <Skeleton className="w-full h-[300px]" />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent> */}
            </Skeleton>
    )
}

export default BannerSkeleton
