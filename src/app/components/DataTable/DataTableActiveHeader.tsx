import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Column } from "@tanstack/react-table"
import { Icon } from "@iconify/react/dist/iconify.js"
import { cn } from "@/lib/utils"

const DataTableActiveHeader = (
    {
        column,
        title,
        onChange,
        currentStatus
    }: {
        column: Column<any>,
        title:string,
        onChange: (status:string) => void,
        currentStatus:"active" | "inactive" | "all"
        }
    ) => {

    return (
        <div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="-ml-3 text-sm h-8 data-[state=open]:bg-accent">
                <span>{title}</span>
                <span><Icon icon = "icon-park-outline:dot" 
                 className = {cn(currentStatus === "active" ? "text-green-500 block" : currentStatus === "inactive" ? "text-gray-500 block" : "hidden")}
                 /></span>
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>   
                <DropdownMenuItem onClick={() => onChange("all")}>
                    All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onChange("active")}>
                    Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onChange("inactive")}>
                    Inactive  
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </div>
    )
}

export default DataTableActiveHeader
