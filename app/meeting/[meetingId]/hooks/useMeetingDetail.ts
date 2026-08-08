import { useChatCore } from "@/app/hooks/chat/useChatCore"
import { useAuth } from "@clerk/nextjs"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export interface MeetingData{
    id: string
    title:string
    description:string
    startTime:string
    endTime: string
    transcipt?:string
    summary?:string
    actionItems?:Array<{
        id:string
        text:string
    }>
    processed:boolean
    processedAt?:string
    recordingUrl?:string
    emailSent:boolean
    emailSentAt?:boolean
    userId?:string
    user?:{
        name?:string
        email?:string
    }
    ragProcessed?:boolean
}

export function useMeetingDetails(){
    const params=useParams()
    const meetingId = params.meetingId as string
    const {userId, isLoaded}=useAuth()

    const [isOwner, setIsOwner]=useState(false)
    const [userChecked, setUserChecked] = useState(false)

    const [activeTab, setActiveTab]=useState<'summary' | 'transcript'>('summary')
    const [localActionItems,setLocalActionItems] = useState<any[]>([])

    const [meetingData, setMeetingData]=useState<MeetingData | null>(null)
    const [loading, setLoading]=useState(true)

    const chat=useChatCore({
        apiEndpoint:'/api/rag/chat-meeting', //We will create this endpoint
        getRequestBody:(input)=>({
            meetingId,question:input
        })
    })

    const handleSendMessage = async()=>{
        if(!chat.chatInput.trim() || !isOwner){
            return
        }
        await chat.handleSendMessage()
    }
    const handleSuggestionClick=(suggestion:string)=>{
        if(!isOwner){
            return
        }
        chat.handleSuggestionClick(suggestion)
    }

    const handleInputChange=(value:string)=>{
        if(!isOwner){
            return
        }
        chat.handleInputChange(value)
    }

    //useEffect to fetch the meetingId
    useEffect(()=>{
        const fetchMeetingData=async()=>{
            try {
                const response=await fetch(`/api/meetings/${meetingId}`) //We will create this route
                if(response.ok){
                    const data = await response.json()
                    setMeetingData(data)

                    if(isLoaded){
                        const ownerStatus=userId===data.userId 
                        setIsOwner(ownerStatus)
                        setUserChecked(true)
                    }
                    if(data.actionItems && data.actionItem.length>0){
                        setLocalActionItems(data.actionItems)
                    } else{
                        setLocalActionItems([])
                    }
                }
            } catch (error) {
                console.error('error fetching meeting:',error)
            } finally{
                setLoading(false)
            }
        }
        if(isLoaded){
            fetchMeetingData()
        }
    },[meetingId,userId,isLoaded])

    //useEffect for transcript
    useEffect(()=>{
        const processTranscript=async()=>{
            try {
                const meetingResponse=await fetch(`/api/meetings/${meetingId}`) //We will create this route
                if(!meetingResponse.ok){
                    return
                }
                const meeting=await meetingResponse.json()
                if(meeting.transcript && !meeting.ragProcessed && userId===meeting.userId){
                    let transcriptText=''
                    if(typeof meeting.transcript==='string'){
                        transcriptText=meeting.transcript
                    } else if(Array.isArray(meeting.transcript)){
                        transcriptText=meeting.transcript
                        .map((segment:any)=>`${segment.speaker}:${segment.words((w:any)=>w.word).join(' ')}`)
                        .join('\n')
                    }

                    await fetch('/api/rag/process',{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body: JSON.stringify({
                            meetingId,
                            transcript:transcriptText,
                            meetingTitle: meeting.title
                        })
                    })
                }
            } catch (error) {
                console.error("Error checking RAG Processing", error)
            }
        }
        if(isLoaded && userChecked){
            processTranscript()
        }
    },[meetingId, userId, isLoaded, userChecked])
}