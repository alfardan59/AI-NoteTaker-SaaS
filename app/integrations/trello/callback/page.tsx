import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";

export default function TrelloCallback() {
  const router = useRouter();

  const [status, setStatus] = useState("Connecting your trello account");

  useEffect(() => {
    const processtoken = async () => {
      try {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const token = params.get("token");

        if (!token) {
          setStatus("No auth token found");
          setTimeout(() => router.push("/integrations?error=no_token"), 2000);
          return;
        }
        setStatus("Saving your connection");

        const response = await fetch("/api/integrations/trello/process-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(token),
        });

        if (response.ok) {
          setStatus("Success! Redirecting");
          router.push("/integrations?success=trello_connected&setup=trello");
        } else {
          setStatus("Failed to save connection");
          setTimeout(
            () => router.push("/intergrations?error=save_failed"),
            2000,
          );
        }
      } catch (error) {
        setStatus("Error occured");
        setTimeout(() => router.push("/intergrations?error=save_failed"), 2000);
      }
    };
    processtoken();
  },[router]);

  return(
    <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Connecting Trello</h2>
            <p className="text-muted-foreground">{status}</p>
        </div>
    </div>
  )
}
