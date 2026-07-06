'use client'

interface PlanLimits{
    meetings: number
    chatMessages: number
}

interface UsageData{
    currentPlan: string
    subscriptionStatus: string
    meetingsThisMonth: number
    chatMessagesToday: number
    billingPeriofStar: string | null
}

interface UsageContexttype{
    usage:UsageData | null
    loading: boolean
    canChat: boolean
    canScheduleMeeting: boolean
    limits: PlanLimits
    incrementChatUsage: () => Promise<void>
    incrementMeetingUsage : () => Promise<void>
    refreshUsage: () => Promise<void>
}