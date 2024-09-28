"use client";
import { CartCard } from "@components/Cards";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

function OrderPage() {
  const router = useRouter();
  const [orderList, setOrderList] = useState(null);

  useEffect(() => {
    axios
      .get("/api/order/")
      .then((res) => {
        console.log(res.data.data);
        setOrderList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="pt-20 bg-gray-50 flex flex-col items-center min-h-screen px-4 md:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-between w-3/4">
      <button
        onClick={() => router.push("/dash")}
        className="flex py-4 font-semibold gap-2 items-center text-lg md:text-2xl lg:text-3xl text-gray-500"
      >
        <FaArrowLeft className="text-sm md:text-lg lg:text-xl" />
        Continue Shopping
      </button>

      <h1 className="font-extrabold text-3xl md:text-4xl py-5 underline underline-offset-8 decoration-indigo-400 text-center">
        My Orders.
      </h1>
      </div>

      <ul className="w-full max-w-4xl border-b-2 pb-6 border-gray-200">
        {orderList && orderList.length > 0 ? (
          orderList.map((order) => (
            <li key={order._id} className="w-full bg-white rounded-lg mb-4 shadow-md p-4">
              <CartCard items={order.order} />
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center text-lg">No orders found.</p>
        )}
      </ul>
    </div>
  );
}

export default OrderPage;
