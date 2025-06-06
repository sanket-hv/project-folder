"use client";
import Container from "@/components/Container";
import InquiryModal from "@/components/InquiryModal";
import Layout from "@/components/Layout";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

function ProductDetailsPage() {

  const { slug } = useParams();
  const [modalOpen, setModalOpen] = useState(false);

  const images = [
    "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNob2VzfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNob2VzfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNob2VzfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNob2VzfGVufDB8fDB8fHww",
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  const capitalize = (text: string | string[] | undefined) => {
    if (typeof text === "string") {
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }
    if (Array.isArray(text)) {
      return text
        .map(
          (item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
        )
        .join(", ");
    }
    return "Unknown";
  };

  const slugText = capitalize(slug);

  return (
    <Layout>
      <Container>
        <div className="flex flex-col sm:flex-row sm:gap-8 justify-between py-4">
          <h1 className="text-2xl sm:text-4xl font-semibold">{slugText}</h1>
          <button
            className="w-full sm:w-48  bg-blue-900 font-semibold rounded-lg text-white btn"
            onClick={() => setModalOpen(true)}
          >
            Inquiry Now
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative pb-[43.56%] w-full max-w-[1080px]">
            <Image
              src={selectedImage}
              alt="Selected Product"
              layout="fill"
              className="object-cover rounded-lg"
            />
          </div>

          <div className="flex sm:flex-col gap-2">
            {images.map((image, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`cursor-pointer p-1 border rounded-lg ${
                  selectedImage === image
                    ? "border-blue-600"
                    : "border-gray-200"
                }`}
              >
                <Image
                  src={image}
                  alt={`Product Thumbnail ${index + 1}`}
                  height={150}
                  width={150}
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        <p className="py-4 text-sm sm:text-base">
         Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam
          provident asperiores, labore molestias dolores, cumqu
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam
          provident asperiores, labore molestias dolores, cumqu
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam
          provident asperiores, labore molestias dolores, cumqu
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam
          provident asperiores, labore molestias dolores, cumqu
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam
          provident asperiores, labore molestias dolores, cumqu
        </p>
      </Container>


      <InquiryModal onClose={() => setModalOpen(false)} isOpen={modalOpen} />
    </Layout>
  );
}

export default ProductDetailsPage;
