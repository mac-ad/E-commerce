import ActiveToggle from "@/app/components/ActiveToggle";
import DataTableActiveHeader from "@/app/components/DataTable/DataTableActiveHeader";
import { DataTableColumnHeader } from "@/app/components/DataTable/DataTableColumnHeader";
import { getCurrency } from "@/utils/utilityFunctions";
import { Checkbox } from "@/components/ui/checkbox";
import { Column, Row, Table } from "@tanstack/react-table";

export const ProductColumns = [
    // {
    //     id: 'select',
    //     header: ({ table }: { table: Table<any> }) => (
    //         <Checkbox
    //             checked={
    //             table.getIsAllPageRowsSelected() ||
    //             (table.getIsSomePageRowsSelected() && 'indeterminate')
    //             }
    //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //             aria-label='Select all'
    //             className='translate-y-[2px]'
    //         />
    //     ),
    //     cell: ({ row }: { row: Row<any> }) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //             aria-label='Select row'
    //             className='translate-y-[2px]'
    //         />
    //     ),
    // },
    {
        accessorKey: "name",
        header:  ({column}: { column: Column<any> }) => <DataTableColumnHeader column={column} title="Name" />,
        cell: ({row}: { row: Row<any> }) => <div className = "whitespace-nowrap max-w-[200px] truncate">
          {row?.original?.name}
        </div>,
        enableSorting: false,   
    },
    {
        accessorKey: "quantity",
        header: ({column}: { column: Column<any> }) => <DataTableColumnHeader column={column} title="Stock" />,
        enableSorting: false,
    },
    {
        accessorKey: "price",
        header: ({column}: { column: Column<any> }) => <DataTableColumnHeader column={column} title="Price" />,
        cell: ({row}: { row: Row<any> }) => <div className = "">
            {getCurrency(row?.original?.price)}
        </div>,
        enableSorting: false,   
    },
    {
        accessorKey: "discount",
        header: ({column}: { column: Column<any> }) => <DataTableColumnHeader column={column} title="Disc (%)" />,
        enableSorting: false,
    },  
    {
        accessorKey: "category.name",
        enableSorting: false,
        cell: ({row}: { row: Row<any> }) => <div>{row?.original?.category?.name}</div>
    },
    {
        accessorKey: "brand.name",
        header: ({column}: { column: Column<any> }) => <DataTableColumnHeader column={column} title="Brand" />,
        enableSorting: false,   
    },
    {
        accessorKey: "isActive",
        enableSorting: false,
    },
]