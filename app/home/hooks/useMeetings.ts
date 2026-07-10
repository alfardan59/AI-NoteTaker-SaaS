import { useAuth } from "@clerk/nextjs"
import { useState } from "react"

export interface CalendarEvent{
    id: string
    summary?: string
    start?:{
        dateTime?:string
        date?:string
    }
    attendees?:Array<{email: string}>
    location?: string
    hangoutlink?: string
    conferenceData?: any
    botScheduled: boolean
    meetingId:string
}

export interface PastMeeting{
    id:string
    title:string
    description?: string | null
    meetingUrl : string | null
    startTime : Date
    endTime: Date
    attendees? : any
    transcriptReady : boolean
    recordingUrl?: string | null
    speakers?: any
}

export function useMeetings(){

    const {userId}=useAuth()

    const [upcomingEvents, setUpcomingEvent]= useState<CalendarEvent[]>([])
    const [pastMeetings, setPastMeetings] = useState<PastMeeting[]>([])
    const [loading, setLoading] = useState(false)
    const [pastLoading, setPastLoading] = useState(false)
    const [connected, setConencted] = useState(false)
    const [error, setError] = useState<string>("")
    const [botToggles, setBotToggle] = useState<{[key:string]:boolean}>({})
    const [initialLoading, setInitialLoading] = useState(true)

    
}