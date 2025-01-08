import { AppSidebar } from "@/components/app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { getPersonnelFolder, getUserFolder, verifyToken } from "@/lib/verifyToken";
import { Home } from "lucide-react";

export default async function Layout({ children }: { children: React.ReactNode }) {

    const currentUser = await verifyToken()
    
    if (currentUser.role === 'Patient') {
      const getUserfolder = await getUserFolder(currentUser.ref)

      return (
        <SidebarProvider>
          <AppSidebar currentUser={currentUser} userFolderId={getUserfolder._id} />
          <SidebarInset>
          <header className=" fixed bg-white w-full flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      <Home size={16} />
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="p-4 pt-16 w-full bg-gray-50 min-h-[100vh]">
            {children}
            <Toaster richColors />
          </div>
          
        </SidebarInset>
            
          
        </SidebarProvider>
      )
    }else if (currentUser.role === 'Admin') {
      return (
        <SidebarProvider>
          <AppSidebar currentUser={currentUser} userFolderId={""} />
          <SidebarInset>
          <header className=" fixed bg-white w-full flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      <Home size={16} />
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="p-4 pt-16 w-full bg-gray-50 min-h-[100vh]">
            {children}
            <Toaster richColors />
          </div>
          
        </SidebarInset>
            
          
        </SidebarProvider>
      )
    }
    
    const getPersonnelfolder = await getPersonnelFolder(currentUser.ref)
      
    return (
      <SidebarProvider>
        <AppSidebar currentUser={currentUser} userFolderId={getPersonnelfolder._id} />
        <SidebarInset>
        <header className=" fixed bg-white w-full flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    <Home size={16} />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="p-4 pt-16 w-full bg-gray-50 min-h-[100vh]">
          {children}
          <Toaster richColors />
        </div>
        
      </SidebarInset>
          
        
      </SidebarProvider>
    )

    
  }