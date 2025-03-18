"use client";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "@/features/api/categoryApiSlice";
import { useRouter } from "next/navigation";
import { DataTable } from "@/app/components/DataTable/DataTable";
import AdminHeader from "@/app/components/AdminHeader";
import ConfirmDialog from "@/app/components/ConfirmDialog";
import { useMemo, useState } from "react";
import { PAGE, PAGE_SIZE } from "@/app/utils/constants/common";
import { columns } from "./columns";
import { toast } from "sonner";
import { DataTableColumnHeader } from "@/app/components/DataTable/DataTableColumnHeader";
import { Column, Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { EditIcon, TrashIcon } from "lucide-react";
import CategoryDetail from "./CategoryDetail";

export default function CategoryPage() {
    const [pagination, setPagination] = useState({ pageIndex: PAGE, pageSize: PAGE_SIZE })
    const [search,setSearch] = useState<string>("")

    const [currentCategoryId,setCurrentCategoryId] = useState<string | null>(null)
    const [openCategoryDetail,setOpenCategoryDetail] = useState<boolean>(false)

    const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const { data: categories, isLoading, refetch } = useGetCategoriesQuery();
    const [deleteCategory, {isLoading:isDeleting}] = useDeleteCategoryMutation()

    const handleConfirmDelete = async () => {
        if(!currentCategoryId) return;
        try {
          await deleteCategory(currentCategoryId).unwrap()
          setOpenConfirmDialog(false)
          setCurrentCategoryId(null)
          toast.success("Category deleted successfully")
        } catch (error) {
          toast.error("Error deleting category")
        }   
    }

    const handleDelete = (id:string) => {
        setOpenConfirmDialog(true)
        setCurrentCategoryId(id)
    }

    const columnData = useMemo(() => {
            return [
                ...columns,
                {
                    accessorKey: "actions",
                    header: ({column}: { column: Column<any> }) => <DataTableColumnHeader column={column} title="Actions" />,
                    enableSorting: false,
                    cell: ({row}: { row: Row<any> }) => (
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick = {() => {
                          setOpenCategoryDetail(true)
                          setCurrentCategoryId(row.original._id)
                          
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
    },[columns])

    return (
        <div className="p-2 md:p-8">
        <AdminHeader 
            title="Categories"
            description="Manage your categories"
            buttonText="Category"
            buttonAction={() => {
                setOpenCategoryDetail(true);
            }}
            canAdd = {true}
        />

        <div className="">
            <DataTable 
                columns={columnData} 
                data={categories?.data ?? []} 
                loading = {isLoading} 
                pagination = {pagination}
                setPagination={setPagination} 
                setSearch={setSearch}
                search={search}
                totalItems={categories?.total ?? 0}
                refetch={refetch}
                showSearch = {false}
            />
        </div>
        
        <CategoryDetail 
            open={openCategoryDetail}
            onOpenChange={setOpenCategoryDetail}
            categoryId = {currentCategoryId}
            onClose = {() => setCurrentCategoryId(null)}
        />

        <ConfirmDialog
            open={openConfirmDialog}
            onOpenChange={setOpenConfirmDialog}
            title="Delete Order"
            description="Are you sure you want to delete this order?"
            onConfirm={handleConfirmDelete}
            loading={isDeleting}
            confirmText="Delete"
            cancelText="Cancel"
        />
    </div>
  );
}
