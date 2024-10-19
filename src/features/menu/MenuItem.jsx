import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteButton from "../cart/DeleteButton";
import UpdateQuantityItem from "../cart/UpdateQuantityItem";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice: unitPrice,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-2 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "grayscale" : ""}`}
      />
      <div className="flex flex-col grow">
        <p className="font-medium">{name}</p>
        <p className="capitalize text-sm text-stone-600 italic">
          {ingredients.join(", ")}
        </p>
        <div className="flex items-center justify-between mt-auto">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="uppercase text-sm text-red-500">Sold out</p>
          )}
          {isInCart && (
            <div className="flex items-center gap-4">
              <UpdateQuantityItem pizzaId={id} />
              <DeleteButton pizzaId={id} />{" "}
            </div>
          )}
          {!soldOut && !isInCart && (
            <Button onClick={handleAddToCart}>tambah</Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
