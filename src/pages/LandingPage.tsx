import { Button, Hero, Robot} from "../components";

const LandingPage = () => {
  return (
<>
      <header className="max-w-5xl text-center px-4 py-8">
        <h1 className="text-5xl md:text-3xl font-bold">AI Moodboard Generator 🎨</h1>
        <p className="text-neutral-300 mt-2">
          Type een vibe (bv. <em>“cyberpunk jungle”</em> of <em>“zomer feestje 5 jaar meisje”</em>) en klik Generate.
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-4 flex justify-end">
        <section className="grid ">
            <Hero />
          <Button to="/api/generate-palette" variant="primary" size="lg" className="mt-8 mx-auto">
            Generate
          </Button>

        </section>

        <Robot text={["Hello!", "I am Robo, your AI assistant.", "I will help you create amazing color moodboards!"]} />
   

     
      </main>
    </>
  );
}

export default LandingPage;