import "../styles/hex.css";

const Hero = () => {
  const colors = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#3b82f6",
    "#a855f7",
    "#ec4899",
  ];

  return (
    <ul className="flex flex-wrap justify-center items-center p-0 m-auto list-none w-full">
      {colors.map((color, i) => (
        <li
          key={i}
          className="honeycomb-cell relative p-2 w-[200px] h-52 z-[1]"
          style={{ ["--hex-color" as any]: color }}
        />
      ))}

      {/* Invisible placeholders to preserve honeycomb alignment */}
      <li className="honeycomb_Hidden honeycomb-cell w-[250px] opacity-0 hidden h-52 p-2 m-0 my-3" />
      <li className="honeycomb_Hidden honeycomb-cell w-[250px] opacity-0 hidden h-52  p-2 m-0 my-3" />
      <li className="honeycomb_Hidden honeycomb-cell w-[250px] opacity-0 hidden h-52 p-2 m-0 my-3" />
    </ul>
  );
};

export default Hero;