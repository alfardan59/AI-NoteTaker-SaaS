import { BadgeDollarSign, BotIcon, Home, Layers3, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { useUsage } from "../contexts/UsageContext";
import { title } from "process";
import { Sidebar, SidebarHeader } from "@/components/ui/sidebar";

const items = [
    {
        title:"Home",
        url:"/home",
        icon: Home
    },
    {
        title:"Integrations",
        url:"/integrations",
        icon: Layers3
    },
    {
        title:"Settings",
        url:"/settings",
        icon: Settings
    },
    {
        title:"Chat with AI",
        url:"/chat",
        icon: BotIcon
    },
    {
        title:"Pricing",
        url:"/pricing",
        icon: BadgeDollarSign
    },
]

export function AppSidebar(){
    const pathname = usePathname()
    const {usage, limits} = useUsage()

    const meetingProgress = usage && limits.meetings !== -1 ? Math.min((usage.meetingsThisMonth / limits.meetings)*100, 100) : 0

    const chatProgress = usage && limits.chatMessages !== -1 ? Math.min((usage.chatMessagesToday / limits.chatMessages)*100, 100) : 0

    const getUpgradeInfo = ()=>{
        if(!usage) return null

        switch(usage.currentPlan){
            case 'free':
                return {
                    title: "Upgrade to Sarter",
                    description : "Get 10 meetings per month and 30 daily chat messages",
                    showButton : true
                }
            case 'starter':
                return {
                    title: "Upgrade to Pro",
                    description : "Get 30 meetings per month and 100 daily chat messages",
                    showButton : true
                }
            case 'pro':
                return {
                title: "Upgrade to Premium",
                description : "Get unlimited meetings and chat messages per month",
                showButton : true
            }
            case 'premium':
                return {
                title: "You are on Premium!",
                description : "Enjoying unlimited access to our features",
                showButton : false
            }
            default:
                return {
                    title: "Upgrade Your Plan",
                    description : "Get access to more features",
                    showButton : true
                }
        }
    }

    const upgradeinfo = getUpgradeInfo()

    return(
        <Sidebar collapsible="none" className="border-r border-sidebar-border h-screen">
            <SidebarHeader className="border-b border-sidebar-border p-4">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                        <BotIcon className="w-4 h-4" />
                    </div>
                    <span className="text-lg font-semibold text-sidebar-foreground">
                        MeetingBot
                    </span>
                </div>
            </SidebarHeader>
        </Sidebar>
    )
    
}