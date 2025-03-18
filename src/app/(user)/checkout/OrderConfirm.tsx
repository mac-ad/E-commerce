import { Button } from "@/components/ui/button"
import Link from "next/link"

export const OrderConfirmed = () => {
    return (
        <div className="py-20 flex flex-col items-center justify-center space-y-6 px-4">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Order Confirmed!</h2>
          <p className="text-lg text-gray-600">Thank you for your purchase</p>
        </div>

        <div className="max-w-md text-center space-y-3">
          <p className="text-gray-600">
            We've sent an email confirmation with your order details and tracking information.
          </p>
          <p className="text-sm text-gray-500">
            Please check your email for updates about your order status. You can also track your order status in your account dashboard.
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg max-w-md text-center">
          <p className="text-sm text-blue-700">
            <span className="font-medium">Note:</span> If you don't receive an email within 5 minutes, please check your spam folder or contact our support team.
          </p>
        </div>

        <Link href="/">
          <Button className="mt-6 bg-[#0171b6] text-white hover:bg-[#015da1]">
            Continue Shopping
          </Button>
        </Link>
      </div>
    )
}