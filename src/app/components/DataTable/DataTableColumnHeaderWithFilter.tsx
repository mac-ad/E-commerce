import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Column } from "@tanstack/react-table"
import { Icon } from "@iconify/react/dist/iconify.js"

interface DataTableColumnHeaderWithFilterProps {
  title: string
  filterOptions: {
    value: string
    label: string
    icon?: React.ReactNode
  }[]
  onFilterChange: (value: string) => void
  value: string | undefined
}

const DataTableColumnHeaderWithFilter = ({
  title,
  filterOptions,
  onFilterChange,
  value
}: DataTableColumnHeaderWithFilterProps) => {
    console.log(filterOptions)
  return (
    <div className="flex items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="-ml-3 text-sm h-8 data-[state=open]:bg-accent flex flex-col items-start">
            <div className = "flex items-center gap-2">
                <span>{title}</span>
                <Icon icon="radix-icons:chevron-down" className="ml-2" />
            </div>
            {value && <span className="text-xs text-gray-500">({filterOptions.find(option => option.value === value)?.label})</span>}
          </Button>
        </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => onFilterChange("")}>
              All
            </DropdownMenuItem>
            {filterOptions.map((option) => (
              <DropdownMenuItem key={option.value} onClick={() => onFilterChange(option.value)}>
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default DataTableColumnHeaderWithFilter
