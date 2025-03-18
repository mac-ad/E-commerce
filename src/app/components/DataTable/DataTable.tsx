"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  Table as TableInstance
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import TableDataSkeleton from "../skeleton/TableData"
import { DataTablePagination } from "./DataTablePagination"
import { Dispatch, SetStateAction } from "react"
import { debounce } from "@/app/utils/utilityFunctions"
import NoDataFoundDataTable from "./NoDataFoundDataTable"
import { Icon } from "@iconify/react/dist/iconify.js"


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  loading?: boolean;
  pagination:{
    pageIndex:number;
    pageSize:number;
  }
  setPagination: Dispatch<SetStateAction<{
    pageIndex:number;
    pageSize:number;
  }>>
  setSearch: Dispatch<SetStateAction<string>>
  search: string;
  totalItems:number;
  refetch: () => void;
  showSearch?: boolean;
  showSn?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading = true,
  pagination,
  setPagination,
  setSearch,
  search,
  totalItems,
  refetch,
  showSearch = true,
  showSn = true
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state : {
      pagination,
    },
    manualPagination: true,
    pageCount: Math.ceil(totalItems / pagination.pageSize),
    onPaginationChange: (updater) => {
      setPagination(old => {
        const newPaginationValue = updater instanceof Function ? updater(old) : updater
        console.log("newPaginationValue", newPaginationValue)
        return newPaginationValue
      })
    },
    meta: {
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
        // Create a new data array
        const newData = [...data];
        // Update the specific cell
        (newData[rowIndex] as any)[columnId] = value;
        // Update the ref's data
      }
    }
  })

  const changeHandler = debounce((e:React.ChangeEvent<HTMLInputElement>) => {
    setPagination(prev => ({...prev,pageIndex:0}));
    setSearch(e.target.value)
  }, 500)

  return (
    <div className="flex flex-col gap-2">
      
      <div className="flex items-center gap-2">
        <div className="flex justify-start">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              refetch();
            }}
            disabled={loading}
          >
            {(loading) ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Icon icon="mdi:refresh" className="w-4 h-4" />
            )}
          </Button>
        </div>
        {
          showSearch && (
            <Input
                placeholder="Search ..."
                onChange={changeHandler}
                className="max-w-sm"
                defaultValue={search}
            />
      )}
      <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    <div className="rounded-md border">
      <Table  className = "">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {showSn && (
                <TableHead key={headerGroup.id}>
                  #
                </TableHead>
              )}
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {loading  ? (
              <TableDataSkeleton 
                dataOnly = {true}
                columnCount = {showSn ? table.getAllColumns().length + 1 : table.getAllColumns().length}
                columns = {columns}
              />
          ) : table.getRowModel().rows?.length ? (
            <>
              
              {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                  {showSn && (
                    <TableCell className="text-center">
                      {pagination.pageIndex * pagination.pageSize + row.index + 1}
                    </TableCell>
                  )}
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
              </TableRow>
              ))}
            </>
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <NoDataFoundDataTable />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    <div className="mt-4">
      <DataTablePagination table={table} />
    </div>
    </div>
  )
}
