"use client"
import { Button, Card, CardBody, CardFooter, Checkbox, Dialog, Input, Typography } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { MdError } from "react-icons/md";

export function ThanksModals() {
  const router = useRouter();
  function handleClick() {
    router.push("/dash/order")
  }
  return (
    <div className="z-20 absolute top-0 left-0 bg-gray-800/80 w-screen h-screen flex flex-col justify-center">
      <div className='w-full grid place-items-center gap-20'>
        <img src='https://i.pinimg.com/originals/37/66/7a/37667aca24ab99deed207a25d5095ee4.gif' loading='lazy' className='w-1/2 rounded-3xl aspect[6/4]' />
        <Button onClick={handleClick} size="lg" className='text-xl' color='cyan'>View Your Orders!</Button>
      </div>
    </div>

  )
}

export function AddPropertyModal({open,handleOpen}) {
  const router = useRouter();
  
  return (
    <Dialog
      size="xs"
      open={open}
      handler={handleOpen}
      className="bg-transparent shadow-none"
    >
      <Card className="mx-auto w-full min-w-11/12">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" color="blue-gray">
            Add Your Property
          </Typography>
          <Typography
            className="mb-3 font-normal"
            variant="paragraph"
            color="gray"
          >
            Enter your Details.
          </Typography>
          <input type="text" placeholder='Property name' name='name'  className='w-full p-2 rounded-md border border-gray-400 outline-0' />
          <input type="text" placeholder='Property address' name='address'  className='w-full p-2 rounded-md border border-gray-400 outline-0' />
          <input type="text" placeholder='Property location' name='location'  className='w-full p-2 rounded-md border border-gray-400 outline-0' />
          <input type="text" placeholder='Property zipcode' name='zipcode'  className='w-full p-2 rounded-md border border-gray-400 outline-0' />
          <input type="text" placeholder='Property house' name='house'  className='w-full p-2 rounded-md border border-gray-400 outline-0' />
          <input type="text" placeholder='Property price' name='price'  className='w-full p-2 rounded-md border border-gray-400 outline-0' />
          <input type="text" placeholder='Property star' name='star'  className='w-full p-2 rounded-md border border-gray-400 outline-0' />
          <input type="text" placeholder='Property sales' name='sales'  className='w-full p-2 rounded-md border border-gray-400 outline-0' />
          <textbox type="text" placeholder='Property description' name='description'  className='w-full p-2 rounded-md border border-gray-400 outline-0' ></textbox>
          <input type="text" placeholder='Beds' name='beds'  className='w-full p-2 rounded-md border border-gray-400 outline-0' ></input>
          <input type="text" placeholder='Bathrooms' name='bathrooms'  className='w-full p-2 rounded-md border border-gray-400 outline-0' ></input>
          <input type="text" placeholder='Floor' name='floor'  className='w-full p-2 rounded-md border border-gray-400 outline-0' ></input>
          <input type="text" placeholder='taxPayable' name='taxPayable'  className='w-full p-2 rounded-md border border-gray-400 outline-0' ></input>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" onClick={handleOpen} fullWidth>
            Add Property
          </Button>
        </CardFooter>
      </Card>
    </Dialog>

  )
}


export const ErrorModal = ({ message, onClose }) => {
    const router=useRouter()
    const handleGoBack = () => {
        onClose();
        router.push("/")
    };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-8 lg:max-w-lg lg:mx-16">
        <h2 className="text-lg font-semibold mb-4 text-center">An Error Occurred</h2>
        <p className="mb-6 text-center flex gap-2 justify-center items-center italic w-full"><MdError className='text-3xl text-red-400'/>{message}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-2">
          <button
            onClick={handleGoBack}
            className="bg-gray-300 px-4 py-2 rounded-md w-full sm:w-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
