import "dotenv/config";

import * as path from "path";
import * as fs from "fs";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/db";



async function seedMeetings() {
  try {
    const dataPath = path.join(__dirname, "data");

    const transcript1 = JSON.parse(
      fs.readFileSync(path.join(dataPath, "transcripts", "transcript1.json"), "utf-8")
    );
    const transcript2 = JSON.parse(
      fs.readFileSync(path.join(dataPath, "transcripts", "transcript2.json"), "utf-8")
    );
    const transcript3 = JSON.parse(
      fs.readFileSync(path.join(dataPath, "transcripts", "transcript3.json"), "utf-8")
    );

    const summaryData = JSON.parse(
      fs.readFileSync(path.join(dataPath, "summaries.json"), "utf-8")
    );
    const actionItems = JSON.parse(
      fs.readFileSync(path.join(dataPath, "action-items.json"), "utf-8")
    );
    const titles = JSON.parse(
      fs.readFileSync(path.join(dataPath, "title.json"), "utf-8")
    );

   const user = await prisma.user.findUnique({
        where: {
            clerkId: "user_3GUtjfZ5yY3WCVtft6pcxQfzkCa",
        },
    });

    if (!user) {
        throw new Error(
            'User with clerkId "user_3G511xUIsBCIhDYmDsZ1fxjrCEs" does not exist. Please create the user first.'
        );
    }
    const recordingUrl =
      "https://meetingbot1.s3.eu-north-1.amazonaws.com/test-audio.mp3";

    const now = new Date();
    const startTime = new Date(now.getTime() - 30 * 60 * 1000);
    const endTime = new Date(now.getTime() - 5 * 60 * 1000);

    const meetings = [
      {
        transcript: transcript1,
        title: titles[0].title,
        description: titles[0].description,
      },
      {
        transcript: transcript2,
        title: titles[1].title,
        description: titles[1].description,
      },
      {
        transcript: transcript3,
        title: titles[2].title,
        description: titles[2].description,
      },
    ];

    for (const meeting of meetings) {
      await prisma.meeting.create({
        data: {
          userId: user.id,
          title: meeting.title,
          description: meeting.description,
          meetingUrl: "https://meet.google.com/iii-pkjh-uxz",
          startTime,
          endTime,
          calendarEventId: randomUUID(),
          isFromCalendar: true,
          botScheduled: true,
          botSent: true,
          botId: randomUUID(),
          botJoinedAt: startTime,
          meetingEnded: true,
          transcriptReady: true,
          transcript: meeting.transcript,
          recordingUrl,
          summary: summaryData.summary,
          actionItems,
          processed: true,
          processedAt: endTime,
          emailSent: true,
          emailSentAt: endTime,
          ragProcessed: false,
        },
      });
    }
  } catch (error) {
    console.error("Error seeding Meeting", error);
    console.dir(error, { depth: null });
  }
}

seedMeetings();