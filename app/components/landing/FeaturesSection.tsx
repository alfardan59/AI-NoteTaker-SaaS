import { Bot, Calendar, Mail, MessageCircleMore, MessageSquare, Share2 } from "lucide-react"

const features = [
    {
        icon: Bot,
        title: "AI Meeting Summaries",
        description: "Automatic meeting summaries and action items after each meeting",
        color: "text-blue-400",
        bgColor: "bg-blue-500/10",
    },
    {
        icon: Calendar,
        title: "Smart Calendar Integration",
        description: "Connect Google Calendar and bots automatically join meeting",
        color: "text-green-400",
        bgColor: "bg-green-500/10",
    },
    {
        icon: Mail,
        title: "Automated Email Reports",
        description: "Receive beautiful Email summaries with action items",
        color: "text-orange-400",
        bgColor: "bg-orange-500/10",
    },
    {
        icon: MessageSquare,
        title: "Chat with Meetings",
        description: "Ask questions about meetings using our RAG pipeline",
        color: "text-purple-400",
        bgColor: "bg-purple-500/10",
    },
    {
        icon: Share2,
        title: "One Click Integrations",
        description: "Push action items to Slack, Asana, Jira and Trello",
        color: "text-cyan-400",
        bgColor: "bg-cyan-500/10",
    },
     {
        icon: MessageCircleMore,
        title: "Slack bot Integration",
        description: "Instal, our Slack Bot to ask questions and share insights",
        color: "text-pink-400",
        bgColor: "bg-pink-500/10",
    },
]

function FeaturesSection() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Everything you need for {' '}
                <span className="bg-linear-to-r from-blue-400 via-blue-500 to-blue-600  bg-clip-text text-transparent">Smarter Meetings</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto bg-linear-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(156,163,175,0.3)]">
                From AI Summaries to seamless Integrations, We've got every aspects covered.
            </p>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
