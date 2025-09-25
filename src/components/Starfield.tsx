import { useEffect, useState } from "react";

const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const Starfield = ({ starCount = 60 }) => {
  const [positions, setPositions] = useState(
    // set the initial positions (placeholder values) for every star
    () => Array.from({ length: starCount }, () => ({ top: "0px", right: "0px" }))
  );

  useEffect(() => {
    const generate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // An array of `starCount` random positions (using window size)
      setPositions(
        Array.from({ length: starCount }, () => ({
          top: getRandom(1, height) + "px",
          right: getRandom(1, width) + "px"
        }))
      );
    }

    generate(); 
    const onResize = () => generate();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);// cleanup
  }, [starCount]);

  return (
    <div
      className="starfield absolute w-full h-screen overflow-hidden"
      aria-hidden="true"
    >
      {positions.map((pos, i) => (
        <div
          key={i}
          className="star"
          style={{ top: pos.top, right: pos.right, position: "absolute" }}
        />
      ))}
    </div>
  );
}


export default Starfield;