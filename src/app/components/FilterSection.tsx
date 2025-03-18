import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useState } from "react"
import { useGetBrandsQuery } from "@/features/api/brandApiSlice"
import FilterSkeleton from "./skeleton/FilterSkeleton"

const MAX_PRICE = 10000000;
const MIN_PRICE = 0;

const FilterSection = ({categoryId,loading,setFilter,filter,resetPagination}:{categoryId:string,loading:boolean,setFilter:any,filter:any,resetPagination:() => void}) => {
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
    const [price, setPrice] = useState<[number,number]>([0,MAX_PRICE])
    // const brands = useSelector((state:RootState) => state.brand.data);

    const {data:brands, isLoading:isGettingBrands, error} = useGetBrandsQuery({category:categoryId});

    const isLoading = loading || isGettingBrands;

    const filterChangeHandler = (checked:boolean,brandId:string) => {
        if(checked) {
            setFilter({...filter,brand:[...filter.brand,brandId]})
        } else {
            setFilter({...filter,brand:filter.brand.filter((id:string) => id !== brandId)})
        }
        resetPagination()
    }

    if(isLoading) return <FilterSkeleton />
    if(error) return <div>Error loading brands</div>

    return (
        <div>
            {/* desktop filter button */}
            <div className = "shadow-sm">
                <Accordion type="multiple"  className = "hidden md:block  shadow-lg">
                    <AccordionItem value="item-1" className = "border-b-0" >
                        <AccordionTrigger className = "border-b p-4">Brand</AccordionTrigger>
                        <AccordionContent className = "flex flex-col gap-2 mt-5 p-2">
                            {
                               brands?.data?.length === 0 ? 
                                <div className="flex items-center justify-center w-full py-4 text-gray-500 italic">
                                    <span>No brands found</span>
                                </div>
                               : brands?.data.map((brand) => (
                                <div className = "flex items-center gap-2 text-capitalize">
                                    <Checkbox checked = {filter.brand.includes(brand._id)} onCheckedChange = {(checked) => filterChangeHandler(checked as boolean,brand._id)} />
                                    <span>{brand.name}</span> 
                                </div>
                            ))
                            }
                           
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className = "border-b-0">
                        <AccordionTrigger className = "border-b p-4">Price</AccordionTrigger>
                        <AccordionContent className = "flex flex-col gap-2 p-2">
                            <span className="text-sm pb-2 mt-4">NRs.{price[0]} - NRs.{price[1]}</span>
                            <Slider defaultValue={price}  max={MAX_PRICE} step={500} onValueChange={(value) => setPrice(value as [number,number])} />
                            <Button variant="default" className="w-fit mt-10 ml-auto" onClick={() => setFilter({...filter,price:price})}>Apply Filter</Button>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

            </div>

            {/* mobile filter button */}
            <button className="flex items-center gap-1 md:hidden" onClick={() => setMobileFilterOpen(true)}>
                <span>Filter</span>
                <Icon icon = "mdi:chevron-down" className="text-2xl" />
            </button>

        <Sheet
            open = {mobileFilterOpen}
            onOpenChange = {setMobileFilterOpen}
        >
            <SheetContent
                side = "bottom"
                className="rounded-t-xl"
            >
                <div className="flex flex-col gap-4 pt-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Filters</h3>
                    </div>
                    {/* brand filter */}
                    <div className="flex flex-col gap-2">
                        <h4 className="text-sm font-medium">Brand</h4>
                        <div className="flex gap-1 flex-wrap max-h-[150px] overflow-y-auto">
                            {
                                brands?.data.map((brand) => (
                                    <Button variant="outline" key={brand._id} className="uppercase text-xs bg-muted/30 hover:bg-primary hover:text-primary-foreground">
                                        <span>{brand.name}</span> 
                                    </Button>
                                ))
                            }
                        </div>
                    </div>
                        {/* price filter */}
                        <div className="flex flex-col gap-2">
                            <h4 className="text-sm font-medium">Price</h4>
                            <div className="flex flex-col gap-1 bg-gray-100 p-4 rounded-md">
                            <span className="text-sm pb-2 mt-4">NRs.{price[0]} - NRs.{price[1]}</span>
                            <Slider defaultValue={price}  max={MAX_PRICE} step={500} onValueChange={(value) => setPrice(value as [number,number])} />
                        </div>
                    </div>
                <Button variant="default" className="w-fit mt-10 ml-auto">Apply Filter</Button>
                </div>

            </SheetContent>
        </Sheet>
        </div>
    )
}

export default FilterSection


// const brands = [
//     {
//         "_id": "67cc16783aef6ffa5917c066",
//         "name": "cg - life",
//         "description": "cg updated description -2",
//         "logo": "/uploads/1741428455900-ainmcz5ywa7-cg.png",
//         "createdAt": "2025-03-08T10:05:44.543Z",
//         "updatedAt": "2025-03-08T10:07:56.370Z",
//         "__v": 0
//     },
//     {
//         "_id": "67cc07efbca11999c92c3f21",
//         "name": "apple",
//         "description": "apple updated description",
//         "logo": "/uploads/1741424623361-k4iyloo6ges-apple.png",
//         "createdAt": "2025-03-08T09:03:43.363Z",
//         "updatedAt": "2025-03-08T09:05:04.559Z",
//         "__v": 0
//     },
   
// ]