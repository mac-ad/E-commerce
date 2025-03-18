"use client"

import { Badge } from "@/components/ui/badge"
import { UserRoleEnum } from "@/app/utils/types/api/common"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { useMemo } from "react"

interface DataTableRoleCellProps {
  role: UserRoleEnum
  onRoleChange?: (newRole: UserRoleEnum) => void
  roleChanging?: boolean
  disabled?: boolean
}

const DataTableRoleCell = ({ role, onRoleChange, roleChanging, disabled }: DataTableRoleCellProps) => {
  const getRoleColor = (role: UserRoleEnum) => {
    switch (role) {
      case UserRoleEnum.ADMIN:
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100'
      case UserRoleEnum.USER:
        return 'bg-green-100 text-green-800 hover:bg-green-100'
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100'
    }
  }

  const options = useMemo(() => {
    return [
      {label: "Admin", value: UserRoleEnum.ADMIN},
      {label: "User", value: UserRoleEnum.USER},
    ]
  }, [])

  return (
    <Select value={role} onValueChange={(value: any) => onRoleChange?.(value)} disabled={disabled}>
      <SelectTrigger className="w-[auto] flex items-center gap-2 border-none shadow-none pl-0 outline-none" hideChevron={true}>
        <SelectValue className="border-none">
          {
            roleChanging ? (
              <Badge className={`${getRoleColor(role)} font-medium capitalize py-2 px-4 w-full border`}>
                <Loader2 className="w-4 h-4 animate-spin" />
              </Badge>
            ) : (
              <Badge className={`${getRoleColor(role)} font-medium capitalize  px-4 py-2 w-full border`}>
                {role}
              </Badge>
            )
          }
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {
            options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <Badge className={`${getRoleColor(option.value)} font-medium capitalize p-1 px-4`}>
                  {option.label}
                </Badge>
              </SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default DataTableRoleCell
