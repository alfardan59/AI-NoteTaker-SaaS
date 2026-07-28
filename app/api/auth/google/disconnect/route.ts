import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { error } from "console";
import { NextResponse } from "next/server";

export async function POST(){
    try {
        const {userId} = await auth()
        if(!userId){
            return NextResponse.json({error:"Not authed"},{status:401})
        }
        await prisma.user.update({
            where:{
                clerkId:userId
            },
            data:{
                calendarConnected:false,
                googleAccessToken:null,
                googleRefreshToken:null,
                googleTokenExpiry:null
            }
        })
        return NextResponse.json({success:true, message:"Calendar disconnected successfully!"})
    } catch (error) {
        console.error("Disconnect error:",error)
        return NextResponse.json({error:'Failed to diconnect calendar'},{status:500})
    }
}