"use client"
import { ItemCards } from '@components/Cards'
import { useApp } from '@context/AppProviders'
import { filterIcon } from '@public/icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { TbError404 } from "react-icons/tb";

export default function Dash() {
  const { propertyData, funcSetProperty, searchList, handleSearchList } = useApp();
  const [keyword, setKeyword] = useState("All")

  useEffect(() => {
    axios.get("/api/property?query=all")
      .then(res => {
        console.log(res.data)
        funcSetProperty(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className='w-full'>
      {/* Filter Section */}
      <div className='fixed z-5 top-10 w-full py-4'>
        <ul className='bg-white flex flex-wrap justify-center md:justify-evenly px-6 md:px-12 lg:px-32 xl:px-48 items-end shadow-md py-3 pt-6'>
          {filterIcon.map(data => {
            return (
              <li
                key={data.id}
                onClick={() => {
                  setKeyword(data.title)
                  handleSearchList(null)
                }}
                className={`cursor-pointer grid place-items-center text-xs md:text-sm hover:text-black transition-all ${keyword === data.title ? "text-black" : "text-gray-500"}`}
              >
                {data.icon}
                <h1 className='text-center'>{data.title}</h1>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Content Section */}
      {searchList && searchList?.length > 0 ? (
        <div className='pt-40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 place-items-center gap-6 md:gap-8 px-6 md:px-12 lg:px-24'>
          {searchList.map(data => (
            <ItemCards key={data.id} items={data} />
          ))}
        </div>
      ) : (
        <div className='pt-40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 place-items-center gap-6 md:gap-8 px-6 md:px-12 lg:px-24'>
          {keyword === "All" ? (
            propertyData && propertyData.length > 0 ? (
              propertyData.map(data => (
                <ItemCards key={data.id} items={data} />
              ))
            ) : (
              <p className='text-xl w-full text-gray-500 text-center'>Loading...</p>
            )
          ) : (
            // Filter properties based on keyword
            propertyData && propertyData.length > 0 ? (
              propertyData.map(data => {
                if (Array.isArray(data.keywords) && data.keywords.includes(keyword)) {
                  return (
                    <ItemCards key={data.id} items={data} />
                  );
                }
                return null; // Return null if no keyword matches
              }).filter(item => item !== null) // Filter out null values
            ) : (
              <p className='text-xl w-full text-gray-500 text-center'>No Result Found</p>
            )
          )}
          {/* If no results match */}
          {keyword !== "All" && propertyData && propertyData.length > 0 && propertyData.every(data =>
            !(Array.isArray(data.keywords) && data.keywords.includes(keyword))
          ) && (
            <div className='w-full text-center mt-8'>
              <TbError404 className='text-6xl sm:text-8xl text-gray-600 mx-auto' />
              <p className='text-xl text-gray-500'>No Result Found</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
