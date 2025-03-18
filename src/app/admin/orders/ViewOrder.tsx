"use client"

import { Badge } from "@/components/ui/badge"
import { useGetOrderQuery, useLazyGetOrderQuery } from "@/features/api/orderApiSlice"
import { cn } from "@/lib/utils"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import OrderReceiptSkeleton from "@/app/components/skeleton/OrderReceiptSkeleton"

interface ViewOrderProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    orderId: string | null
}

const ViewOrder = ({ open, onOpenChange, orderId }: ViewOrderProps) => {
    const [getOrder, { data: order, isLoading, isError }] = useLazyGetOrderQuery()

    useEffect(() => {
        const fetchOrder = async () => {
            if (!orderId) return
            try {
                await getOrder(orderId).unwrap()
            } catch (err) {
                console.error("Error fetching order:", err)
            }
        }
        fetchOrder()
    }, [orderId, getOrder])

    const handleDownload = () => {
        const receiptContent = document.getElementById('receipt')
        if (!receiptContent) return

        const style = `
            <style>
                @page { size: A4; margin: 4cm; }
                body { font-family: Arial, sans-serif; color: #333; line-height: 1.2; }
                .receipt-container { max-width: 800px; margin: 0 auto; }
                .header { text-align: center; margin-bottom: 20px; }
                .invoice-title { font-size: 32px; font-weight: bold; margin-bottom: 5px; color: #1a1a1a; }
                .order-number { font-size: 16px; color: #666; margin-bottom: 10px; }
                .status-badge { 
                    display: inline-block;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-weight: 500;
                    font-size: 14px;
                }
                .status-completed { background: #dcfce7; color: #166534; }
                .status-pending { background: #fef9c3; color: #854d0e; }
                .status-failed { background: #fee2e2; color: #991b1b; }
                .section { margin: 15px 0; padding: 15px; border: 1px solid #e5e7eb; border-radius: 12px; }
                .section-title { font-size: 18px; font-weight: 600; margin-bottom: 10px; color: #1f2937; }
                .customer-info { line-height: 1.4; }
                table { width: 100%; border-collapse: collapse; margin: 10px 0; }
                th, td { padding: 8px 12px; text-align: left; border: 1px solid #e5e7eb; }
                th { background: #f8fafc; font-weight: 600; }
                .amount-row { font-weight: 600; background: #f8fafc; }
                .address-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
                .address-label { color: #6b7280; margin-bottom: 2px; }
                .address-value { font-weight: 500; color: #1f2937; }
                .print-header { display: flex; justify-content: space-between; align-items: flex-start; }
                .print-header-left { flex: 1; }
                .print-header-right {  }
                .shipping-address { margin-top: 20px; }
                @media print {
                    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                }
            </style>
        `

        const printWindow = window.open('', '', 'width=800,height=600')
        if (printWindow) {
            printWindow.document.write('<html><head><title>Order Receipt</title>')
            printWindow.document.write(style)
            printWindow.document.write('</head><body>')
            printWindow.document.write('<div class="receipt-container">')
            printWindow.document.write(receiptContent.innerHTML)
            printWindow.document.write('</div></body></html>')
            printWindow.document.close()
            printWindow.print()
        }
    }

    if (isLoading) {
        return <OrderReceiptSkeleton />
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-[400px] text-red-500 font-medium text-lg bg-red-50 rounded-lg">
                <div className="flex flex-col items-center gap-2">
                    <span>Error loading order</span>
                    <span className="text-sm text-red-400">Please try again later</span>
                </div>
            </div>
        )
    }

    if (!orderId || !order?.data) {
        return <div className="flex items-center justify-center h-full">No order selected</div>
    }

    const { data: orderData } = order
    const { user, items, paymentStatus, totalAmount, shippingAddress, phone } = orderData

    return (
        <div className="p-4">
            <div className="flex justify-end mb-4">
                <Button onClick={handleDownload} variant="outline" className="flex gap-2">
                    <Download size={16} />
                    Download Receipt
                </Button>
            </div>
            
            <div id="receipt" className="max-w-4xl mx-auto space-y-6 bg-white p-8 rounded-lg shadow-sm">
                <div className="print-header">
                    <div className="print-header-left mb-10">
                        <h1 className="text-4xl font-bold text-gray-900 mb-3">INVOICE</h1>
                        <p className="text-lg text-gray-600 mb-3">Order #{orderId}</p>
                        <Badge className={cn(
                            'text-sm px-4 py-1.5 mt-2 pointer-events-none select-none',
                            paymentStatus === "completed" ? "bg-green-100 text-green-800" :
                            paymentStatus === "pending" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                        )}>
                            {paymentStatus?.charAt(0).toUpperCase() + paymentStatus?.slice(1)}
                        </Badge>
                    </div>
                    <div className="print-header-right">
                        <div className="p-6 bg-gray-50 rounded-none">
                            <h4 className="text-xl font-semibold mb-4 text-gray-900">Customer Information</h4>
                            <div className="space-y-3">
                                <p className="text-gray-700 text-lg">{typeof user === "object" ? user?.fullName : "N/A"}</p>
                                <p className="text-gray-600">{typeof user === "object" ? user?.email : "N/A"}</p>
                                <p className="text-gray-600">Phone: {phone}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-8">
                    <section className="p-6 px-0">
                        <h4 className="text-xl font-semibold mb-6 text-gray-900">Order Items</h4>
                        <div className="overflow-hidden rounded-none border border-gray-200">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="text-left p-4 text-gray-700">Item</th>
                                        <th className="text-right p-4 text-gray-700">Quantity</th>
                                        <th className="text-right p-4 text-gray-700">Unit Price</th>
                                        <th className="text-right p-4 text-gray-700">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {items.map((item: any) => (
                                        <tr key={item.productId.name}>
                                            <td className="p-4 text-gray-800">{item.productId.name}</td>
                                            <td className="text-right p-4 text-gray-700">{item.quantity}</td>
                                            <td className="text-right p-4 text-gray-700">Rs. {item.price.toLocaleString()}</td>
                                            <td className="text-right p-4 font-medium text-gray-900">Rs. {item.total.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                    <tr className="bg-gray-50 font-semibold">
                                        <td colSpan={3} className="text-right p-4 text-gray-800">Total Amount:</td>
                                        <td className="text-right p-4 text-gray-900">Rs. {totalAmount?.toLocaleString()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="p-6 px-0 shipping-address">
                        <h4 className="text-xl font-semibold mb-6 text-gray-900">Shipping Address</h4>
                        <div className="p-6 bg-gray-50 rounded-none">
                            <div className="">
                                <p className="text-gray-700"><strong>Shipping Address:</strong> {shippingAddress?.street}</p>
                                <p className="text-gray-600"><strong>City:</strong> {shippingAddress?.city}</p>
                                <p className="text-gray-600"><strong>State:</strong> {shippingAddress?.state}</p>
                                <p className="text-gray-600"><strong>Pincode:</strong> {shippingAddress?.pincode}</p>
                                <p className="text-gray-600"><strong>Country:</strong> {shippingAddress?.country}</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default ViewOrder
