"use client"
import { CartCard } from '@components/Cards';
import { ThanksModals } from '@components/Modals';
import { Button } from '@material-tailwind/react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'

export default function Cart() {
  const [cartItems, setCartItems] = useState(null);
  const router = useRouter();
  const [modals, setModals] = useState(false)
  const [input, setInput] = useState({ checkIn: "", checkOut: "" })
  const [open, setOpen] = useState(0);

  useEffect(() => {
    axios.get('/api/cart/')
      .then(res => {
        console.log(res.data)
        setCartItems(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  function handleBooking() {
    axios.post('/api/order/', { "cartId": cartItems._id })
      .then(res => {
        console.log(res.data)
        setModals(!modals)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className='pt-20 bg-gray-100 grid lg:grid-cols-[70%_30%] grid-cols-1 place-items-start min-h-screen px-6 md:px-12 lg:px-32 gap-6 md:gap-12'>
      {/* Main Content - Cart Items */}
      <div className='w-full h-full'>
        <button onClick={() => router.push('/dash')} className='flex py-4 font-semibold gap-4 items-center text-xl md:text-2xl lg:text-3xl text-gray-500'>
          <FaArrowLeft /> Continue Shopping
        </button>
        <div className='w-full h-fit bg-white p-4 md:p-5 rounded-2xl'>
          <div>
            <h1 className='text-md md:text-lg font-extrabold tracking-widest'>BOOKING CART</h1>
            <p className='text-xs md:text-sm tracking-widest text-gray-500'>
              You have {cartItems && cartItems?.orderList?.length > 0 ? cartItems.orderList.length : 0} items in your cart
            </p>
          </div>
          <div className='grid gap-4 pt-4'>
            {cartItems ? (
              cartItems.orderList.map(data => (
                <div key={data._id} onClick={() => setOpen(data._id)}>
                  <CartCard items={data} />
                  {open === data._id && (
                    <div className='text-sm md:text-base text-gray-700'>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur vel distinctio ut accusantium consequuntur, nulla enim itaque sunt ipsam repellat necessitatibus officia numquam beatae error quos recusandae. Laboriosam, dolorem voluptates.
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className='text-md md:text-xl text-gray-500'>Loading...</p>
            )}
          </div>
        </div>
      </div>

      {/* Price Summary Section */}
      <div className='w-full'>
        <div className='shadow-md border-2 p-4 md:p-5 border-gray-200 bg-white mt-10 lg:mt-20 w-full h-fit rounded-xl'>
          <div className='py-4 grid place-items-start gap-4'>
            <h1 className='font-extrabold text-md md:text-lg'>YOUR PRICE SUMMARY</h1>
            <h1 className='text-sm md:text-base'>Property Price: <b>₹ {cartItems?.totalCost}</b></h1>
            <h1 className='text-sm md:text-base'>Total Tax: <b>₹ {cartItems?.totalTax}</b></h1>
            <h1 className='border-t-2 py-2 font-extrabold w-full text-lg md:text-xl text-green-600'>
              TOTAL PRICE: ₹ {cartItems?.amountPayable}
            </h1>
            <Button onClick={handleBooking} className='w-full mt-4' color='indigo' size="lg">
              Book Now!
            </Button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modals && <ThanksModals />}
    </div>
  )
}
