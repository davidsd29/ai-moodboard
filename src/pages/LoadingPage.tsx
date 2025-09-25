import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Planet } from "../components";
// import { getAIStatus } from "/services/mockAI";

type LoadingState = { prompt?: string; ticketID?: string };

const LoadingPage = () => {
  const navigateTo = useNavigate();
  const { state } = useLocation();
  const { prompt, ticketID } = (state || {}) as LoadingState;
  const [loadingValue, setValue] = useState(0);

  useEffect(() => {

    if (!prompt && !ticketID) {
      navigateTo("/", { replace: true });
      return;
    }

    let cancelled = false;

    const getStatus = async () => {
      try {
        // need to fetch
        //after fetch check status of rersponse

        if (cancelled) return;

        if () {
          // status === done, check if response is an array & color array > 0
          // send to results
        } else if () {
          //status === failed send back to home screen "try again"
        } else {
          // takes to long or get stuck, reset and fetch again
        }




      

      } catch (err) {
        console.error(err);
        alert("Kon status niet ophalen. Probeer opnieuw.");
        return; //stop function
      }

    
    };

    getStatus();

    //clean up
    return () => {cancelled = true;};

  }, [prompt, ticketID, navigateTo ]);

  const safeValue = Math.max(0, Math.min(100, loadingValue));
  return (
    <>
      <section className="planets min-h-screen w-full grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] place-items-center bg-neutral-950 text-white gap-6">
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
        <h2 className="absolute bottom-1/10 text-7xl ">Loading...</h2>
        <section className="flex flex-col items-center ">
          <p className="mt-2">{safeValue} %</p>
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
        </section>
      </section>
    </>
  );
;

};

export default LoadingPage;
