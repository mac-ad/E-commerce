"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useEffect } from "react"
import { useWindowSize } from "@/utils/hooks/useWindowSize"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const currentPath = pathname.split("/").pop()

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="mb-10 text-lg mt-4">
        <Image
          onClick={() => router.push("/")}
          src="/images/my_electronics_logo.jpg"
          width={150}
          height={60}
          alt="Slide 1"
        />
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuButton 
            key={item.url}
            className={cn(
              "flex items-center gap-2  py-5  transition-all duration-300 text-primary-foreground hover:bg-muted/20 hover:text-primary-foreground",
              item?.url?.split("/").pop() === currentPath && "bg-muted/20  text-primary-foreground"
            )} 
            onClick={() => router.push(item.url)}
          >
            {item.icon && <item.icon />}
            <span>{item.title}</span>
          </SidebarMenuButton>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
