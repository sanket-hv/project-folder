import Container from "@/components/Container";
import Layout from "@/components/Layout";
import Image from "next/image";
import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { CgWebsite } from "react-icons/cg";
import { MdLocalPhone } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";

function AboutUsDetails() {
  return (
    <Layout>
      <div className="bg-blue-50">
        <Container>
          <div className="flex justify-center items-center h-full lg:h-[calc(100vh-80px)]">
            <div className="flex lg:flex-row lg:my-0 my-4 flex-col mx-auto rounded-xl max-w-5xl hover:scale-[1.01] transition-all duration-300 group">
              <div className="w-full lg:w-[50%] p-6 flex flex-col justify-center items-center bg-blue-900 text-white rounded-tl-xl rounded-tr-xl lg:rounded-bl-xl lg:rounded-tr-none border-[1px] border-blue-900">
                <Image
                  src="https://imageio.forbes.com/specials-images/imageserve/67531eb2b5f7c9e191f632d7/0x0.jpg?format=jpg&crop=711,713,x316,y125,safe&height=416&width=416&fit=bounds"
                  width={300}
                  height={500}
                  alt="About Us"
                  className="rounded-full object-cover"
                />
                <h1 className="text-4xl font-semibold my-4">Nitish Agrwal</h1>
                <p className="tracking-wider">OWNER OF SAMARTH ENTERPRISES</p>
              </div>
              <div className="w-full lg:w-[50%] p-6 flex flex-col justify-between border-[1px] border-gray-300 rounded-bl-xl rounded-br-xl lg:rounded-tr-xl lg:rounded-bl-none group-hover:border-blue-900 bg-white">
                <div className="flex flex-col justify-between gap-4">
                  <h1 className="text-3xl mb-3 font-semibold">About Us :</h1>
                  <div className="flex gap-4 items-center font-semibold cursor-pointer hover:text-blue-900">
                    <div className="w-6">
                      <IoLocationSharp className="text-3xl" />
                    </div>
                    <a
                      href="https://www.google.com/maps/place/Matoshree+App.+Shop+no+-+1,+Konark+Nagar,+near+Hotel+Sayaji+Palace.+Panchvati+Nashik+-+422003"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Matoshree App. Shop no - 1, Konark Nagar, near Hotel
                      Sayaji Palace. Panchvati Nashik - 422003
                    </a>
                  </div>
                  <div className="flex gap-4 items-center font-semibold break-all cursor-pointer hover:text-blue-900">
                    <div className="w-6">
                      <IoMdMail className="text-3xl" />
                    </div>
                    <a href="mailto:infosamarthentp02@gmail.com">
                      infosamarthentp02@gmail.com
                    </a>
                  </div>
                  <div className="flex gap-4 items-center font-semibold break-all cursor-pointer hover:text-blue-900">
                    <div className="w-6">
                      <CgWebsite className="text-3xl" />
                    </div>
                    <a
                      href="https://www.google.co.in"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://www.google.co.in
                    </a>
                  </div>
                  <div className="flex gap-4 items-center font-semibold cursor-pointer hover:text-blue-900">
                    <div className="w-6">
                      <MdLocalPhone className="text-3xl" />
                    </div>
                    <a href="tel:+919988774455">+91 99887 74455</a>
                  </div>
                  <div className="flex gap-6 flex-wrap">
                    <a
                      href="tel:+919988774455"
                      className="border-black border-[1px] rounded-full p-2 cursor-pointer hover:text-white hover:bg-blue-900 hover:border-blue-900 transition-all duration-300"
                    >
                      <MdLocalPhone className="text-3xl" />
                    </a>
                    <a
                      href="https://wa.me/919988774455"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-black border-[1px] rounded-full p-2 cursor-pointer hover:text-white hover:bg-blue-900 hover:border-blue-900 transition-all duration-300"
                    >
                      <FaWhatsapp className="text-3xl" />
                    </a>
                    <a
                      href="mailto:infosamarthentp02@gmail.com"
                      className="border-black border-[1px] rounded-full p-2 cursor-pointer hover:text-white hover:bg-blue-900 hover:border-blue-900 transition-all duration-300"
                    >
                      <IoMailOutline className="text-3xl" />
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-black border-[1px] rounded-full p-2 cursor-pointer hover:text-white hover:bg-blue-900 hover:border-blue-900 transition-all duration-300"
                    >
                      <FiFacebook className="text-3xl" />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-black border-[1px] rounded-full p-2 cursor-pointer hover:text-white hover:bg-blue-900 hover:border-blue-900 transition-all duration-300"
                    >
                      <FaInstagram className="text-3xl" />
                    </a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center justify-center gap-4 w-full mt-4 py-2 border-blue-900 border-[1px] bg-white font-semibold rounded-lg text-blue-900 hover:bg-blue-900 hover:bg-opacity-10 transition-all duration-500">
                    Rate us
                    <div className="flex gap-1">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStarHalfAlt />
                    </div>
                  </button>
                  <button className="w-full mt-4 py-2 bg-blue-900 font-semibold rounded-lg text-white hover:bg-blue-950 transition-all duration-500">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
}

export default AboutUsDetails;
