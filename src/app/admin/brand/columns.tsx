"use client";

import { Column, ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/app/components/DataTable/DataTableColumnHeader";
import { Brand } from "@/features/api/brandSlice";

export const BrandColumns: ColumnDef<Brand>[] = [
    {
        accessorKey: "_id",
        header: ({ column }: { column: Column<any> }) => 
            <DataTableColumnHeader column={column} title="Brand ID" />,
        cell: ({ row }: { row: Row<any> }) => 
            <div className="font-medium">#{row.original._id}</div>
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
            const createdAt = new Date(row.original.createdAt);
            const formattedDate = createdAt.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            return <div>{formattedDate}</div>
        }
    },
]; 