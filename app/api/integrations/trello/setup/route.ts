import { prisma } from "@/lib/db";
import { TrelloAPI } from "@/lib/integrations/trello/trello";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(){
    const {userId}=await auth()

    if(!userId){
        return NextResponse.json({error:'Unauthorized'},{status:401})
    }

    const integration = await prisma.userIntegration.findUnique({
        where:{
            userId_platform:{
                userId,
                platform:'trello'
            }
        }
    })

    if(!integration){
        return NextResponse.json({error:'Not connected'},{status:400})
    }

    try {
        const trello=new TrelloAPI()
        const boards=await trello.getBoards(integration.accessToken)

        return NextResponse.json({boards})
    } catch (error) {
        console.error("Error fetching baords:",error)
        return NextResponse.json({error:'Failed to fetch baords'},{status:500})
    }
}