'use client'

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
            fetchPastmeetings()
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

    const fetchPastmeetings = async()=>{
        setPastLoading(true)
        try {
            const response = await fetch('/api/meetings/past')
            const result = await response.json()

            if(!response.ok){
                console.error('Failed to fetch past Meetings:', result.error)
                return
            }

            if(result.error){
                return
            }
            setPastMeetings(result.meetings as PastMeeting[])
        } catch (error) {
            console.error('Failed to fetch past Meetings:', error)
        }
        setPastLoading(false)
    }

    const toggleBot = async (eventId:string)=>{
        try {
            const event = upcomingEvents.find(e => e.id === eventId)
            if(!event?.meetingId){
                return
            }
             setBotToggles(prev=>({
                ...prev,
                [eventId] : !prev[eventId]
             }))

             const response = await fetch(`/api/meetings/${event.meetingId}/bot-toggle`,{
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    botScheduled: !botToggles[eventId]
                })
             })
             if(!response.ok){
                setBotToggles(prev => ({
                    ...prev,
                    [eventId]:!prev[eventId]
                }))
             }
        } catch (error) {    
            setBotToggles(prev => ({
                ...prev,
                [eventId]:!prev[eventId]
            }))
        }    
    }

    const directOAuth = async()=>{
        setLoading(true)
        try {
            window.location.href = '/api/auth/google/direct-connect'
        } catch (error) {
            setError('failed to start direct OAuth')
            setLoading(false)
        }
    }

    const getAttendeeList = (attendees :any):string[] =>{
        if(!attendees){
            return []
        }
        try {
            const parsed = JSON.parse(String(attendees))
            if(Array.isArray(parsed)){
                return parsed.map(name=> String(name).trim())
            }
            return [String(parsed.trim())]
        } catch (error) {
            const attendeesString = String(attendees)
            return attendeesString.split(',').map(name=>name.trim()).filter(Boolean)
        }
    }

    const getInitials = (name:string):string=>{
        return name.split(' ').map(word=>word.charAt(0)).join('').toUpperCase().slice(0,2)
    }
    return{
        userId,
        upcomingEvents,
        pastMeetings,
        loading,
        pastLoading,
        connected,
        error,
        botToggles,
        initialLoading,
        fetchUpComingEvents,
        fetchPastmeetings,
        toggleBot,
        directOAuth,
        getAttendeeList,
        getInitials
    }
}
