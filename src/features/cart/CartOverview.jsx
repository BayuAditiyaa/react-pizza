import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCart, getTotalPrice } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalQuantity = useSelector(getTotalCart);
  const totalPrice = useSelector(getTotalPrice);

  if (!totalPrice) return null;

  return (
    <div className="flex justify-between bg-stone-800 text-stone-200 uppercase p-4">
      <p className="space-x-4">
        <span>{totalQuantity} Pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart">Buka Keranjang &rarr;</Link>
    </div>
  );
}

export default CartOverview;
