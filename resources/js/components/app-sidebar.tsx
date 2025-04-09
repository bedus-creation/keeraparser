import { NavFooter } from "@/components/nav-footer"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { type NavItem } from "@/types"
import { Link } from "@inertiajs/react"
import { BookOpen, FileText, History, MessageCircle } from 'lucide-react';
import AppLogo from "./app-logo"

const mainNavItems: NavItem[] = [
    {
        title: "Chat",
        url: "/chats",
        icon: MessageCircle,
    },
    {
        "title": "Parsers",
        "url": "/parsers",
        "icon": FileText,
    },
    {
        "title": "Histories",
        "url": "/histories",
        "icon": History,
    },
]

const footerNavItems: NavItem[] = [
    {
        title: "Documentation",
        url: "https://laravel.com/docs/starter-kits",
        icon: BookOpen,
    },
]

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo/>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems}/>
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto"/>
                <NavUser/>
            </SidebarFooter>
        </Sidebar>
    )
}
