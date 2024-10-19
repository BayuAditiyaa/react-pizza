// Test ID: IIDSAT

import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";

// const order = {
//   id: "ABCDEF",
//   customer: "Jonas",
//   phone: "123456789",
//   address: "Arroios, Lisbon , Portugal",
//   priority: true,
//   estimatedDelivery: "2027-04-25T10:00:00",
//   cart: [
//     {
//       pizzaId: 7,
//       name: "Napoli",
//       quantity: 3,
//       unitPrice: 16,
//       totalPrice: 48,
//     },
//     {
//       pizzaId: 5,
//       name: "Diavola",
//       quantity: 2,
//       unitPrice: 16,
//       totalPrice: 32,
//     },
//     {
//       pizzaId: 3,
//       name: "Romana",
//       quantity: 1,
//       unitPrice: 15,
//       totalPrice: 15,
//     },
//   ],
//   position: "-9.000,38.000",
//   orderPrice: 95,
//   priorityPrice: 19,
// };

function Order() {
  const order = useLoaderData();

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between">
        <h2 className="text-lg font-semibold">order {id} Status</h2>

        <div className="mt-8">
          {priority && (
            <span className="uppercase text-red-50 bg-red-500 p-2 rounded-full">
              Priority
            </span>
          )}
          <span className="uppercase text-green-50 bg-green-500 p-2 rounded-full">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between bg-stone-300 px-4 py-6">
        <p className="font-semibold">
          {deliveryIn >= 0
            ? `Tunggu ${calcMinutesLeft(estimatedDelivery)} menit lagi ya 😃`
            : "Pesanan telah tiba!"}
        </p>
        <p>(Estimasi pengantaran: {formatDate(estimatedDelivery)})</p>
      </div>
      <ul className="divide-y-8 divide-stone-00 border-b border-t">
        {cart.map((item) => (
          <OrderItem item={item} key={item.id} />
        ))}
      </ul>
      <div className=" bg-stone-300 px-4 py-6">
        <p className="font-semibold text-sm">
          Harga pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="font-semibold text-sm">
            Harga priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <div className="w-full border-b-2 border-stone-700 flex items-end justify-end">
          +
        </div>
        <p className="font-bold text-lg">
          Total bayar: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

export async function Loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
