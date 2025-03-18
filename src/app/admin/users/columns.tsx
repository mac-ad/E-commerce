"use client"

import { Column } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/app/components/DataTable/DataTableColumnHeader"

export const UserColumns = [
  {
    accessorKey: "_id",
    header: ({ column }: { column: Column<any> }) => <DataTableColumnHeader column={column} title="User ID" />,
    cell: ({ row }: { row: any }) => <div className="font-medium">#{row.original._id}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "fullName",
    header: ({ column }: { column: Column<any> }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }: { row: any }) => <div>{row.original.fullName}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "email",
    header: ({ column }: { column: Column<any> }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }: { row: any }) => <div>{row.original.email}</div>,
    enableSorting: false,
  },
 
  {
    accessorKey: "role",
    header: ({ column }: { column: Column<any> }) => <DataTableColumnHeader column={column} title="Role" />,
    cell: ({ row }: { row: any }) => <div className="capitalize">{row.original.role}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }: { column: Column<any> }) => <DataTableColumnHeader column={column} title="Join Date" />,
    cell: ({ row }: { row: any }) => <div>{new Date(row.original.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}</div>,
    enableSorting: false,
  },
] 