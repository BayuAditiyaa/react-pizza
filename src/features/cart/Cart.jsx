import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const username = useSelector((store) => store.user.username);
  const cart = useSelector(getCart);

  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-3 py-4">
      <LinkButton to="/menu">&larr; Kembali ke menu</LinkButton>

      <h2 className="my-4 text-lg font-bold ">Keranjangmu, {username}</h2>
      <ul className="my-8 divide-y-8">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="mt-4 space-x-4">
        <Button to="/order/new">Order pizzas</Button>
        <button
          className="text-red-600 text-sm border-2 px-1 py-2 rounded-full border-red-600 border-off font-semibold"
          onClick={() => dispatch(clearCart())}
        >
          Clear cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
