import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";

export default function DeleteButton({ pizzaId }) {
  const dispatch = useDispatch();
  function handleDelete() {
    dispatch(deleteItem(pizzaId));
  }
  return <Button onClick={handleDelete}>Hapus</Button>;
}
