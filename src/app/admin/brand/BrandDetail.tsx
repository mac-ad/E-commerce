"use client";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import CreateBrand from "./CreateBrand";

const BrandDetail = ({
    open,
    onOpenChange,
    brandId,
    onClose
}: {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    brandId: string | null,
    onClose: () => void
}) => {
    const title = brandId ? "Edit Brand" : "Create Brand"
    const description = brandId ? "Edit brand information" : "Create a new brand"
    
    return (
        <div>
            <Sheet open={open} onOpenChange={() => {
                onOpenChange(false);
                onClose()
            }}>
                <SheetContent side="right" className="h-screen flex flex-col sm:max-w-[60vw]" >
                    <SheetHeader>
                        <SheetTitle>{title}</SheetTitle>
                        <SheetDescription>{description}</SheetDescription>
                    </SheetHeader>
                    <div className="pt-4 h-full overflow-y-auto flex-1 py-4 px-2">
                        <CreateBrand 
                            brandId={brandId}
                            closeModal={() => {
                                onOpenChange(false);
                                onClose()
                            }}
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default BrandDetail 