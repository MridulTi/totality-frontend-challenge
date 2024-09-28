"use client";
import { Avatar, Button } from "@material-tailwind/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaUser, FaUserCircle } from "react-icons/fa";

export default function IdPage({ params }) {
  const [propertyData, setPropertyData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`/api/property?query=${params.slug}`)
      .then((res) => {
        console.log(res.data);
        setPropertyData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleAddToCart() {
    axios
      .post(`/api/cart/`, { slug: params.slug })
      .then((res) => {
        console.log(res);
        router.push("/dash/cart");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Handle the case where propertyData is null or undefined
  if (!propertyData) {
    return <p className="pt-20 text-center">Loading...</p>; // Or any loading indicator you prefer
  }

  return (
    <div className="pt-20 grid grid-flow-row place-items-center py-12 px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl">
        {propertyData.img.map((data, index) => (
          <img
            key={index}
            src={data}
            alt="Property Image"
            className="w-full aspect-[6/5] bg-gray-200 rounded-xl mb-2 object-cover"
          />
        ))}
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-start gap-12 w-full max-w-5xl mt-8">
        <div className="w-full lg:w-8/12 pt-4">
          <h1 className="text-3xl md:text-4xl font-semibold">{propertyData.name}</h1>
          <h1 className="text-lg md:text-xl font-semibold">
            {propertyData.address}, <span className="text-base md:text-lg">{propertyData.zipcode}</span>
          </h1>
          <h1 className="text-base md:text-lg font-semibold text-gray-500">
            {propertyData.location}
          </h1>
          <p className="font-semibold text-lg md:text-xl text-gray-500 mt-2">
            {propertyData.details.beds} Bed . {propertyData.details.bathrooms} Bathroom .{" "}
            {propertyData.details.floor} Floor . {propertyData.details.area} Area
          </p>
          <div className="flex items-center gap-4 py-4 border-b-2 my-6 border-gray-200">
            <FaUserCircle className="text-gray-400 text-lg md:text-xl lg:text-3xl"/>
            <div>
              <h1 className="text-base md:text-lg font-medium">Owned By {propertyData.owner}</h1>
            </div>
          </div>
          <h1 className="text-base md:text-xl text-gray-800">{propertyData.description}</h1>
          <h1 className="text-base md:text-lg text-gray-500 mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed voluptatum odit libero
            molestias dolore. Temporibus quisquam distinctio odio harum, consequatur doloribus, est
            pariatur voluptate cum exercitationem, explicabo maxime vel. Quidem?
          </h1>
        </div>

        <div className="w-full lg:w-4/12 pt-4">
          <div className="shadow-md border-2 p-5 border-gray-200 w-full h-fit rounded-xl">
            <h1 className="text-2xl md:text-3xl font-bold">₹ {propertyData.price}</h1>

            <Button
              onClick={handleAddToCart}
              className="w-full my-4"
              color="indigo"
              size="lg"
            >
              Add to Cart
            </Button>
            <div className="py-4 grid place-items-start gap-4">
              <h1 className="font-extrabold">YOUR PRICE SUMMARY</h1>
              <h1>
                Property Price: <b>₹ {propertyData.price}</b>
              </h1>
              <h1>
                Total Tax: <b>₹ {propertyData.taxPayable}</b>
              </h1>
              <h1 className="border-t-2 py-2 font-extrabold w-full text-xl text-green-600">
                TOTAL PRICE : ₹ {Number(propertyData.price) + Number(propertyData.taxPayable)}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
