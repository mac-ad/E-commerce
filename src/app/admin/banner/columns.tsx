import { DataTableColumnHeader } from "@/app/components/DataTable/DataTableColumnHeader";
import { Column, Row } from "@tanstack/react-table";
import ActiveToggle from "@/app/components/ActiveToggle";

export const BannerColumns = [
    {
        accessorKey: "_id",
        header: ({column}: { column: Column<any> }) => <DataTableColumnHeader column={column} title="Banner ID" />,
        cell: ({row}: { row: Row<any> }) => <div className="whitespace-nowrap max-w-[200px] truncate">
            {row?.original?._id}
        </div>,
        enableSorting: false,
    },
    {
        accessorKey: "image",
        header: ({column}: { column: Column<any> }) => <DataTableColumnHeader column={column} title="Image" />,
        cell: ({row}: { row: Row<any> }) => <div className="relative w-full h-[100px]">
            <img 
                src={row?.original?.image} 
                alt={row?.original?.title}
                className="object-cover rounded-md h-full w-full"

            />
        </div>,
        enableSorting: false,
    },
] 