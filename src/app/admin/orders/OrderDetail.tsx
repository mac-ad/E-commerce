import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import ViewOrder from "./ViewOrder"

const OrderDetail = ({
    open,
    onOpenChange,
    orderId,
}: {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    orderId: string | null,
}) => {

    const title = "Order Details"
    const description = "View order information"
    
    return (
        <div>
            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetContent side="right" className="h-screen flex flex-col sm:max-w-[60vw]">
                    <SheetHeader>
                        <SheetTitle>{title}</SheetTitle>
                        <SheetDescription>{description}</SheetDescription>
                    </SheetHeader>
                    <div className="pt-4 h-full overflow-y-auto flex-1 py-4 px-2">
                        {/* Order details content will go here */}
                        <ViewOrder orderId={orderId} open={open} onOpenChange={onOpenChange} />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default OrderDetail
