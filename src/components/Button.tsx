import { Link } from "react-router-dom";
import "../styles/button.css";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" |"cancel";
  size?: "sm" | "md" | "lg";
  to?: string;        // interne navigatie (react-router)link tag
  href?: string;      // externe link link <a> tag
  onClick?: () => void;
  className?: string;
};


const Button = ({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  onClick,
  className = "",
}: ButtonProps) => {

  const base =
  "inline-flex items-center z-50 justify-center rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2";

  //objects where key an value are strings
  const variants: Record<string, string> = {
    primary: "btn btn-primary",
    secondary: "btn btn-secondary",
    outline: "border border-neutral-700 text-white hover:bg-neutral-800",
    cancel: "bg-red-700 hover:bg-red-800 text-white focus:ring-red-700",
  };

  const sizes: Record<string, string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  // React Router Link
  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

    // Externe link
  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

   // Standaard button
  return (
    <button onClick={onClick} className={classes}>
      { children}
    </button>
  );
}

export default Button;