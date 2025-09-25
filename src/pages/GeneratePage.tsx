import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Robot} from "../components";
import { startGeneration } from "../../services/mockAI";


type Color = {
  name: string;
  hex: string;
};

const GeneratePage = () => {
  const [prompt, setPrompt] = useState("");
  const navigateTo = useNavigate();
  const [useMockAI, setUseMockAI] = useState(true); // switch between fake and real AI

  const handleGenerate = async () => {
    console.log(prompt)
    if(prompt.trim() === "") return alert("Please enter a prompt before generating.");

      if (useMockAI) {
          // Mock AI flow →  to laoding page
        try {
          const data = await startGeneration(prompt);
          navigateTo("/loading", { state: { prompt, ticketID: data.ticketID } });

        } catch (error) {
          console.error("Error starting mock AI:", error);
          alert("Failed to start mock AI.");
        }

      } else {  
       // Real AI flow → direct to results page
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
              
            if (data.colors) {
                const colors: Color[] = Array.isArray(data.colors) ? data.colors : [];
               navigateTo("/results", { 
                state: { 
                  prompt, 
                  result: { 
                    caption: `Mood for: ${prompt}`, 
                    keywords: prompt.split(" ").slice(0, 6),
                    palette: colors, 
                    imageUrl: undefined 
                  } 
                } 
              });
              } else {
                alert("No colors or ticket received from server.");
              }
            
          } catch (error) {
            console.error("Error during fetch:", error);
            alert("An error occurred while generating the palette. Please try again.");
            return;
          }
      }

  }

  return (
   <>
    <div className="relative -top-1/5 w-full">
      <p className="p-8 text-center sm:hidden">Hello, creator.<br/>
        Provide 2–5 keywords to define your mood. <br/>
        Example: “summer, birthday, 5-year-old girl”.
        Output: a curated 5-color palette.
      </p>
      
      <div className="p-8 md:p-24 flex flex-col space-y-4 md:w-full mx-auto md:flex-row md:items-center md:space-y-0 md:space-x-4 w-3/4">
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

        <div className="mt-4 flex items-center gap-2 absolute">
          <input
            type="checkbox"
            checked={useMockAI}
            onChange={() => setUseMockAI(!useMockAI)}
            id="mockToggle"
          />
          <label htmlFor="mockToggle" className="text-white">
            Use Mock AI
          </label>
        </div>

      <Robot text={["Hello, creator.",
      "Provide 2–5 keywords to define your mood.",
      "Example: “summer, birthday, 5-year-old girl”.",
      "Output: a curated 5-color palette."]} />
    </>
  );
}

export default GeneratePage;

