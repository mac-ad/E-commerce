"use client"

import { Icon } from "@iconify/react"

interface NoDataFoundDataTableProps {
  message?: string
}

const NoDataFoundDataTable = ({ message = "No data found" }: NoDataFoundDataTableProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Icon 
        icon="carbon:data-table" 
        className="w-12 h-12 text-gray-400 mb-4"
      />
      <p className="text-gray-600 font-medium">{message}</p>
      <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
    </div>
  )
}

export default NoDataFoundDataTable
