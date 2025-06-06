import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaEye } from "react-icons/fa";

function CategoryCard({ categoryName, imgUrl, href }: any) {
  return (
    <Link href={href} passHref>
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
        {/* Image Container (Aspect Ratio 4:3) */}
        <div className="relative w-full h-0 pb-[75%] mb-4 rounded-md overflow-hidden">
          <Image
            src={imgUrl}
            alt={categoryName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="p-2">
          <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
            {categoryName}
          </h2>

          <p className="text-sm text-gray-600 mb-4">
            <span className="font-medium">Total Products:</span>
            <span className="text-blue-600 ml-1 font-semibold">25</span>
          </p>

          {/* Button with subtle hover effect */}
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
          >
            <FaEye className="text-lg" />
            <span>View Products</span>
          </button>
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;
