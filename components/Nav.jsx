"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    // (async () => {
    //   const res = await getProviders();
    //   setProviders(res);
    // })();
    const setProvider=async()=>{
      const response=await getProviders();
      setProviders(response)
    }

    setProvider()
  }, []);

  return (
    <nav className='fixed top-0 flex justify-between w-screen mb-16 pt-3 px-12'>
      <Link href='/' className='flex gap-2 flex-center'>
        {/* <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        /> */}
        <p className='font-extrabold text-white text-xl'>Compile-<b className="tracking-widest">CLASH</b></p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/host-comp' className='bg-black p-2 text-white'>
              Create Post
            </Link>

            <button type='button' onClick={signOut} className='outline outline-1 hover:bg-black hover:text-white outline-black p-2 px-4'>
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <div className="flex gap-4 items-center ">
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='hover:bg-gray-700  p-2 px-6 rounded-lg font-semibold text-white'
                >
                  Log In
                </button>
                <button
                  type='button'
                  key={provider.name}
                  
                  className='bg-white p-2 hover:bg-black hover:text-white px-6 rounded-lg font-semibold'
                >
                  Sign Up
                </button>
                </div>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown((prev)=>!prev)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full bg-black p-2 text-white'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='bg-black p-2 text-white'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;