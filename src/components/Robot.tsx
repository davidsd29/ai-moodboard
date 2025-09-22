import "../styles/robot.css";
import { useMemo } from "react";
// type RobotProps =
//   | { random?: false; text: string[]; className?: string }
//   | { random: true; text?: never; className?: string };


type RobotProps = {
  random?: boolean;
  text?: string[];
  hidden?: boolean;
};


const Robot = (props: RobotProps)  => {

const tips = [
  "Wauw! You can regenerate the same moodboard, or start a new one.",
  "Well done! Want to try different keywords?",
  "Great! Feel free to experiment with other color themes.",
  "Awesome! Share your moodboard with friends for feedback.",
  "Nice! You can copy the color codes for future projects.",
];

// Picks one random tip on mount and memoizes it so it stays the same across re-renders
  const randomLine = useMemo(
    () => tips[Math.floor(Math.random() * tips.length)],
    []
  );

    const lines = props.random ? [randomLine] : props.text;
    const hide = props.hidden ? "hidden md:flex" : "";

  return (
<div className={`${hide} absolute top-[53%] right-[5%] z-1 flex flex-col items-center justify-center m-auto robot`}>
      <div className="robot-head">
      <span className="face"></span>

      <div className="flex justify-around items-center w-3/4 eyes">
        <span></span>
        <span></span>
      </div>
    </div>
  
    <div className="robot-body">
      <div className="arm"></div>
      <div className="arm"></div>
    <div className="shadow"></div>
  </div>

  <div className="talk-bubble">
    <p>
      {lines.map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
    </p>
  </div>
</div>
  );
}

export default Robot;