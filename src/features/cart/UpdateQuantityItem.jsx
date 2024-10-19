import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import {
  decreaseItemQuantity,
  getCurrentQuantityById,
  increaseItemQuantity,
} from "./cartSlice";

export default function UpdateQuantityItem({ pizzaId }) {
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-2">
      <Button onClick={() => dispatch(decreaseItemQuantity(pizzaId))}>-</Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button onClick={() => dispatch(increaseItemQuantity(pizzaId))}>+</Button>
    </div>
  );
}
