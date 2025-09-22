import type { MoodboardData } from "./moodboard";
export type AIStatus = 'idle' | 'processing' | 'completed' | 'error';

export interface AIMockStatus {
    status: AIStatus;
    progress?: number; // percentage from 0 to 100
    data?: MoodboardData;
    error?: string;
}

//  In-memory store to simulate AI processing states
const store = new Map<string, { progress: number; status: AIStatus; data?: MoodboardData; error?: string }>();


function MakeFakeMoodboard(prompt: string): MoodboardData {
  const base = ["#000120", "#e60de6", "#08fdd8", "#FFD166", "#EF476F"];
  const words = prompt
    .split(/\s+/)
    .map(w => w.trim())
    .filter(Boolean)
    .slice(0, 6)
    .map(w => w.toLowerCase());

  return {
    palette: base,
    caption: `Mood for: ${prompt}`,
    keywords: words.length ? words : ["mood", "board", "ai"],
    imageUrl: undefined, // later te vullen
  };
}



// Function to start AI processing
export async function startGeneration(prompt: string): Promise<{ ticketID: string }> {
    const ticketID = Math.random().toString(36).substr(2, 9); // generate a random ID
    store.set(ticketID, { progress: 0, status: 'idle' });

    // Simulate AI processing with intervals
    const timer = setInterval(() => {
        const current = store.get(ticketID);
        if (!current) return clearInterval(timer);
        if (current) {

            if (current.status === 'idle') current.status = 'processing';
            if (current.progress >= 100) {
                current.status = 'completed';
                current.data = MakeFakeMoodboard(prompt); 
                clearInterval(timer);
            } else {
                current.progress += 1; // increment progress
            }
            store.set(ticketID, current);
        }
    }, 1000); // update every second

    return ticketID;
}

// Function to get the status of an AI process
// to make it look like an API call, i added a small delay
export async function getAIStatus(ticketID: string): Promise<AIMockStatus> {
    const current = store.get(ticketID);
    if (!current) {
        return { status: 'error', error: 'Invalid ticket ID' };
    }
    return {
        status: current.status,
        progress: current.progress,
        data: current.data,
        error: current.error,
    };
}