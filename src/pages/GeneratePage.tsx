import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Robot} from "../components";
// import { startGeneration } from "../services/mockAI";
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
    console.log(data);
    const colors: Color[] = Array.isArray(data.colors) ? data.colors : [];

    navigateTo("/results", { state: { prompt, colors } });

  } catch (error) {
    console.error("Error during fetch:", error);
    alert("An error occurred while generating the palette. Please try again.");
    return;
  }

  }

// cozy autumn living room
  return (
   <>
      <p className="p-8 text-center sm:hidden">Hello, creator.<br/>
        Provide 2–5 keywords to define your mood. <br/>
        Example: “summer, birthday, 5-year-old girl”.
        Output: a curated 5-color palette.
      </p>
      
      <div className="p-8 md:p-24 flex flex-col items-start space-y-4 w-full mx-auto md:flex-row md:items-center md:space-y-0 md:space-x-4 md:w-3/4">
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

      <Robot text={["Hello, creator.",
  "Provide 2–5 keywords to define your mood.",
  "Example: “summer, birthday, 5-year-old girl”.",
  "Output: a curated 5-color palette."]} />
    </>

  );
}

export default GeneratePage;

