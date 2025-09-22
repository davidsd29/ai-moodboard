import "../styles/planets.css";

interface PlanetProps {
  color: string;
  hidden?: boolean;
  clouds?: boolean;
  children?: React.ReactNode;
}

const Planet = ({ color, children, hidden, clouds }: PlanetProps) => {

  return (
    <section className={`planet_${color} grid items-center absolute text-center gap-4 ${
        hidden ? "hidden md:block" : ""
      }`} >
      <div className=" peer before:content-[''] before:absolute after:absolute after:rounded-full  before:rounded-full cursor-pointer overflow-hidden relative ">
        <span className={`${ clouds ? "clouds" : ""} circles_${color} border absolute content-[''] rounded-full after:rounded-full before:rounded-full before:content-[''] after:content-[''] before:absolute after:absolute`}></span>
        <span className={`eyes_${color} eyes bg-gray-900 absolute after:bg-gray-900 after:content-[''] after:absolute after:rounded-full `}></span>
      </div>

      <section className="textBulp opacity-0 peer-hover:opacity-100 transition text-white text-2xl">
        {children}
      </section>
    </section>
  );
};

export default Planet;