import { useUsage } from "@/app/contexts/UsageContext"
import { timeStamp } from "console"
import { useState } from "react"

export interface ChatMesaage{
    id: number
    content: string
    isBot: boolean
    timestamp: Date
}

interface UseChatCoreOptions{
    apiEndpoint:string
    getRequestBody: (input: string)=>any
}

export function useChatCore({apiEndpoint,getRequestBody}:UseChatCoreOptions){
    const [chatInput, setChatInput]=useState('')
    const[messages, setMessages]=useState<ChatMesaage[]>([])
    const [showSuggestions, setShowSuggestions]=useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const {canChat, incrementChatUsage}=useUsage()

    const handleSendMessage = async ()=>{
        if(!chatInput.trim() || isLoading){
            return
        }
        if(!chatInput){
            return
        }
        setShowSuggestions(false)
        setIsLoading(true)

        const newMessage:ChatMesaage={
            id:messages.length+1,
            content: chatInput,
            isBot: false,
            timestamp: new Date()
        }

        setMessages([...messages, newMessage])

        const currentInput=chatInput

        setChatInput('')
        try{
            const response = await fetch(apiEndpoint,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(getRequestBody(currentInput))
            })

            const data=await response.json()

            if(response.ok){
                await incrementChatUsage()

                const botMessage:ChatMesaage={
                    id:messages.length+2,
                    content: data.answer || data.response,
                    isBot: false,
                    timestamp: new Date()
                }
                setMessages(prev=>[...prev, botMessage])
            }else{
                if(data.upgradeRequired){
                    const upgradeMessage: ChatMesaage={
                        id:messages.length+2,
                        content:'Visit the pricing page to upgrade your plan and continue chatting',
                        isBot:true,
                        timestamp:new Date()
                    }
                    setMessages(prev=>[...prev, upgradeMessage])
                }else{
                    const errorMessage: ChatMesaage={
                        id:messages.length+2,
                        content:'Something went wrong, please try again',
                        isBot:true,
                        timestamp:new Date()
                    }
                    setMessages(prev=>[...prev, errorMessage])
                }
            }
        }catch(error){
            console.error('chat error:',error)
            const errorMessage: ChatMesaage={
                id:messages.length+2,
                content:'Could not connect with the server, Please check your connection and try again',
                isBot:true,
                timestamp:new Date()
            }
            setMessages(prev=>[...prev, errorMessage])
        }finally{
            setIsLoading(false)
        }
    }
}