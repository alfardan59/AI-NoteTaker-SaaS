'use client'

import React from "react";
import { useMeetings } from "./hooks/useMeetings";
import { useRouter } from "next/navigation";

const page = () => {
  const {
    userId,
    upcomingEvents,
    pastMeetings,
    loading,
    pastLoading,
    connected,
    error,
    botToggles,
    initialLoading,
    fetchUpComingEvents,
    fetchPastmeetings,
    toggleBot,
    directOAuth,
    getAttendeeList,
    getInitials,
  } = useMeetings();

  const router = useRouter()
  const handleMeetingClick = (meetingId:string)=>{
    router.push(`/meeting/${meetingId}`)
  }

  if(!userId){
    return(
      <div className="flex items-center justify-center h-screen">
        Please SignIn
      </div>
    )
  }

  return <div className="min-h-screen bg-background">
    <div className="flex gap-6">
      <div className="flex-1">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">Past Meetings</h2>
        </div>
        {/* Past Meetings component */}
      </div>
    </div>
  </div>;
};

export default page;
