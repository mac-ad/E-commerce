'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useResetPasswordMutation, useSendOTPMutation, useVerifyOTPMutation } from '@/features/api/apiSlice'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import OtpInput from '@/app/components/OtpInput'

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
})

const passwordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<'email' | 'otp' | 'password'>('email')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')

  const [sendOTP, {isLoading:isSendingOTP,isError:isSendingOTPError,error:sendingOTPError}] = useSendOTPMutation()
  const [verifyOTP, {isLoading:isVerifyingOTP,isError:isVerifyingOTPError,error:verifyingOTPError}] = useVerifyOTPMutation()
  const [resetPassword, {isLoading:isResettingPassword,isError:isResettingPasswordError,error:resettingPasswordError}] = useResetPasswordMutation()

  const router = useRouter()

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
  })

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  })

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  async function handleEmailSubmit(values: z.infer<typeof emailSchema>) {
    try {
      setIsLoading(true)
      // Make API call to send OTP
      await sendOTP({email:values.email}).unwrap()
      setEmail(values.email)
      setStep('otp')
      toast.success('OTP sent', {
        description: 'Please check your email for the OTP',
      })
    } catch (error) {
      toast.error('Failed to send OTP')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleOtpSubmit(values: z.infer<typeof otpSchema>) {
    try {
      setIsLoading(true)
      // Verify OTP
      await verifyOTP({email,otp:values.otp}).unwrap()
      setStep('password')
      toast.success('OTP verified')
    } catch (error) {
      toast.error('Failed to verify OTP')
    } finally {
      setIsLoading(false)
    }
  }

  async function handlePasswordSubmit(values: z.infer<typeof passwordSchema>) {
    try {
      setIsLoading(true)
      // Reset password
      await resetPassword({email,password:values.password}).unwrap()
      toast.success('Password reset successful')
      router.push('/login')
    } catch (error) {
      toast.error('Failed to reset password')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpComplete = (value: string) => {
    otpForm.setValue('otp', value)
  }

  return (
        <div className="w-full bg-gray-200 min-h-[70vh] flex justify-center items-center">
      <div className="flex justify-center p-4 w-full ">
        <div className="w-full md:w-[60%] lg:w-[40%]  bg-white py-6 sm:py-8  max-w-[600px] mx-auto md:py-11 px-6 sm:px-8 md:px-12 flex flex-col rounded-sm shadow-lg mx-4 sm:mx-0">
          <div className="space-y-4 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0171b6]">Forgot Password</h1>
            <p className="text-sm sm:text-base text-gray-500 font-light">
              {step === 'email' && 'Enter your email to receive an OTP'}
              {step === 'otp' && 'Enter the OTP sent to your email'}
              {step === 'password' && 'Enter your new password'}
            </p>
          </div>

          {step === 'email' && (
            <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="mt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-light text-[#0171b6]">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  {...emailForm.register('email')}
                  disabled={isLoading}
                  className="border border-gray-300 p-2 text-xs sm:text-sm font-extralight rounded-sm"
                />
                {emailForm.formState.errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {emailForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full mt-4"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="animate-spin" /> : 'Send OTP'}
              </Button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={otpForm.handleSubmit(handleOtpSubmit)} className="mt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-light text-[#0171b6]">
                  One-Time Password
                </label>
                <div className="flex justify-center">
                    <OtpInput onComplete={handleOtpComplete} />
                </div>
                {otpForm.formState.errors.otp && (
                  <p className="text-red-500 text-xs mt-1 text-center">
                    {otpForm.formState.errors.otp.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full mt-4"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="animate-spin" /> : 'Verify OTP'}
              </Button>
            </form>
          )}

          {step === 'password' && (
            <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="mt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-light text-[#0171b6]">
                  New Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter new password"
                  {...passwordForm.register('password')}
                  disabled={isLoading}
                  className="border border-gray-300 p-2 text-xs sm:text-sm font-extralight rounded-sm"
                />
                {passwordForm.formState.errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {passwordForm.formState.errors.password.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-light text-[#0171b6]">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  placeholder="Re-enter password"
                  {...passwordForm.register('confirmPassword')}
                  disabled={isLoading}
                  className="border border-gray-300 p-2 text-xs sm:text-sm font-extralight rounded-sm"
                />
                {passwordForm.formState.errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {passwordForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full mt-4"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="animate-spin" /> : 'Reset Password'}
              </Button>
            </form>
          )}

          <Link href="/login" className="mt-6 text-center">
            <span className="text-xs sm:text-sm font-light text-gray-500">
              Remember your password? <span className="text-[#0171b6] font-semibold hover:text-[#015da1] transition-colors">Login here</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
