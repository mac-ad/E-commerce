"use client"

import { DataTable } from "@/app/components/DataTable/DataTable"
import { UserColumns } from "./columns"
import { useGetUsersQuery, useUpdateUserMutation } from "@/features/api/userApiSlice"
import { useMemo, useState } from "react"
import { PAGE_SIZE, PAGE } from "@/app/utils/constants/common"
import {  Row } from "@tanstack/react-table"
import AdminHeader from "@/app/components/AdminHeader"
import { toast } from "sonner"
import DataTableRoleCell from "@/app/components/DataTable/DataTableRoleCell"
import { UserRoleEnum } from "@/app/utils/types/api/common"
const UsersPage = () => {
  const [pagination, setPagination] = useState({ pageIndex: PAGE, pageSize: PAGE_SIZE })
  const [search, setSearch] = useState<string>("")

  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  const {data: users, isLoading, isFetching, refetch} = useGetUsersQuery({
    ...pagination,
    search,
  })

  const [updateUser, {isLoading: isUpdating}] = useUpdateUserMutation()

  const roleChangeHandler = async (id: string, role: UserRoleEnum) => {
    setCurrentUserId(id)
    try {
      const res = await updateUser({data:{role},id}).unwrap()
      console.log(res)
      toast.success("Role updated successfully")
      setCurrentUserId(null)
    } catch (error) {
      console.log(error)
      toast.error("Failed to update role")
    }
  }

  const columns = useMemo(() => {
    return [
      ...UserColumns?.map((item) => {
        if(item.accessorKey === "role") {
          return {
            ...item,
            cell: ({row}: { row: Row<any> }) => 
                  <DataTableRoleCell 
                      role={row.original.role} 
                      onRoleChange={(newRole:UserRoleEnum) => roleChangeHandler(row.original._id,newRole)} 
                      roleChanging = {row.original._id === currentUserId}
                      disabled = {isUpdating}
                    />
          }
        }
        return item
      }),
      // {
      //   accessorKey: "actions",
      //   header: ({column}: { column: Column<any> }) => <DataTableColumnHeader column={column} title="Actions" />,
      //   enableSorting: false,
      //   cell: ({row}: { row: Row<any> }) => (
      //     <div className="flex items-center gap-2">
      //       <Button variant="outline" size="icon" onClick={() => {
      //         setOpenUserDetail(true)
      //         setCurrentUserId(row.original._id)
      //       }}>
      //         <EyeIcon className="w-4 h-4" />
      //       </Button>
      //       <Button variant="outline" size="icon" onClick={() => handleDelete(row.original._id)}>
      //         <TrashIcon className="w-4 h-4 text-red-500" />
      //       </Button>
      //     </div>
      //   )
      // }
    ]
  }, [isUpdating])

  return (
    <div className="p-2 md:p-8">
      <AdminHeader 
        title="Users"
        description="Manage your users"
        canAdd={false}
      />

      <div className="">
        <DataTable 
          columns={columns} 
          data={users?.data ?? []} 
          loading={isLoading || isFetching} 
          pagination={pagination}
          setPagination={setPagination} 
          setSearch={setSearch}
          search={search}
          totalItems={users?.totalItems ?? 0}
          refetch={refetch}
        />
      </div>

      {/* <UserDetail 
        open={openUserDetail}
        onOpenChange={setOpenUserDetail}
        userId={currentUserId}
      /> */}

    </div>
  )
}

export default UsersPage 