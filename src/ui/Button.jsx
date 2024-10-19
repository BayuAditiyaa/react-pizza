import { Link } from "react-router-dom";

export default function Button({ children, disabled, to, onClick }) {
  const className =
    "text-xs sm:text-md bg-yellow-400 p-2 sm:p-4 rounded-2xl uppercase font-semibold hover:bg-yellow-300 text-stone-800 tracking-wide focus:outline-none focus:bg-yellow-300 transition-colors duration-500 focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";

  if (to)
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );

  return (
    <button disabled={disabled} className={className} onClick={onClick}>
      {children}
    </button>
  );
}
