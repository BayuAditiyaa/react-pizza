import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalPrice } from "../cart/cartSlice";
import store from "../../store.js";
import { formatCurrency } from "../../utils/helpers.js";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice.js";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData();
  const { username, address, status } = useSelector((store) => store.user);
  const isLoading = status === "loading";
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalPrice);
  const prorityPrice = withPriority ? totalCartPrice * 0.15 : 0;
  const totalPrice = totalCartPrice + prorityPrice;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-8">Udah siap order? Let's go!</h2>

      <Form method="POST">
        <div className="my-4 ">
          <label>Nama</label>
          <input
            defaultValue={username}
            type="text"
            name="customer"
            required
            className="input my-2"
          />
        </div>

        <div className="my-4 ">
          <label>No hp</label>
          <div>
            <input type="tel" name="phone" required className="input my-2" />
          </div>
          {formErrors?.phone && (
            <p className="text-red-700 bg-red-100 p-2 rounded-lg">
              {formErrors.phone}
            </p>
          )}
        </div>

        <div className="my-4 ">
          <label>Alamat</label>
          <div>
            <input
              type="text"
              name="address"
              required
              className="input my-2"
              disabled={isLoading}
              defaultValue={address}
            />
          </div>
          <Button
            disabled={isLoading}
            onClick={(e) => {
              e.preventDefault();
              dispatch(fetchAddress());
            }}
          >
            {!isLoading ? `POSISI?` : "Tunggu..."}
          </Button>
        </div>

        <div className="flex gap-5 items-center my-4">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          />
          <label htmlFor="priority">
            order sebagai prioritas? (tambah fee 15%)
          </label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <div>
          <Button disabled={isSubmitting}>
            {isSubmitting
              ? "Placing order..."
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    prority: data.prority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Tolong beri nomor telepon yang valid agar mudah untuk kami hubungi...";
  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(order);

  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
