import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import CreateProduct from "./CreateProduct"

const ProductDetail = ({
    open,
    onOpenChange,
    productId,
    onClose
}: {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    productId: string | null,
    onClose: () => void
}) => {

    const title = productId ? "Update Product" : "Create Product"
    const description = productId ? "Update the product details" : "Let's Create a new product"
    
    return (
        <div>
            <Sheet open={open} onOpenChange={() => {
                onOpenChange(false);
                onClose()
            }}>
                <SheetContent side="right" className = "h-screen flex flex-col sm:max-w-[60vw]" >
                    <SheetHeader>
                        <SheetTitle>{title}</SheetTitle>
                        <SheetDescription>{description}</SheetDescription>
                    </SheetHeader>
                    <div className="pt-4 h-full overflow-y-auto flex-1 py-4 px-2">
                        <CreateProduct productId={productId} closeModal={() => onOpenChange(false)}/>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default ProductDetail
