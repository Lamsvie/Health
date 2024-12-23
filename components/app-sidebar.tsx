'use client'

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user"
import { getPage } from "@/lib/roledashboard"
import { usePathname } from "next/navigation"
import clsx from "clsx"



export function AppSidebar({currentUser} : { currentUser : any}) {

  
  const items = getPage(currentUser.role, currentUser.id)  

  const avatar = `${currentUser.firstName[0]}${currentUser.lastName[0]}`
  const user= {
    id: currentUser.id,
    name: currentUser.firstName,
    email: currentUser.email,
    avatar: avatar,
  }

  const pathname = usePathname()
  

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
                <Home color="white" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  HealthCare
                </span>
              </div>
            </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items?.map((item) => (
                <SidebarMenuItem className={clsx(pathname === item.url && "text-primary bg-[#d1f2eb] border-r-4 border-primary text-sidebar-accent-foreground" , "hover:text-primary hover:bg-[#d1f2eb]  hover:text-sidebar-accent-foreground")} key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
