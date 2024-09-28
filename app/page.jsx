import Image from "next/image";
import Link from "next/link";
import { FaRegPlayCircle } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <section className="text-black w-full bg-white min-h-screen flex items-center justify-center flex-col">
        <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 text-center lg:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 place-items-center">
            <div className="w-11/12" draggable="false">
              <h1 className="font-extrabold text-xl lg:text-3xl ">LAND ME</h1>
              <h2 className="font-thin text-xl lg:text-8xl">Gateway to</h2>
              <h2 className="font-extrabold text-5xl lg:text-6xl xl:text-7xl py-2 pb-6">
                DREAM PROPERTY
              </h2>
              <p className="font-thin text-base lg:text-lg xl:text-xl">
                Discover a curated collection of Dream properties at your fingertips, simplified,
                personalized, just for you!
              </p>
              <div className="text-lg mt-6 flex flex-col lg:flex-row gap-6 lg:gap-10">
                <Link href="/authentication">
                  <button className="bg-black text-white py-4 px-8 lg:px-16 rounded-full hover:bg-white hover:text-black border-4 border-black">
                    Discover Now!
                  </button>
                </Link>
                <button
                  disabled={true}
                  className="border-4 border-gray-300 cursor-not-allowed text-gray-300 font-bold p-4 px-8 lg:px-12 rounded-full flex gap-4 items-center justify-center"
                >
                  <FaRegPlayCircle className="text-3xl lg:text-4xl" /> Watch a Demo
                </button>
              </div>
            </div>
            <div className="w-full">
              <img
                draggable="false"
                className="w-full lg:scale-110"
                src="https://img.freepik.com/free-photo/view-3d-house-model_23-2150761064.jpg?t=st=1727531200~exp=1727534800~hmac=eadcd16995c0ebe1b739ff6615192b74581aac07f3c456e6219e865aa825b4da&w=1380"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
