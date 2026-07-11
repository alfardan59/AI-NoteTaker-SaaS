import React from 'react'
import { PastMeeting } from '../hooks/useMeetings'

interface PastmeetingsProps{
    pastMeetings: PastMeeting[]
    pastLoading: boolean
    onMeetingClick:(id:string)=>void
    getAttendeeList:(attendees:any)=>string[]
    getInitials:(name:string)=>string
}

function PastMeetings({
    pastMeetings, pastLoading, onMeetingClick, getAttendeeList, getInitials
}:PastmeetingsProps){
    if(pastLoading){
        return(
            <div className='space-y-4'>
                {[1,2,3].map((i)=>(
                    <div key={i} className='bg-card rounded-lg p-4 border border-border animate-pulse'>
                        <div className='flex justify-between items-start mb-3'>
                            <div className='flex items-center gap-3 flex-1'>
                                <div className='h-6 bg-muted rounded w-48'></div>
                                <div className='flex -space-x-2'>
                                    {[1,2,3].map((j)=>(
                                        <div key={j} className='w-6 h-6 rounded-full bg-muted'></div>
                                    ))}
                                </div>     
                            </div>
                            <div className='h-5 bg-muted rounded w-20'></div>
                        </div>
                        <div className='h-4 bg-muted rounded w-3/4 mb-3'></div>
                        <div className='h-4 bg-muted rounded w-1/2 mb-3'></div>
                        <div className='h-6 bg-muted rounded w-24'></div>
                    </div> 
                ))}
            </div>
        )
    }
}

export default PastMeetings