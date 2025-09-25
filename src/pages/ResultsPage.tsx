import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Robot} from "../components";
import { useMemo } from "react";

type Color = {
  name: string;
  hex: string;
};

type ResultState = {
  prompt?: string;
  result?: {
    caption: string;
    keywords: string[];
    colors: Color[];
    imageUrl?: string;
  }
};

const ResultsPage = () => {

    const navigateTo = useNavigate()
    const { state } = useLocation();
    const { prompt = "", result } = (state || {}) as ResultState;
    const safeColors = useMemo(() => result?.colors || [], [result]);

    useEffect(() => {
    // Eerst checken of result bestaat
    if (!result || !result.colors || result.colors.length === 0) {
        console.log("Het is leeg of result ontbreekt", result);
        navigateTo("/", { replace: true });
    }
    }, [result, navigateTo]);

    return (
       <>
            <header className="space-y-1">
                <h1 className="text-3xl font-bold">Your Moodboard</h1>
                {prompt && <p className="opacity-80">Keywords: {prompt}</p>}
                <p className="opacity-80">Hover over a color to see its hex code.</p>
            </header>

            <section>
                <h2 className="text-xl font-semibold mb-3">Color Palette</h2>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {safeColors.map((color, index) => (
                    <div key={`${color.hex}-${index}`} className="rounded-xl p-3 border border-white/10 max-w-0.5xs">
                    <div className="w-full h-16 rounded-lg" style={{background: color.hex}} />
                    <p className="mt-2 text-sm font-medium">{color.name}</p>
                    <p className="mt-1 text-xs tabular-nums">{color.hex}</p>
                    </div>
                ))}
                </div>
            </section>


            <Robot random hidden={true} />

            <footer className="pt-4">
                <div className="flex gap-3 flex-wrap">
                    <Button 
                        className="wobble-horizontal"
                        variant="secondary"
                        onClick={() => navigateTo("/loading", { state: { prompt } })}
                        >
                        Regenerate
                    </Button>
                    <Button 
                        className="wobble-vertical"
                        variant="primary"
                        onClick={() => navigateTo("/", { replace: true })}
                        >
                        New Prompt
                    </Button>
                </div>
            </footer>
        </>
    );
}   

export default ResultsPage;