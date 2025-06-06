import Image from "next/image";
import React from "react";
import Link from "next/link";
import { FaCircleInfo } from "react-icons/fa6";

function ProductCard({ productName, href, imgUrl, setModalOpen }: any) {
  return (
      <div
        className="
      border border-gray-200 
      shadow-md hover:shadow-xl 
      p-4 rounded-lg 
      transition-all duration-300 
      cursor-pointer 
      bg-white 
      hover:border-blue-400 
      hover:scale-[1.02]
      m-2
      overflow-hidden
      group
    "
      >
        <Link href={href} passHref>
        <div className="relative w-full h-0 pb-[75%] mb-4 rounded-md overflow-hidden">
          <Image
            src={imgUrl}
            alt={productName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        </Link>

        <div className="p-2">
          <h1 className="text-lg font-bold text-gray-800 mb-4 line-clamp-2">
            {productName}
          </h1>

          <button
            className="
            w-full py-2 px-4 
            bg-blue-600 hover:bg-blue-700 
            text-white font-medium 
            rounded-md 
            transition-colors duration-300 
            flex items-center justify-center gap-2
            group-hover:shadow-md
          "
            onClick={() => setModalOpen(true)}
          >
            <FaCircleInfo className="text-lg" />
            <span>Inquiry Now</span>
          </button>
        </div>
      </div>
  );
}

export default ProductCard;
