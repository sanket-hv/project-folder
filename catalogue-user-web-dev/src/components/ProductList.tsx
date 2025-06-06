"use client";
import React, { useState } from "react";
import Layout from "./Layout";
import Container from "./Container";
import ProductCard from "./ProductCard";
import InquiryModal from "./InquiryModal";

function ProductList() {
  const [modalOpen, setModalOpen] = useState(false);

  const data = [
    {
      productName: "Product Name 1",
        href: "/products/plane",
      imgUrl:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNob2VzfGVufDB8fDB8fHww",
    },
    {
      productName: "Product Name 2",
       href: "/products/plane",
      imgUrl:
        "https://images.unsplash.com/photo-1584395630827-860eee694d7b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA",
    },
    {
      productName: "Product Name 3",
      href: "/products/plane",
      imgUrl:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNob2VzfGVufDB8fDB8fHww",
    },
    {
      productName: "Product Name 4",
       href: "/products/plane",
      imgUrl:
        "https://images.unsplash.com/photo-1584395630827-860eee694d7b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA",
    },
    {
      productName: "Product Name 5",
       href: "/products/plane",
      imgUrl:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNob2VzfGVufDB8fDB8fHww",
    },
    {
      productName: "Product Name 6",
       href: "/products/plane",
      imgUrl:
        "https://images.unsplash.com/photo-1584395630827-860eee694d7b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA",
    },
    {
      productName: "Product Name 7",
       href: "/products/plane",
      imgUrl:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNob2VzfGVufDB8fDB8fHww",
    },
    {
      productName: "Product Name 8",
       href: "/products/plane",
      imgUrl:
        "https://images.unsplash.com/photo-1584395630827-860eee694d7b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA",
    },
    {
      productName: "Product Name 9",
       href: "/products/plane",
      imgUrl:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNob2VzfGVufDB8fDB8fHww",
    },
    {
      productName: "Product Name 10",
       href: "/products/plane",
      imgUrl:
        "https://images.unsplash.com/photo-1584395630827-860eee694d7b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA",
    },
  ];

  return (
    <Layout>
      <Container>
        <h1 className="text-4xl py-4 font-semibold">Product List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((item: any, index: number) => (
            <ProductCard
              href={item.href}
              productName={item.productName}
              imgUrl={item.imgUrl}
              key={index}
              setModalOpen={setModalOpen}
            />
          ))}
        </div>
      </Container>
      <InquiryModal onClose={() => setModalOpen(false)} isOpen={modalOpen} />
    </Layout>
  );
}

export default ProductList;
