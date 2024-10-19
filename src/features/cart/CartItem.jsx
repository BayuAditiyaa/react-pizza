import { formatCurrency } from "../../utils/helpers";
import DeleteButton from "./DeleteButton";
import UpdateQuantityItem from "./UpdateQuantityItem";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">{formatCurrency(totalPrice)}</p>
        <div className="flex items-end justify-end gap-4 sm:gap-8">
          <UpdateQuantityItem pizzaId={pizzaId} />
          <DeleteButton pizzaId={pizzaId} />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
