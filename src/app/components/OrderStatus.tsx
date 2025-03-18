"use client"

import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OrderStatus as OrderStatusType, PaymentStatus as PaymentStatusType } from "../utils/types/api/common"
import { Loader2 } from "lucide-react"
import { useMemo } from "react"

interface OrderStatusProps {
  status: OrderStatusType | PaymentStatusType
  onStatusChange?: (newStatus: OrderStatusType | PaymentStatusType) => void
  statusChanging?: boolean
  type: "order" | "payment"
  disabled?: boolean
}

const OrderStatus = ({ status, onStatusChange,statusChanging,type,disabled }: OrderStatusProps) => {

  const getStatusColor = (status: OrderStatusType | PaymentStatusType) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
      case 'processing':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100'
      case 'shipped':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-100'
      case 'delivered':
      case 'completed':
        return 'bg-green-100 text-green-800 hover:bg-green-100'
      case 'cancelled':
      case 'failed':
        return 'bg-red-100 text-red-800 hover:bg-red-100'
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100'
    }
  }

  if (!onStatusChange) {
    return (
      <Badge className={`${getStatusColor(status)} font-medium capitalize`}>
        {status}
      </Badge>
    )
  }

  const options = useMemo(() => {
    if(type === "order") {
      return [
        {label: "Pending", value: "pending"},
        {label: "Processing", value: "processing"},
        {label: "Shipped", value: "shipped"},
        {label: "Delivered", value: "delivered"},
        {label: "Cancelled", value: "cancelled"},
      ]
    }
    
    return [
      {label: "Pending", value: "pending"},
      {label: "Completed", value: "completed"},
      {label: "Failed", value: "failed"},
    ]
  },[type])

  return (
    <Select value={status} onValueChange={(value: any) => onStatusChange(value)} disabled={disabled}>
      <SelectTrigger className="w-[auto] flex items-center  gap-2 border-none shadow-none pl-0 outline-none" hideChevron={true}>
        <SelectValue className = "border-none">
          {
            statusChanging ? (
                <Badge className={`${getStatusColor(status)} font-medium capitalize p-2 px-4 w-full border`}>
                    <Loader2 className="w-4 h-4 animate-spin" />
                </Badge>
            ) : (
                <Badge className={`${getStatusColor(status)} font-medium capitalize p-2 px- w-full border4`}>
                    {status}
                </Badge>
            )   
          }
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
        {
          options.map((option) => (
            <SelectItem key={option?.value} value={option.value}>
              <Badge className={`${getStatusColor(option?.value as OrderStatusType | PaymentStatusType)} font-medium capitalize p-1 px-4`}>
                {option?.label}
              </Badge>
            </SelectItem>
          ))
        }
        </SelectGroup>
       
      </SelectContent>
    </Select>
  )
}

export default OrderStatus
