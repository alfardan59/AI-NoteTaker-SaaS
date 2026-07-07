import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
        const {userId} = await auth()
        if(!userId){
            return NextResponse.json({error:'Not authenticated'},{status:401})
        }
        const user = await prisma.user.findUnique({
            where:{
                clerkId:userId
            },
            select:{
                id:true,
                currentPlan:true,
                subscriptionStatus:true,
                chatMessagesToday:true,
            }
        })

        if(!user){
            return NextResponse.json({error: "User not found"}, {status:404})
        }

        const chatCheck = await canUserChat(user.id)
    } catch (error) {
        
    }
}