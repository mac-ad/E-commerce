import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import React from 'react'

const OtpInput = ({onComplete}:{onComplete: (value: string) => void}) => {
  return (
    <InputOTP
        maxLength={6}
        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        onComplete={(value) => onComplete(value)}
    >
        <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
        </InputOTPGroup>
    </InputOTP>
  )
}

export default OtpInput
