import { prisma } from "./db"

interface PlanLimits{
    meetings: number
    chatMessages: number
}

const PLAN_LIMITS:Record<string, PlanLimits>={
    free : { meetings:0, chatMessages:0 },
    strater : { meetings:10, chatMessages:30 },
    pro : { meetings:30, chatMessages:100 },
    premium : { meetings:-1, chatMessages:-1 },
}

export async function canUserChat(userId:string){
    const user=await prisma.user.findUnique({
        where:{
            id:userId
        }
    })

    if(!user){
        return {allowed:false, reason:"user not found"}
    }

    if(user.currentPlan === 'free' || user.subscriptionStatus === 'expired'){
        return {allowed : false, reason: 'Upgrade your plan to chat with our AI bot'}
    }

    const limits = PLAN_LIMITS[user.currentPlan]

    if(!limits){
        return {allowed:false, reason: "Invalid Subscription Plan"}
    }

    if(limits.chatMessages !== -1 && user.chatMessagesToday>=limits.chatMessages){
        return {allowed: false, reason : `You've reached your daily limits of ${limits.chatMessages} messages`}
    }
}