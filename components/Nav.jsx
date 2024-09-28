"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useApp } from "@context/AppProviders";
import { Avatar, Button, IconButton, Input, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { HiMenu } from "react-icons/hi";
import { FaCartPlus, FaSearch } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import Modals, { AddPropertyModal } from "./Modals";

// export const Nav = () => {
//   const { data: session } = useSession();
//   const [providers, setProviders] = useState(null);
//   const [toggleDropdown, setToggleDropdown] = useState(false);

//   useEffect(() => {
//     const setProvider = async () => {
//       const response = await getProviders();
//       setProviders(response);
//     };

//     setProvider();
//   }, []);

//   return (
//     <nav className="fixed top-0 z-20 w-full bg-white shadow-md flex justify-between items-center px-6 py-3 sm:px-12 md:px-24 lg:px-64">
//       {/* Logo */}
//       <Link href="/" className="flex items-center gap-2">
//         <p className="font-extrabold text-xl sm:text-2xl tracking-wider">LAND ME</p>
//       </Link>

//       {/* Desktop Navigation */}
//       <div className="hidden sm:flex items-center gap-6">
//         {session?.user ? (
//           <div className="flex items-center gap-4">
//             <Link href="/host-comp">
//               <Button className="bg-black text-white hover:bg-gray-800">Create Post</Button>
//             </Link>
//             <Button onClick={signOut} variant="outlined" className="border-black hover:bg-black hover:text-white">
//               Sign Out
//             </Button>
//             <Link href="/profile">
//               <Avatar src={session?.user.image} alt="profile" size="sm" />
//             </Link>
//           </div>
//         ) : (
//           providers && (
//             <div className="flex gap-4">
//               {Object.values(providers).map((provider) => (
//                 <Button
//                   key={provider.name}
//                   onClick={() => signIn(provider.id)}
//                   className="p-2 px-6 rounded-full hover:bg-black hover:text-white"
//                 >
//                   Log In
//                 </Button>
//               ))}
//               <Button className="bg-black text-white p-2 px-6 rounded-full font-semibold hover:bg-white hover:text-black">
//                 Sign Up
//               </Button>
//             </div>
//           )
//         )}
//       </div>

//       {/* Mobile Navigation */}
//       <div className="flex sm:hidden items-center">
//         {session?.user ? (
//           <>
//             <IconButton onClick={() => setToggleDropdown((prev) => !prev)} className="p-0">
//               <Avatar src={session?.user.image} alt="profile" size="sm" />
//             </IconButton>
//             {toggleDropdown && (
//               <div className="absolute top-14 right-6 w-40 bg-white border rounded-md shadow-lg py-2 z-30">
//                 <Link
//                   href="/profile"
//                   className="block px-4 py-2 hover:bg-gray-100"
//                   onClick={() => setToggleDropdown(false)}
//                 >
//                   My Profile
//                 </Link>
//                 <Link
//                   href="/create-prompt"
//                   className="block px-4 py-2 hover:bg-gray-100"
//                   onClick={() => setToggleDropdown(false)}
//                 >
//                   Create Prompt
//                 </Link>
//                 <Button
//                   onClick={() => {
//                     setToggleDropdown(false);
//                     signOut();
//                   }}
//                   className="w-full mt-2 bg-black text-white hover:bg-gray-800"
//                 >
//                   Sign Out
//                 </Button>
//               </div>
//             )}
//           </>
//         ) : (
//           providers &&
//           Object.values(providers).map((provider) => (
//             <Button
//               key={provider.name}
//               onClick={() => signIn(provider.id)}
//               className="bg-black text-white rounded-full px-4"
//             >
//               Sign in
//             </Button>
//           ))
//         )}
//       </div>
//     </nav>
//   );
// };

export const AuthNav = () => {
  const { toggleAuthPage, AuthPage } = useApp();

  return (
    <nav className="z-10 bg-white shadow-md flex justify-between items-center w-full px-4 sm:px-8 md:px-16 lg:px-32 py-4">
      <Link href='/' className='flex gap-2 items-center'>
        {/* <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        /> */}
        <p className='font-extrabold text-xl sm:text-2xl tracking-wider'>LAND ME</p>
      </Link>
      <div className="text-sm sm:text-base">
        {AuthPage === "login" ? (
          <p>
            Don't have an Account? 
            <b onClick={() => toggleAuthPage("register")} className="cursor-pointer text-blue-500"> Sign up!</b>
          </p>
        ) : (
          <p>
            Already have an account? 
            <b onClick={() => toggleAuthPage("login")} className="cursor-pointer text-blue-500"> Log In!</b>
          </p>
        )}
      </div>
    </nav>
  );
}



export const DashNav = () => {
  const pathname = usePathname();
  const { handleSearchList } = useApp();
  const [modals, setModals] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  function handleLogout() {
    axios.post("/api/auth/users/logout")
      .then(() => router.push("/"))
      .catch((err) => console.log(err));
  }

  function handleSearch() {
    axios.get(`/api?query=${searchInput}`)
      .then((res) => {
        handleSearchList(res.data.data);
        setSearchInput("");
      })
      .catch((err) => console.log(err));
  }

  function AddProperty() {
    setModals((cur) => !cur);
  }

  return (
    <nav className="fixed z-10 bg-white border-b-2 border-gray-100 w-full flex items-center justify-between py-2 px-6 sm:px-12 md:px-24 lg:px-64">
      {/* Logo */}
      <Link href="/dash" className="flex items-center gap-2">
        <p className="font-extrabold text-xl sm:text-2xl tracking-wider">LAND ME</p>
      </Link>

      {/* Search Bar */}
      <div className="flex justify-center sm:justify-start w-fit mt-3 sm:mt-0">
        <div className="relative w-full px-4 py-2 rounded-full border-2 border-gray-200 shadow-sm">
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for Properties"
            className="outline-none "
          />
          <IconButton
            onClick={handleSearch}
            variant="text"
            size="sm"
            className="bg-indigo-400 rounded-full text-lg text-white hover:bg-indigo-600"
          >
            <FaSearch />
          </IconButton>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 mt-3 sm:mt-0">
        <Button
          disabled
          onClick={AddProperty}
          variant="text"
          className="rounded-full text-gray-600 cursor-not-allowed"
        >
          Add your Property
        </Button>
        <Link href="/dash/cart">
          <IconButton
            color={`${pathname.includes("cart") ? "indigo" : ""}`}
            variant={`${pathname.includes("cart") ? "filled" : "text"}`}
            className={`rounded-full ${pathname.includes("cart") ? "bg-indigo-600 text-white" : "text-gray-700 hover:text-black text-2xl"}`}
          >
            <FaCartPlus />
          </IconButton>
        </Link>
        <Menu>
          <MenuHandler>
            <Button color="white" className="border-2 rounded-full hover:shadow-md text-xl flex gap-4 items-center py-1 px-2">
              <HiMenu />
              <Avatar size="sm" src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
            </Button>
          </MenuHandler>
          <MenuList className="grid gap-2">
            <Link href="/dash/order"><MenuItem>My Orders</MenuItem></Link>
            <MenuItem onClick={handleLogout} className="bg-red-600 text-white text-center">Log Out</MenuItem>
          </MenuList>
        </Menu>
        <AddPropertyModal open={modals} onClose={AddProperty} />
      </div>
    </nav>
  );
};
