"use client";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import CreateBanner from "./CreateBanner";

const BannerDetail = ({
    open,
    onOpenChange,
    bannerId,
    onClose
}: {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    bannerId: string | null,
    onClose: () => void
}) => {
    const title = bannerId ? "Edit Banner" : "Create Banner"
    const description = bannerId ? "Edit banner information" : "Create a new banner"
    
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
                        <CreateBanner 
                            bannerId={bannerId}
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

export default BannerDetail 