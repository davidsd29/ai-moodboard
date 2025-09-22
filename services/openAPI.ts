
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

dotenv.config();

const API_KEY = process.env.API_KEY || '';
const PORT = process.env.PORT || 3000;
if (!API_KEY) {
  throw new Error('API_KEY is not set in environment variables');
}

const app = express();
app.use(express.json());
app.use(cors()); // fetching from frontend to backend without  CORS issues

const openai = new OpenAI({
  apiKey: API_KEY
});
   

  app.post("http://localhost:3000/api/generate-palette", cors(), async (req, res) => {
console.log("POST /api/generate-palette called");
  
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Invalid prompt" });
    }

   const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You generate 5 unique color palettes. Each color should have a descriptive name and a HEX code. Format: Color Name #HEXCODE" },
        { role: "user", content: `Generate a color palette of 5 colors for the following mood/theme. Each color must have a unique descriptive name and a HEX code. Output exactly 5 colors, each on a new line in the format: Color Name #HEXCOD. Mood/theme:: ${prompt}` }
      ],
      temperature: 0.7, 
    });

    const output = response.choices[0]?.message?.content || "";
    console.log(output);
    
    const colors = output
      .split("\n")
      .map(line => line.trim())
      .map(line => {
        // Match "Color Name #HEXCODE"
        const match = line.match(/(.*)\s(#([0-9a-fA-F]{6}))/);
        return match ? { name: match[1].trim(), hex: match[2] } : null;
      })
      .filter(Boolean);
    
        if (colors.length === 0) {
        return res.status(500).json({ error: "Failed to parse colors from AI response" });
    }

    res.json({ colors });

  } catch (error) {
    console.error("Error generating palette:", error);
    res.status(500).json({ error: "Failed to generate palette" });
  }

});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

