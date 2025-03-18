"use client"

import { useRouter } from "next/navigation"

const page = () => {


const router = useRouter()

router.push("/admin/dashboard")

  return (
    null
  )
}

export default page
