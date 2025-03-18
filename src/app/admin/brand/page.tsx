"use client"

import { DataTable } from "@/app/components/DataTable/DataTable"
import { BrandColumns } from "./columns"
import { useDeleteBrandMutation, useGetBrandsQuery, useUpdateBrandMutation } from "@/features/api/brandApiSlice"
import { useState } from "react"
import { PAGE_SIZE, PAGE } from "@/app/utils/constants/common"
import { Column, Row } from "@tanstack/react-table"
import AdminHeader from "@/app/components/AdminHeader"
import { toast } from "sonner"
import { DataTableColumnHeader } from "@/app/components/DataTable/DataTableColumnHeader"
import { Button } from "@/components/ui/button"
import { EditIcon, TrashIcon } from "lucide-react"
import ConfirmDialog from "@/app/components/ConfirmDialog"
import BrandDetail from "./BrandDetail"

const BrandsPage = () => {
  const [pagination, setPagination] = useState({ pageIndex: PAGE, pageSize: PAGE_SIZE })
  const [search, setSearch] = useState<string>("")
  const [currentBrandId, setCurrentBrandId] = useState<string | null>(null)
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [openBrandDetail, setOpenBrandDetail] = useState(false)

  const { data: brands, isLoading, isFetching, refetch } = useGetBrandsQuery({ ...pagination, search })
  const [updateBrand, { isLoading: changingStatus }] = useUpdateBrandMutation()
  const [deleteBrand, { isLoading: isDeleting }] = useDeleteBrandMutation()

  const columns = [
    ...BrandColumns,
    {
      accessorKey: "actions",
      header: ({ column }: { column: Column<any> }) => <DataTableColumnHeader column={column} title="Actions" />,
      cell: ({ row }: { row: Row<any> }) => (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => {
            setOpenBrandDetail(true)
            setCurrentBrandId(row.original._id)
          }}>
            <EditIcon className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => handleDelete(row.original._id)}>
            <TrashIcon className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      )
    }
  ]

  const handleDelete = async (id: string) => {
    setOpenConfirmDialog(true)
    setCurrentBrandId(id)
  }

  const handleConfirmDelete = async () => {
    if (!currentBrandId) return
    try {
      await deleteBrand(currentBrandId).unwrap()
      setOpenConfirmDialog(false)
      toast.success("Brand deleted successfully")
    } catch (error) {
      console.error('Error deleting brand:', error)
      toast.error("Error deleting brand")
    }
  }

  return (
    <div className="p-2 md:p-8">
      <AdminHeader 
        title="Brands"
        description="Manage your brand catalog"
        buttonText="Brand"
        buttonAction={() => setOpenBrandDetail(true)}
      />
      <div className="">
        <DataTable 
          columns={columns} 
          data={brands?.data ?? []} 
          loading={isLoading || isFetching}
          pagination={pagination}
          setPagination={setPagination}
          setSearch={setSearch}
          search={search}
          totalItems={brands?.totalItems ?? 0}
          refetch={refetch}
        />
      </div>

      <BrandDetail 
        open={openBrandDetail}
        onOpenChange={setOpenBrandDetail}
        brandId={currentBrandId}
        onClose={() => setCurrentBrandId(null)}
      />

      <ConfirmDialog
        open={openConfirmDialog}
        onOpenChange={setOpenConfirmDialog}
        title="Delete Brand"
        description="Are you sure you want to delete this brand?"
        onConfirm={handleConfirmDelete}
        loading={isDeleting}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  )
}

export default BrandsPage 