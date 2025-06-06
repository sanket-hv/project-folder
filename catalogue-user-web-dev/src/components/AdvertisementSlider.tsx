"use client";
import Image from "next/image";
import Layout from "./Layout";
import Container from "./Container";
import { useState } from "react";
function AdvertisementSlider() {
  const [current, setCurrent] = useState(0);
  const NextSlider = () => {
    setCurrent((current + 1) % banner.length);
  };
  const PrevSlider = () => {
    setCurrent((current - 1 + banner.length) % banner.length);
  };

  const banner = [
    {
      id: 1,
      imgUrl:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNob2VzfGVufDB8fDB8fHww",
    },
    {
      id: 2,
      imgUrl:
        "https://images.unsplash.com/photo-1584395630827-860eee694d7b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA",
    },
    {
      id: 3,
      imgUrl:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNob2VzfGVufDB8fDB8fHww",
    },
    {
      id: 4,
      imgUrl:
        "https://images.unsplash.com/photo-1584395630827-860eee694d7b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA",
    },
    {
      id: 5,
      imgUrl:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNob2VzfGVufDB8fDB8fHww",
    },
  ];
  return (
    <>
      <Layout>
        <Container>
          <div
            id="default-carousel"
            className="relative w-full"
            data-carousel="static"
          >
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
              {banner.map((item: any, index: number) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out
    ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"}
  `}
                  data-carousel-item={index === current ? "active" : ""}
                >
                  <Image
                    id={item.id}
                    src={item.imgUrl}
                    alt="Product"
                    layout="fill"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={PrevSlider}
              type="button"
              className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
                <svg
                  className="w-6 h-6 text-black"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 8 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
                  />
                </svg>
              </span>
            </button>
            <button
              onClick={NextSlider}
              type="button"
              className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
                <svg
                  className="w-6 h-6 text-black"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 8 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                  />
                </svg>
              </span>
            </button>
          </div>
        </Container>
      </Layout>
    </>
  );
}

export default AdvertisementSlider;
