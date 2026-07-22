import { prisma } from "@/lib/db"
import { JiraAPI } from "@/lib/integrations/jira/jira"
import { refreshJiraToken } from "@/lib/integrations/jira/refreshToken"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

async function getValidToken(integration:any){
    if(integration.expiresAt && new Date()>integration.expiresAt){
        const updated = await refreshJiraToken(integration)
        return updated.accessToken
    }

    return integration.accessToken
}

export async function GET(){
    const {userId} = await auth()

    if(!userId){
        return NextResponse.json({error:"Unauthorized"},{status:401})
    }

    const integration = await prisma.userIntegration.findUnique({
        where:{
            userId_platform:{
                userId:userId,
                platform:'jira'
            }
        }
    })

    if(!integration || !integration.workspaceId){
        return NextResponse.json({error:"Not connected"}, {status:400})
    }
    try {
        const validToken = await getValidToken(integration)
        const jira = new JiraAPI()

        const projects = await jira.getProjects(validToken, integration.workspaceId)
        return NextResponse.json({
            projects:projects.values || []
        })

    } catch (error) {
        console.error("Error fetching jira projects:", error)
        return NextResponse.json({error: "Failed to fetch projects"},{status:500})
    }
}