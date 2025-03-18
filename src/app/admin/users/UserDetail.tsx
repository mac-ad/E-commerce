"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

const UserDetail = ({
    open,
    onOpenChange,
    userId,
}: {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    userId: string | null,
}) => {

    const title = "User Details"
    const description = "View user information"
    
    return (
        <div>
            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetContent side="right" className="h-screen flex flex-col sm:max-w-[60vw]">
                    <SheetHeader>
                        <SheetTitle>{title}</SheetTitle>
                        <SheetDescription>{description}</SheetDescription>
                    </SheetHeader>
                    <div className="pt-4 h-full overflow-y-auto flex-1 py-4 px-2">
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default UserDetail