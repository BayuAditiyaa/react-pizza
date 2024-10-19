import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

export default function Header() {
  return (
    <header className="flex justify-between bg-yellow-500 uppercase p-4">
      <Link to="/" className="tracking-widest font-bold">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}
