import { useAuth } from "@clerk/nextjs"
import { useState } from "react"

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
    const {useId} = useAuth()

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
}