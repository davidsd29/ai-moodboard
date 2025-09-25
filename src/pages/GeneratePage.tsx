import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Robot} from "../components";

type Color = {
  name: string;
  hex: string;
};

const GeneratePage = () => {
  const [prompt, setPrompt] = useState("");
  const navigateTo = useNavigate();

  const handleGenerate = async () => {
    if(prompt.trim() === "") return alert("Please enter a prompt before generating.");
    
 try {
  const response = await fetch("/api/generate-palette", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      alert(`Error: ${errorData.error || "Failed to generate palette"}`);
      return;
    }

    const data = await response.json();
    const ticketID = data.ticketID;

    
    if (!ticketID) {
      alert("No ticket received from server.");
      return;
    }
    
    navigateTo("/loading", { state: { prompt, ticketID: data.ticketID } });
    
  } catch (error) {
    console.error("Error during fetch:", error);
    alert("An error occurred while generating the palette. Please try again.");
    return;
  }

  }

  return (
   <>
    <div className="relative -top-1/5">
      <p className="p-8 text-center sm:hidden">Hello, creator.<br/>
        Provide 2–5 keywords to define your mood. <br/>
        Example: “summer, birthday, 5-year-old girl”.
        Output: a curated 5-color palette.
      </p>
      
      <div className="p-8 md:p-24 flex flex-col space-y-4 w-full mx-auto md:flex-row md:items-center md:space-y-0 md:space-x-4 md:w-3/4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your moodboard prompt..."
          className="w-full px-4 py-2 border border-neutral-800 rounded bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <Button
          variant="primary"
          size="md"
          onClick={handleGenerate}
        >
          Generate
        </Button>
      </div>
       </div>

      <Robot text={["Hello, creator.",
      "Provide 2–5 keywords to define your mood.",
      "Example: “summer, birthday, 5-year-old girl”.",
      "Output: a curated 5-color palette."]} />
    </>
  );
}

export default GeneratePage;

