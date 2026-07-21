import { prisma } from "@/lib/db";
import { UserIntegration } from "@/lib/generated/prisma/client";

export async function refreshAsanaToken(integration:UserIntegration){
    try {
        const response = await fetch('https://app.asana.com/-/oauth_token', {
            method:'POST',
            headers:{
                'Content-Type': 'application/x-www-form-url-encoded'
            },
            body: new URLSearchParams({
                grant_type: 'refresh-token',
                client_id: process.env.ASANA_CLIENT_ID!,
                client_secret: process.env.ASANA_CLIENT_SECRET!,
                refresh_token: integration.refreshToken!,
            }),
        })

        const data= await response.json()

        if(response.ok){
            const updatedIntegration = await prisma.userIntegration.update({
                where:{
                    id: integration.id,
                },
                data:{
                    accessToken:data.access_token,
                    refreshToken:data.refresh_token,
                    expiresAt: new Date(Date.now()+data.expires_in*1000)
                }
            })
            return updatedIntegration
        } else{
            console.error("Error refreshing asana token", data)
            throw new Error('Token Refresh Failed')
        }
    } catch (error) {
        console.error("Error refreshing asana token", error)
        throw error
    }
}