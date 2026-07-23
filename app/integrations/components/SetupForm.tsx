import React, { useState } from 'react'

interface SetupFormProps{
    platform:string
    data:any
    onSubmit:(platform:string, config:any)=>void  //config is basically suppose we are in setup_route and in that boardId, platformid etc. so these are config 
    onCancel:()=>void
    loading:boolean
}

const SetupForm = ({platform,data,onSubmit,onCancel,loading}:SetupFormProps) => {
    const [selectedId, setSelectedId]=useState('')
    const [selectedName, setSelectedName]=useState('')
    const [createNew, setCreateNew]=useState(false)
    const [newName, setNewName]=useState('')

    const items = platform==='trello' ? data?.boards : platform==='slack' ? data?.channels  : data?.projects //data?.projects for other platforms like asana or jira

    const itemLabel = platform==='trello'?'board' : platform==='slack'?'channel':platform

    const handleSubmit=()=>{
        if(createNew){
            onSubmit(platform,{
                createNew:true,
                [`${itemLabel}Name`]:newName,
                workspaceId:data?.workspaceId
            })
        }else{
            onSubmit(platform,{
                [`${itemLabel}Id`]: selectedId,
                [`${itemLabel}Name`]: selectedName,
                projectKey:selectedId,
                workspaceId:data?.workspaceId
            })
        }
    }
  return (
    <div>SetupForm</div>
  )
}

export default SetupForm