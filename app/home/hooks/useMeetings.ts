import { useAuth } from "@clerk/nextjs"
import { useEffect, useState } from "react"

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

    const [upcomingEvents, setUpcomingEvents]= useState<CalendarEvent[]>([])
    const [pastMeetings, setPastMeetings] = useState<PastMeeting[]>([])
    const [loading, setLoading] = useState(false)
    const [pastLoading, setPastLoading] = useState(false)
    const [connected, setConnected] = useState(false)
    const [error, setError] = useState<string>("")
    const [botToggles, setBotToggles] = useState<{[key:string]:boolean}>({})
    const [initialLoading, setInitialLoading] = useState(true)

    useEffect(()=>{
        if(userId){
            fetchUpComingEvents()
            
        }
    },[userId])

    const fetchUpComingEvents = async ()=>{
        setLoading(true)
        setError('')

        try {
            const statusResponse = await fetch('/api/user/calendar-status')
            const statusData = await statusResponse.json()

            if(!statusData.connected){
                setConnected(false)
                setUpcomingEvents([])
                setError('calendar not connected for auto-sync. Connect to enable auto syncing.')
                setLoading(false)
                setInitialLoading(false)
                return
            }
            const response = await fetch('/api/meetings/upcoming')
            const result = await response.json()

            if(!response.ok){
                setError(result.error || 'Failed to fetch meetings')
                setConnected(false)
                setInitialLoading(false)
                return
            }

            setUpcomingEvents(result.events as CalendarEvent[])
            setConnected(result.connected)

            const toggles:{[key:string]:boolean} = {}
            result.events.forEach((event:CalendarEvent)=>{
                toggles[event.id]=event.botScheduled ?? true
            })

            setBotToggles(toggles)
        } catch (error) {
            setError("Failed to fetch Calendar Events. Please try again later!")
            setConnected(false)
        }
        setLoading(false)
        setInitialLoading(false)
    }
}