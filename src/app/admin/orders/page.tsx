"use client"

import { DataTable } from "@/app/components/DataTable/DataTable"
import { OrderColumns } from "./columns"
import {  useDeleteOrderMutation, useGetOrdersQuery, useUpdateOrderMutation } from "@/features/api/orderApiSlice"
import OrderDetail from "./OrderDetail"
import { useMemo, useState } from "react"
import { PAGE_SIZE, PAGE } from "@/utils/constants/common"
import { Column, Row } from "@tanstack/react-table"
import AdminHeader from "@/app/components/AdminHeader"
import { toast } from "sonner"
import { DataTableColumnHeader } from "@/app/components/DataTable/DataTableColumnHeader"
import { Button } from "@/components/ui/button"
import { EyeIcon, TrashIcon } from "lucide-react"
import ConfirmDialog from "@/app/components/ConfirmDialog"
import { OrderStatus as OrderStatusType, PaymentStatus as PaymentStatusType } from "@/utils/types/api/common"
import OrderStatus from "@/app/components/OrderStatus"

const OrdersPage = () => {
  const [pagination, setPagination] = useState({ pageIndex: PAGE, pageSize: PAGE_SIZE })
  const [search,setSearch] = useState<string>("")

  const [currentOrderId,setCurrentOrderId] = useState<string | null>(null)
  const [currentAccessor,setCurrentAccessor] = useState<string | null>(null)
  
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const [openOrderDetail, setOpenOrderDetail] = useState(false)

  const {data:orders,isLoading,isFetching,refetch} = useGetOrdersQuery({...pagination,search})

  const [updateOrder, {isLoading:isStatusChanging}] = useUpdateOrderMutation()

  const handleStatusChange = async ({newStatus,id,accessorKey}: {newStatus: OrderStatusType | PaymentStatusType,id:string,accessorKey:string}) => {
    setCurrentAccessor(accessorKey)
    setCurrentOrderId(id)
    const formData = new FormData();
    if(accessorKey === "status") {
      formData.append('status', newStatus)
    } else {
      formData.append('paymentStatus', newStatus)
    }

    try {
      await updateOrder({data:formData, id: id}).unwrap()
      toast.success(`Order status updated successfully`)
      setCurrentOrderId(null)
      setCurrentAccessor(null)
    } catch (error) {
      console.error('Error saving order:', error)
      toast.error("Error saving order")
    }
  }

  const [deleteOrder, {isLoading:isDeleting}] = useDeleteOrderMutation()

  const handleDelete = async (id: string) => {
    if(!confirmDelete) {
      setOpenConfirmDialog(true)
      setCurrentOrderId(id)
      return;
    }
  }

  const handleConfirmDelete = async () => {
    if(!currentOrderId) return;
    try {
      await deleteOrder(currentOrderId).unwrap()
      setOpenConfirmDialog(false)
      setCurrentOrderId(null)
      toast.success("Order deleted successfully")
    } catch (error) {
      console.error('Error deleting order:', error)
      toast.error("Error deleting order")
    }
  }

  const columns = useMemo(() => {
    return [
      ...OrderColumns?.map((order) => {
        if(order.accessorKey === "status" || order.accessorKey === "paymentStatus") {
          return {
            ...order,
            cell: ({row}: { row: Row<any> }) => 
            <OrderStatus 
              status={row.original[order.accessorKey]} 
              onStatusChange={(newStatus:OrderStatusType | PaymentStatusType) => {
                handleStatusChange({
                  newStatus,
                  id: row.original._id,
                  accessorKey: order.accessorKey
                });
              }}
              statusChanging={row.original._id === currentOrderId && currentAccessor === order.accessorKey ? isStatusChanging : false}
              type = {order.accessorKey === "status" ? "order" : "payment"}
              disabled = {isStatusChanging}
            />
          }
        }
        return order
      }),
      {
        accessorKey: "actions",
        header: ({column}: { column: Column<any> }) => <DataTableColumnHeader column={column} title="Actions" />,
        enableSorting: false,
        cell: ({row}: { row: Row<any> }) => (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick = {() => {
              setOpenOrderDetail(true)
              setCurrentOrderId(row.original._id)
            }}>
              <EyeIcon className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleDelete(row.original._id)}>
              <TrashIcon className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        )
      }
    ]
  }, [OrderColumns,isStatusChanging])

  return (
    <div className="p-2 md:p-8">
      <AdminHeader 
        title="Orders"
        description="Manage your customer orders"
        buttonText="Order"
        buttonAction={() => {
          setOpenOrderDetail(true);
        }}
        canAdd = {false}
      />

      <div className="">
        <DataTable 
          columns={columns} 
          data={orders?.data ?? []} 
          loading = {isLoading || isFetching} 
          pagination = {pagination}
          setPagination={setPagination} 
          setSearch={setSearch}
          search={search}
          totalItems={orders?.totalItems ?? 0}
          refetch={refetch}
          showSearch = {true}
          searchText = "Search for orderId...."
        />
      </div>

      <OrderDetail 
        open={openOrderDetail}
        onOpenChange={setOpenOrderDetail}
        orderId = {currentOrderId}
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
  )
}

export default OrdersPage
