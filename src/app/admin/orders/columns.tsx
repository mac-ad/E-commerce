"use client"

import { Column, Row, Table } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/app/components/DataTable/DataTableColumnHeader"
import { getCurrency, getDate } from "@/utils/utilityFunctions"

export const OrderColumns = [
  {
    accessorKey: "_id",
    header: ({ column }: { column: Column<any> }) => <DataTableColumnHeader column={column} title="Order ID" />,
    cell: ({ row }: { row: Row<any> }) => <div className="font-medium">#{row.original._id}</div>
  },
  {
    accessorKey: "user.fullName",
    header: ({ column }: { column: Column<any> }) => <DataTableColumnHeader column={column} title="Customer" />,
    cell: ({ row }: { row: Row<any> }) => <div>{row.original.user?.fullName || "N/A"}</div>
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }: { column: Column<any> }) => <DataTableColumnHeader column={column} title="Total" />,
    cell: ({ row }: { row: Row<any> }) => <div>{getCurrency(row?.original?.totalAmount)}</div>
  },
  {
    accessorKey: "status",
    header: ({ column }: { column: Column<any> }) => <DataTableColumnHeader column={column} title="Status" />,
    enableSorting: false,
  },
  {
    accessorKey: "paymentStatus",
    header: ({ column }: { column: Column<any> }) => <DataTableColumnHeader column={column} title="Payment Status" />,
    cell: ({ row }: { row: Row<any> }) => <div>{row.original.paymentStatus}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "orderDate",
    header: ({ column }: { column: Column<any> }) => <DataTableColumnHeader column={column} title="Order Date" />,
    cell: ({ row }: { row: Row<any> }) => <div>{getDate(row?.original?.orderDate)}</div>
  },
]

