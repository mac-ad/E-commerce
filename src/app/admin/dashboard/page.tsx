"use client";

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Loader2, DollarSign, Package, ShoppingCart, Users } from 'lucide-react'
import OrderStatus from '@/app/components/OrderStatus'
import { OrderStatus as OrderStatusType } from '@/utils/types/api/common';
import { Table, TableCell } from '@/components/ui/table';
import { TableBody } from '@/components/ui/table';
import { TableHead, TableRow } from '@/components/ui/table';
import { TableHeader } from '@/components/ui/table';
import { useGetDashboardQuery } from '@/features/api/userApiSlice';

const DashboardPage = () => {
  const {data, isLoading} = useGetDashboardQuery();
  const dashboardData = data?.data;
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="text-lg text-muted-foreground">Welcome to your admin dashboard</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border bg-white p-6 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-green-100 rounded-xl">
                <DollarSign className="w-8 h-8 text-green-700" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">NPR {dashboardData?.totalRevenue?.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-100 rounded-xl">
                <ShoppingCart className="w-8 h-8 text-blue-700" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{dashboardData?.totalOrders}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-purple-100 rounded-xl">
                <Package className="w-8 h-8 text-purple-700" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Total Products</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{dashboardData?.totalProducts}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-orange-100 rounded-xl">
                <Users className="w-8 h-8 text-orange-700" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Total Customers</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{dashboardData?.totalUsers}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6">
          <div className="rounded-2xl border bg-white p-6">
            <h2 className="text-xl font-semibold mb-4">Orders by Status</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {Object.entries(dashboardData?.ordersByStatus || {}).map(([status, count]) => (
                <div key={status} className="p-4 rounded-xl bg-gray-50">
                  <OrderStatus status={status as OrderStatusType} type="order" />
                  <p className="mt-2 text-2xl font-bold">{count as number}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6">
            
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dashboardData?.recentOrders?.map((order: any) => (
                    <TableRow key={order?._id}>
                      <TableCell>{order?._id}</TableCell>
                      <TableCell>{order?.user?.fullName}</TableCell>
                      <TableCell>${order?.totalAmount?.toLocaleString()}</TableCell>
                      <TableCell>
                        <OrderStatus status={order?.status as OrderStatusType} type="order" />
                      </TableCell>
                      <TableCell>{new Date(order?.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
