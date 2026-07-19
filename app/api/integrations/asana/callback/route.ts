import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    const {userId} = await auth()

    const {searchParams} = new URL(request.url)

    const code = searchParams.get('code')
    const state = searchParams.get('state')
    
    if(!userId || !code || state!==userId){
        return NextResponse.redirect(new URL('/integrations/?error=auth_failed', process.env.NEXT_PUBLIC_APP_URL))
    }

    try {
        const tokenResponse = await fetch('https://app.asana.com/-/oauth_token',{
            method:'POST',
            headers:{
                'Content-Type' :'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                client_id: process.env.ASANA_CLIENT_ID!,
                client_secret: process.env.ASANA_CLIENT_SECRET!,
                redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/asana/callback`,
                code: code
            })
        })

        if(!tokenResponse.ok){
            throw new Error('Failed to exchange token code')
        }

        const tokenData = await tokenResponse.json()
    } catch (error) {
        
    }
}