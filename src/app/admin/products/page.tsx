"use client"

import { DataTable } from "@/app/components/DataTable/DataTable"
import { ProductColumns } from "./columns"
import { useDeleteProductMutation, useGetProductsQuery, useUpdateProductMutation } from "@/features/api/productApiSlice"
import ProductDetail from "./ProductDetail"
import { useEffect, useMemo, useState } from "react"
import { PAGE_SIZE, PAGE } from "@/app/utils/constants/common"
import { Column, Row } from "@tanstack/react-table"
import DataTableActiveHeader from "@/app/components/DataTable/DataTableActiveHeader"
import AdminHeader from "@/app/components/AdminHeader"
import ActiveToggle from "@/app/components/ActiveToggle"
import { toast } from "sonner"
import { DataTableColumnHeader } from "@/app/components/DataTable/DataTableColumnHeader"
import { Button } from "@/components/ui/button"
import { EditIcon, EyeIcon, TrashIcon } from "lucide-react"
import ConfirmDialog from "@/app/components/ConfirmDialog"
import DataTableColumnHeaderWithFilter from "@/app/components/DataTable/DataTableColumnHeaderWithFilter"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"

const ProductsPage = () => {

  const [pagination, setPagination] = useState({ pageIndex: PAGE, pageSize: PAGE_SIZE })
  const [status,setStatus] = useState< "all" | "active" | "inactive">("all")
  const [search,setSearch] = useState<string>("")
  const [totalPages,setTotalPages] = useState<number>(0)
  const [currentProductId,setCurrentProductId] = useState<string | null>(null)

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const [currentCategoryId,setCurrentCategoryId] = useState<string | undefined>(undefined)

  const categories = useSelector((state: RootState) => state.category.data)

  const isActive = useMemo(() => {
    if(status === "all") return undefined;
    if(status === "active") return true;
    if(status === "inactive") return false;
  },[status])

  const [openProductDetail, setOpenProductDetail] = useState(false)

  const {data:products,isLoading,isFetching,refetch} = useGetProductsQuery({...pagination,isActive,search,category:currentCategoryId})

  console.log({products,isLoading,isFetching})

  const [updateProduct, {isLoading:changingStatus}] = useUpdateProductMutation()

  useEffect(() => {
    if(products?.totalItems) {
      setTotalPages(Math.ceil(products.totalItems / pagination.pageSize))
    }
  },[products])

  const handleStatusChange = (status:string) => {
    setPagination(prev => ({...prev,pageIndex:0}));
    setStatus(prev => status as "all" | "active" | "inactive")
  }

  const handleToggle = async (checked: boolean, id: string) => {
    setCurrentProductId(id)
    const formData = new FormData();
    formData.append('isActive', String(checked))

    try {
      await updateProduct({data:formData, id: id}).unwrap()
      toast.success("Product status updated successfully")
      setCurrentProductId(null)
    } catch (error) {
      console.error('Error saving product:', error)
      toast.error("Error saving product")
      setCurrentProductId(null)
    }
  }

  const [deleteProduct, {isLoading:isDeleting}] = useDeleteProductMutation()

  const handleCategoryChange = (categoryId: string) => {
    setCurrentCategoryId(categoryId)
    setPagination(prev => ({...prev,pageIndex:0}))
  }

  const handleDelete = async (id: string) => {
    if(!confirmDelete) {
      setOpenConfirmDialog(true)
      setCurrentProductId(id)
      return;
    }
    
  }

  const handleConfirmDelete = async () => {
    if(!currentProductId) return;
    try {
      await deleteProduct(currentProductId).unwrap()
      setOpenConfirmDialog(false)
      toast.success("Product deleted successfully")
    } catch (error) {
      console.error('Error deleting product:', error)
      toast.error("Error deleting product")
    }
  }

  const columns = useMemo(() => {
    return [
      ...ProductColumns?.map((column) => {
        switch(column?.accessorKey){
          case("isActive"):
            return {
              ...column,
              cell: ({row}: { row: Row<any> }) => {
                return (
                  <ActiveToggle 
                    active = {row.original.isActive} 
                  onToggle = {(checked) => {
                    handleToggle(checked, row.original._id)
                  }}
                  changingStatus = {currentProductId === row.original._id ? changingStatus : false}
                  disabled = {changingStatus}
                />
              )
            },
            header: ({column}: { column: Column<any> }) => 
              <DataTableActiveHeader column={column} title="Status" onChange = {handleStatusChange} currentStatus = {status} />,
            }   
          
          case("category.name"):
            return {
              ...column,
              header: ({column}: { column: Column<any> }) => 
              <DataTableColumnHeaderWithFilter 
                title="Category" 
                filterOptions = {categories?.map((cat) => ({value: cat._id, label: cat.name}))} 
                onFilterChange = {handleCategoryChange} 
                value = {currentCategoryId}
              />,
              cell: ({row}: { row: Row<any> }) => <div>{row?.original?.category?.name ?? "-"}</div>
             }

          default:
            return column
        }
      }),
      {
        accessorKey: "actions",
        header: ({column}: { column: Column<any> }) => <DataTableColumnHeader column={column} title="Actions" />,
        enableSorting: false,
        cell: ({row}: { row: Row<any> }) => (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick = {() => {
              setOpenProductDetail(true)
              setCurrentProductId(row.original._id)
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
  }, [ProductColumns,status,changingStatus,categories,currentCategoryId])


  useEffect(() => {
    if(!openProductDetail) {
      setCurrentProductId(null)
    }
  },[openProductDetail])
  
  return (
    <div className="p-2 md:p-8">
     <AdminHeader 
        title="Products"
        description="Manage your product catalog"
        buttonText="Product"
        buttonAction={() => {
          setOpenProductDetail(true);
        }}
     />
      <div className="">
          <DataTable 
            columns={columns} 
            data={products?.data ?? []} 
            loading = {isLoading || isFetching} 
            pagination = {pagination}
            setPagination={setPagination} 
            setSearch={setSearch}
            search={search}
            totalItems={products?.totalItems ?? 0}
            refetch={refetch}
          />
      </div>

      {/* view, update or create product */}
      <ProductDetail 
        open={openProductDetail}
        onOpenChange={setOpenProductDetail}
        productId = {currentProductId}
        onClose = {() => setCurrentProductId(null)}
      />

      <ConfirmDialog
        open={openConfirmDialog}
        onOpenChange={setOpenConfirmDialog}
        title="Delete Product"
        description="Are you sure you want to delete this product?"
        onConfirm={handleConfirmDelete}
        loading={isDeleting}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  )
}

export default ProductsPage
