"use client"

import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export function ConditionalLayout({children}:{children:React.ReactNode}){
    const pathname = usePathname()
    const {isSignedIn} = useAuth()

    const showSidebar = pathname !== "/" && !(pathname.startsWith("/meeting/") && !isSignedIn)

    if (!showSidebar){
        return <div className="min-h-screen">{children}</div>
    }

    return (
        <SidebarProvider defaultOpen={true}>
            <div className="flex flex-screen w-full">
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    )
}