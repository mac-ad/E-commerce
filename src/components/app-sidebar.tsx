"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Users",
          url: "#",
        },
        {
          title: "Banners",
          url: "#",
        },
        {
          title: "Products",
          url: "#",
        },
        {
          title: "Orders",
          url: "#",
        },
        {
          title: "Brands",
          url: "#",
        },
        {
          title: "Categories",
          url: "#",
        },
      ],
    },
  ],
}

export interface SidebarData {
  navMain: {
    title: string
    url: string
    icon: any
    isActive: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
  user?: {
    name: string
    email: string
  }
}

export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  data?: SidebarData;
}

export function AppSidebar({ data, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" variant="sidebar" {...props} >
      <SidebarContent   className="bg-primary">
      {data && <NavMain items={data.navMain} />}
      </SidebarContent>
      {data?.user && (
        <SidebarFooter  className="bg-primary">
          <NavUser user={data.user} />
        </SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
  )
}
