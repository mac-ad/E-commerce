import { Settings, ShoppingBag, Users } from "lucide-react";

import { ShoppingCart } from "lucide-react";

import { Home, Package } from "lucide-react";

export const sidebarDataDefault = {
    navMain: [
        {
            title: "Dashboard",
            url: "/admin/dashboard",
            icon: Home,
            isActive: true,
        },
        {
            title: "Products",
            url: "/admin/products",
            icon: Package,
            isActive: false,
        },
        {
            title: "Orders",
            url: "/admin/orders",
            icon: ShoppingCart,
            isActive: false,
        },
        // {
        //     title: "Customers",
        //     url: "/admin/customers",
        //     icon: Users,
        //     isActive: false,
        // },
        
        {
            title: "Categories",
            url: "/admin/category",
            icon: Package,
            isActive: false,
        },
        {
            title: "Brands",
            url: "/admin/brand",
            icon: ShoppingBag,
            isActive: false,
        },
        {
            title: "Banners",
            url: "/admin/banner",
            icon: ShoppingBag,
            isActive: false,
        },
        {
            title: "Users",
            url: "/admin/users",
            icon: Users,
            isActive: false,
        },
        {
            title: "Settings",
            url: "/admin/settings",
            icon: Settings,
            isActive: false,
        },
    ],
}