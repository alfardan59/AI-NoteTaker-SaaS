import { useAuth } from "@clerk/nextjs"
import { useEffect, useState } from "react"

export interface Integration{
    platform:'google-calendar' | 'trello' | 'jira' | 'asana' | 'slack'
    name: string
    description: string
    connected: boolean
    boardName?: string
    projectName?: string
    channelName?: string
    logo: string
}

export function useIntegration(){
    const {userId} = useAuth()

    const [integrations, setIntegrations]=useState<Integration[]>([
        {
            platform: 'slack',
            name:'Slack',
            description:'Post meeting summaries to you Slack',
            connected:false,
            channelName:undefined,
            logo:'/slack.png'
        },
        {
            platform: 'trello',
            name:'Trello',
            description:'Add action items to your Trello boards',
            connected: false,
            channelName:undefined,
            logo:'/trello.png'
        },
        {
            platform: 'jira',
            name:'Jira',
            description:'Create tickets for developement task',
            connected:false,
            channelName:undefined,
            logo:'/jira.png'
        },
        {
            platform: 'asana',
            name:'Asana',
            description:'Sync task with your team projects',
            connected:false,
            channelName:undefined,
            logo:'/asana.png'
        },
        {
            platform: 'google-calendar',
            name:'Google Calendar',
            description:'Auto-sync meetings',
            connected:false,
            channelName:undefined,
            logo:'/gcal.png'
        },
        
    ])

    const [loading, setLoading]=useState(true)
    const [setupMode, setSetupMode] = useState<string|null>(null)
    const [setupData, setSetupData] = useState<any>(null)
    const [seupLoading, setSetupLoading] = useState(false)

    useEffect(()=>{
        if(userId){
            fetchIntegration()
        }
        const urlParams=new URLSearchParams(window.location.search)
        const setup = urlParams.get('setup')
        if(setup && ['trello', 'jira', 'asana', 'slack'].includes(setup)){
            setSetupMode(setup)
            fetchSeupData(setup)
        }
    },[userId])

    const fetchIntegration = async()=>{
        try {
            const response = await fetch('/api/integrations/status')  //We haven't made this api we will mke this in future
            const data=await response.json()

            const calendarResponse = await fetch("/api/user/calendar-status")
            const calendarData=await calendarResponse.json()

            setIntegrations(prev=>prev.map(integration=>{
                if(integration.platform === 'google-calendar'){
                    return{
                        ...integration,
                        connected: calendarData.connected || false
                    }
                }
                const status = data.find((d:any)=>d.platform === integration.platform)
                return {
                    ...integration,
                    connected: status?.connected || false,
                    boardName: status?.boardName,
                    projectName: status?.process,
                    channelName: status?.channelName
                }
            }))

        } catch (error) {
            console.error("Error fetching Integration:",error)
        } finally{
            setLoading(false)
        }
    }

    const fetchSeupData = async(platform:string)=>{
        try {
            const response = await fetch(`/api/integrations/${platform}/setup`) //We haven't made this api we will make this in future
            const data = await response.json()
            setSetupData(data)
        } catch (error) {
            console.error(`Error fetching ${platform} setup data:`, error)
        }
    }

    const handleConnect = (platform:string)=>{
        if(platform === 'slack'){
            window.location.href = '/api/slak/install?return=integrations'
        } else if(platform === 'google-calendar'){
            window.location.href='/api/auth/google/direct-connect'
        }else{
            window.location.href=`/api/integrations/${platform}/auth`
        }
    }
    
}