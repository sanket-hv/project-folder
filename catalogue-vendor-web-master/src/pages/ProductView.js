import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, Close } from "@mui/icons-material";

const ProductView = ({ products, handleClose }) => {
  const productImages = products.productImages || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (productImages.length > 1) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % productImages.length);
    }
  };

  const handlePrev = () => {
    if (productImages.length > 1) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <>
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          color: "#fff",
          zIndex: 10,
        }}
      >
        <Close sx={{ fontSize: "24px", color: "black" }} />
      </IconButton>
      <Box sx={{ position: "relative", display: "flex", gap: 4 }}>
        <Box>
          <Box>
            <Box
              sx={{
                position: "relative",
                display: "inline-block",
                borderRadius: "10px",
                overflow: "hidden",
                maxWidth: "100%",
                width: 450,
                height: "400px",
              }}
            >
              <img
                src={productImages[currentIndex]}
                alt={""}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              {productImages.length > 1 && (
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "#fff",
                    borderRadius: "5px",
                    padding: "5px 10px",
                  }}
                >
                  <IconButton
                    onClick={handlePrev}
                    sx={{
                      color: "#fff",
                      marginRight: 2,
                    }}
                  >
                    <ArrowBackIos sx={{ fontSize: "16px" }} />
                  </IconButton>
                  <Box sx={{ fontSize: "16px" }}>
                    {currentIndex + 1}/{productImages.length}
                  </Box>
                  <IconButton
                    onClick={handleNext}
                    sx={{
                      color: "#fff",
                      marginLeft: 2,
                    }}
                  >
                    <ArrowForwardIos sx={{ fontSize: "16px" }} />
                  </IconButton>
                </Box>
              )}
            </Box>

            {productImages.length > 1 && (
              <Box display="flex" mt={2}>
                {productImages.map((image, index) => (
                  <Box
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    sx={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      cursor: "pointer",
                      border:
                        currentIndex === index ? "2px solid #000" : "none",
                      margin: "0 5px",
                    }}
                  >
                    <img
                      src={image}
                      alt={""}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box>
            <Typography sx={{ color: "#1C252E", mt: 2, fontSize: "19px" }}>
              {products.productName}
            </Typography>
            <Typography sx={{ color: "#637381", fontSize: "14px" }}>
              {products.categoryName}
            </Typography>
            <Typography sx={{ color: "#1C252E", mt: 2, fontSize: "19px" }}>
              {`₹ ${products.price}`}
            </Typography>
          </Box>

          <Box mt={2}>
            <Typography
              sx={{
                color: "#637381",
                fontSize: "14px",
                fontWeight: 400,
              }}
            >
              {products.shortDescription}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box mt={2}>
        <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
          Product Description
        </Typography>
        <Typography
          sx={{
            color: "#1C252E",
            fontSize: "14px",
            fontWeight: 400,
          }}
        >
          {products.longDescription}
        </Typography>
      </Box>
    </>
  );
};

export default ProductView;
