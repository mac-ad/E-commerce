"use client";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import CreateCategory from "./CreateCategory";

const CategoryDetail = ({
    open,
    onOpenChange,
    categoryId,
    onClose
}: {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    categoryId: string | null,
    onClose: () => void
}) => {

    const title = categoryId ? "Edit Category" : "Create Category"
    const description = categoryId ? "Edit category information" : "Create a new category"
    
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
                        {/* Category form will go here */}
                        <CreateCategory 
                            categoryId={categoryId}
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

export default CategoryDetail
