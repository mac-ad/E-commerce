"use client"

import { AppSidebar, SidebarData } from '@/components/app-sidebar'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Sidebar, SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { RootState } from '@/store/store'
import { Home, HomeIcon, Package, Settings, ShoppingCart, Users } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { sidebarDataDefault } from '../utils/constants/navbar'
import { BASE_URL } from '../utils/constants/routes'
import { useLazyGetProfileQuery } from '@/features/api/userApiSlice'



const AdminLayout = ({children}:{children:React.ReactNode}) => {

    const [sidebarOpen, setSidebarOpen] = useState(true)

    const user = useSelector((state:RootState) => state.auth.user)

    const [getUser, {isLoading: isUserLoading}] = useLazyGetProfileQuery();

    const sidebarData:SidebarData | null = useMemo(() => {
        return {
            ...sidebarDataDefault,
            user:{
                name: user?.name ?? "", // Provide default empty string
                email: user?.email ?? "", // Provide default empty string
            }
        }
    },[user])

    const pathname = usePathname()
    const breadcrumbItems = useMemo(() => {
        const segments = pathname.split('/').filter(item => item !== "" && item !== "admin")
        return segments.map((segment, index) => {
            const path = `/${segments.slice(0, index + 1).join('/')}`
            return {
                title: segment.charAt(0).toUpperCase() + segment.slice(1),
                href: path
            }
        })
    }, [pathname])

    useEffect(() => {
        return () => {
            // Cleanup function that runs on unmount
            getUser();
        };
    }, []);


    // useEffect(() => {
    //     if(window.innerWidth < 768 && sidebarOpen) setSidebarOpen(false)
    // }, [pathname])

    return (
        <div>
            <SidebarProvider
                open = {sidebarOpen}
                onOpenChange = {setSidebarOpen}
            >
                <AppSidebar 
                    data = {sidebarData}
                />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href="/admin/dashboard">
                                            <HomeIcon className="h-4 w-4" />
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="hidden md:block" />
                                    {
                                        breadcrumbItems.map((item, index) => (
                                            <BreadcrumbItem key={index}>
                                                <BreadcrumbLink href={`/admin${item.href}`}>
                                                    {item.title}
                                                </BreadcrumbLink>
                                            </BreadcrumbItem>
                                        ))
                                    }
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </header>
                    <div 
                    >
                       
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
            
        </div>
    )
}

export default AdminLayout
