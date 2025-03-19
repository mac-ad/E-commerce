"use client"

import { DataTable } from "@/app/components/DataTable/DataTable"
import { BannerColumns } from "./columns"
import { useDeleteBannerMutation, useGetBannersQuery, useUpdateBannerMutation } from "@/features/api/bannerApiSlice"
import { useState } from "react"
import { PAGE_SIZE, PAGE } from "@/app/utils/constants/common"
import { Column, Row } from "@tanstack/react-table"
import AdminHeader from "@/app/components/AdminHeader"
import { toast } from "sonner"
import { DataTableColumnHeader } from "@/app/components/DataTable/DataTableColumnHeader"
import { Button } from "@/components/ui/button"
import { EditIcon, TrashIcon } from "lucide-react"
import ConfirmDialog from "@/app/components/ConfirmDialog"
import BannerDetail from "./BannerDetail"

const BannerPage = () => {
  const [pagination, setPagination] = useState({ pageIndex: PAGE, pageSize: PAGE_SIZE })
  const [search, setSearch] = useState<string>("")
  const [currentBannerId, setCurrentBannerId] = useState<string | null>(null)
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
const [openBannerDetail, setOpenBannerDetail] = useState(false)

  const { data: banners, isLoading, isFetching, refetch } = useGetBannersQuery({ ...pagination, search })
  const [updateBanner, { isLoading: changingStatus }] = useUpdateBannerMutation()
  const [deleteBanner, { isLoading: isDeleting }] = useDeleteBannerMutation()

  const columns = [
    ...BannerColumns,
    {
      accessorKey: "actions",
      header: ({ column }: { column: Column<any> }) => <DataTableColumnHeader column={column} title="Actions" />,
      cell: ({ row }: { row: Row<any> }) => (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => {
            setOpenBannerDetail(true)
            setCurrentBannerId(row.original._id)
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
    setCurrentBannerId(id)
  }

  const handleConfirmDelete = async () => {
    if (!currentBannerId) return
    try {
      await deleteBanner(currentBannerId).unwrap()
      setOpenConfirmDialog(false)
      toast.success("Banner deleted successfully")
    } catch (error) {
      console.error('Error deleting banner:', error)
      toast.error("Error deleting banner")
    }
  }

  return (
    <div className="p-2 md:p-8">
      <AdminHeader 
        title="Banners"
        description="Manage your banner catalog"
        buttonText="Banner"
        buttonAction={() => setOpenBannerDetail(true)}
      />
      <div className="">
        <DataTable 
          columns={columns} 
          data={banners?.data ?? []} 
          loading={isLoading || isFetching}
          pagination={pagination}
          setPagination={setPagination}
          setSearch={setSearch}
          search={search}
          totalItems={banners?.totalItems ?? 0}
          refetch={refetch}
        />
      </div>

      <BannerDetail 
        open={openBannerDetail}
        onOpenChange={setOpenBannerDetail}
        bannerId={currentBannerId}
        onClose={() => setCurrentBannerId(null)}
      />

      <ConfirmDialog
        open={openConfirmDialog}
        onOpenChange={setOpenConfirmDialog}
        title="Delete Banner"
        description="Are you sure you want to delete this banner?"
        onConfirm={handleConfirmDelete}
        loading={isDeleting}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  )
}

export default BannerPage 