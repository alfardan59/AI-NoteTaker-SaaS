import { Button } from "@/components/ui/button";
import { CalendarEvent } from "../hooks/useMeetings";

interface UpcomingMeetingProps{
    upcomingEvents: CalendarEvent[]
    connected:boolean
    error:string
    loading:boolean 
    initialLoading : boolean
    botToggle : {[key:string]:boolean}
    onRefresh: ()=>void
    onToggleBot: (eventId:string)=>void
    onConnectCalendar:()=>void
}
function UpcomingMeetings({
    upcomingEvents, connected, error, loading, initialLoading, botToggle, onRefresh, onToggleBot, onConnectCalendar
}:UpcomingMeetingProps){
    return(
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-foreground">Upcoming</h2>
                <span className="text-sm text-muted-foreground">({upcomingEvents.length})</span>
            </div>

            {error && (
                <div className="bg-destructive/15 border border-destructive/20 text-destructive px-4 py-3 rounded-2xl mb-6 text-sm">
                    {error}
                </div>
            )}

            {initialLoading?(
                <div className="bg-card rounded-lg border border-border">
                    <div className="animate-pulse">
                        <div className="w-12 h-12 mx-auto bg-muted rounded-full mb-3"></div>
                        <div className="h-4 bg-muted rounded w-3/4 mx-auto mb-2"></div>
                        <div className="h-3 bg-muted rounded w-1/2 mx-auto mb-4"></div>
                        <div className="h-8 bg-muted rounded w-full"></div>
                    </div>
                </div>
            ): !connected?(
                <div className="bg-card rounded-lg p-6 text-center border border-border">
                    <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3">📆</div>
                    <h3 className="font-semibold mb-2 text-foreground text-sm">Connect Calendar</h3>
                    <p className="text-muted-foreground mb-4 text-xs">Connect Google calendar to see upcoming meetings</p>
                    <Button onClick={onConnectCalendar} disabled={loading} className='w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors text-sm'>
                        {loading ? "Connecting" : "Connect Google Calendar"}
                    </Button>
                </div>
            ):UpcomingMeetings.length===0? (
                <div className="bg-card rounded-lg p-6 text-center border border-border">
                    <h3 className="font-medium mb-2 text-foreground text-sm">No Upcoming Meetings</h3>
                    <p className="text-muted-foreground text-sm">You Calendar is Clear</p>
                </div>
            ):(
                <div className="space-y-3">
                    <Button className='w-full px-3 py-2 bg-muted rounded-lg hover:bg-muted/80 disabled:opacity-50 transition-colors text-foreground text-sm mb-4'
                    onClick={onRefresh}
                    disabled={loading}
                    >
                        {loading ? 'Loading.....' : 'Refresh'}
                    </Button>
                </div>
            )}
        </div>
    )
}

export default UpcomingMeetings;