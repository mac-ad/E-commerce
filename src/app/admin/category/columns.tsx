"use client";

import { Column, ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryItem } from "@/features/states/CategorySlice";
import { DataTableColumnHeader } from "@/app/components/DataTable/DataTableColumnHeader";
import { getDate } from "@/utils/utilityFunctions";

export const columns: ColumnDef<CategoryItem>[] = [
    {
        accessorKey : "_id",
        header: ({ column }: { column: Column<any> }) => <DataTableColumnHeader column={column} title="Category ID" />,
        cell: ({ row }: { row: Row<any> }) => <div className="font-medium">#{row.original._id}</div>
    },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }: { row: Row<any> }) => {
        return <div>{getDate(row.original.createdAt)}</div>
    }
  },
];
