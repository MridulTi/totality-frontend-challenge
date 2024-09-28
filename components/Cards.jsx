
import Link from 'next/link'
import React from 'react'
import { FaBath, FaBed, FaStar, FaUserAlt, FaUserCircle } from 'react-icons/fa'
import { LuBuilding, LuLampFloor, LuRectangleHorizontal } from 'react-icons/lu'

export const ItemCards = (props) => {
  return (
    <Link href={props?.items?.slug?`/dash/${props.items.slug}`:"#"} target='__blank'><div className='w-72 text-gray-500 hover:shadow-2xl cursor-pointer h-fit rounded-xl p-4'>
        <img className='rounded-xl aspect-[6/5] w-full bg-gray-100' src={props?.items?.img[0]} alt={props?.items?.name} />
        <div className='flex justify-between items-center w-full'>
            <h1 className=' font-semibold text-black pt-2 tracking-wider '>{props?.items?.name}</h1>
            <h1 className='text-sm flex gap-1 items-center bg-yellow-700 text-white p-1 rounded-md my-1'><FaStar className=''/>{props?.items?.star}</h1>
        </div>
        <div className='text-sm'>
        <h1 className='text-md text-black pt-2 tracking-wider '>{props?.items?.address}</h1>
        <h1 className=''>{props?.items?.location}</h1>
        <h1 className=''>{props?.items?.house}</h1>
        <h1 className=''>{props?.items?.dates}</h1>
        <h1 className='text-black text-lg flex items-center gap-2'>₹ {props?.items?.price} {props?.items?.sales!="" && props?.items?.sales &&<p className='text-sm font-semibold text-green-600'>{props.items.sales} off</p>}</h1>
        {props?.items?.tags&& props?.items?.tags!=""&&
        <div className=''>
          {props.items.tags.map(data=>(
            <span className='m-2 bg-green-200 text-white text-center rounded-md  py-1 px-4'>{data}</span>
          ))}
        </div>}
        </div>
    </div>
    </Link>
  )
}

export const CartCard = (props) => {
  return (
    <Link href={props?.items?.slug?`/dash/${props.items.slug}`:"#"} target='__blank'><div className='w-full text-gray-500 border-2 border-gray-100 cursor-pointer flex gap-4 h-fit rounded-xl p-4'>
        <img className='rounded-xl aspect-[6/5] w-96 bg-gray-100' src={props?.items?.img[0]} alt={props?.items?.name} />
        <div className='w-full'>
          <div className='text-md w-full'>
              <h1 className=' font-semibold text-black text-xl pt-2 tracking-wider '>{props?.items?.name}</h1>
              <h1 className=' font-semibold text-black text-lg pt-2 tracking-wider '>{props?.items?.address}</h1>
            <h1 className='text-lg'>{props?.items?.location}</h1>
            <h1 className=''>ZipCode: {props?.items?.zipcode}</h1>
              <p className='text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima dolores harum libero iure, nisi eos laudantium quibusdam nobis molestias eligendi alias cum voluptate quaerat ipsam debitis exercitationem magni voluptatem porro.</p>
            <h1 className='flex gap-2 items-center font-semibold'><FaUserCircle/>{props?.items?.owner}</h1>
              <h1 className='text-sm w-fit flex gap-1 items-center bg-yellow-700 text-white p-1 rounded-md my-1'><FaStar className=''/>{props?.items?.star}</h1>
            <h1 className='text-black text-lg flex items-center gap-2'>₹ {props?.items?.price} {props?.items?.sales!="" && props?.items?.sales &&<p className='text-sm font-semibold text-green-600'>{props.items.sales} off</p>}</h1>
            {props?.items?.details&&<div className='w-full'>
              <ul className='flex text-lg justify-between pr-52 w-full'>
                <li>Beds <span className='flex gap-2 items-center'><FaBed/>: {props.items.details.beds}</span></li>
                <li>Area <span className='flex gap-2 items-center'><LuRectangleHorizontal/>: {props.items.details.Area}</span></li>
                <li>Area <span className='flex gap-2 items-center'><FaBath/>: {props.items.details.bathrooms}</span></li>
                <li>Floor <span className='flex gap-2 items-center'><LuBuilding/>: {props.items.details.floor}</span></li>
              </ul>
              </div>}
          </div>
        </div>
    </div>
    </Link>
  )
}
