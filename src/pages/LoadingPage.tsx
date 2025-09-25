import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Planet } from "../components";
import { getAIStatus } from "../../services/mockAI";

type LoadingState = { value: number; prompt?: string };

// Functional component expecting a prop 'value' of type number
const LoadingPage: React.FC<LoadingState> = () => {
  const { state } = useLocation();
  const navigateTo = useNavigate();
  const { prompt = "", ticketID = "" } = (state || {}) as { prompt?: string; ticketID?: string };
  const [value, setValue] = useState(0);

  useEffect(() => {
    
    if (!ticketID) {
      alert("Geen TicketID ontvangen.");
      navigateTo("/");
      return;
    }

    let stoppedRunning = false;

    const getInfo = async () => {
    
      try {
        console.log("TicketID type:", typeof ticketID, "value:", ticketID);

        const ticket = await getAIStatus(ticketID);

        setValue(Math.max(0, Math.min(100, ticket.progress ?? 0)));

        if (ticket.status === "completed") {
          navigateTo("/results", { state: { prompt, result: ticket.data, ticketID  } });
          stoppedRunning = true;
          return;
        }

        if (ticket.status === "error") {
          alert(
            ticket.error || "Er is een fout opgetreden tijdens het genereren."
          );
          navigateTo("/");
          return;
        }
      } catch (err) {
        console.error(err);
        alert("Kon status niet ophalen. Probeer opnieuw.");
        return; //stop function
      }

      if (!stoppedRunning) setTimeout(getInfo, 500); //next calling moment
    };

    getInfo();
  }, [ticketID, navigateTo, prompt]);

  const safeValue = Math.max(0, Math.min(100, value));
  return (
    <>
      <section className="planets w-full grid place-items-center">
        <Planet color="red">
          <p>Wow are you from Q42?!</p>
        </Planet>

        <Planet color="green" hidden={true}>
          <p>Yeah, it’s a bit of a wait.</p>
        </Planet>

        <Planet color="blue">
          <p>You’re up soon</p>
        </Planet>

        <Planet color="yellow">
          <p>Great taste, btw</p>
        </Planet>

        <Planet color="purple" hidden={true}>
          <p>You in the queue too?</p>
        </Planet>

        <Planet color="orange">
          <p>Hey, You also waiting?</p>
        </Planet>

        <Planet color="sun">
          <p>Is getting hot in here, isn't it?</p>
        </Planet>

        <Planet color="earth" clouds={true}>
          <p>just order a coffee,<br/> might take a while</p>
        </Planet>

        <Planet color="moon">
          <p>Worth the wait, promise</p>
        </Planet>
        <section className="absolute bottom-1/10 grid gap-4">
          <h2 className="text-7xl ">Loading...</h2>
          <div className="flex flex-col items-center ">
            <p className="m-2">{safeValue} %</p>
            <div
              className="loading-track  w-full h-5 overflow-hidden "
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={safeValue}
              role="progressbar"
            >
              <span
                className="progress-bar content-[''] w-0 h-full block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-gradient-x"
                style={{ width: `${safeValue}%` }}
                />
                
            </div>
          </div>
        </section>
      </section>
    </>
  );
;

};

export default LoadingPage;
