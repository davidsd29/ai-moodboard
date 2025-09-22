import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Robot} from "../components";

type Color = {
  name: string;
  hex: string;
};

type ResultState = {
  prompt?: string;
  colors?: Color[];
};

const ResultsPage = () => {

    const navigateTo = useNavigate()
    const { state } = useLocation();
    const { prompt = "", colors } = (state || {}) as ResultState;    
     const [hoverColor, setHoverColor] = useState<string | null>(null);

    useEffect(() => {
        if (!colors || colors.length === 0) {
            // No colors in state → back to landingpage
            navigateTo("/", { replace: true });
        }
    }, [colors, navigateTo]);
console.log(colors);
    const safeColors = colors || [];

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
                    <div className="w-full h-16 rounded-lg " 
                        style={{ backgroundColor: color.hex }}
                        onMouseEnter={() => setHoverColor(color.hex)}
                         onMouseLeave={() => setHoverColor(null)} />
                    <div className="mt-2 text-sm font-medium">{color.name}</div>
                    <div className="mt-1 text-xs tabular-nums">{color.hex}</div>
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