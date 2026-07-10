import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const {userId} = await auth()
        if(!userId){
            return NextResponse.json({error:"Not Authenticated!"}, {status:401})
        }
        const user = await prisma.user.findUnique({
            where:{
                clerkId:userId
            }
        })

        if(!user){
            return NextResponse.json({error: "User Not Found"}, {status:404})
        }
        const pastMeetings = await prisma.meeting.findMany({
            where:{
                userId:user.id,
                meetingEnded: true
            },
            orderBy:{
                endTime: 'desc'
            },
            take: 20
        })
        return NextResponse.json({meetings:pastMeetings})
    }catch(error){
        return NextResponse.json({
            error:"Failed to fetch past meetings",
            meetings:[]
        },{status:500})
    }
}