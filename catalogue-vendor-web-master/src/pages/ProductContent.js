import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { CreateProduct, UpdateProduct } from "../backedHelper/helper/Product";
import UploadIcon from "@mui/icons-material/Upload";
import CloseIcon from "@mui/icons-material/Close";
import { CustomTextField } from "../utils/textfiled";
import { GetCategoryList } from "../backedHelper/helper/Category";
import { getVendorID } from "../utils/auth";
import { uploadImage } from "../backedHelper/helper/Uplaod";
import { toast } from "react-toastify";

const ProductContent = ({ handleClose, products, productGet }) => {
  const vendorId = getVendorID();
  const [formData, setFormData] = useState({
    productName: "",
    categoryName: "",
    price: "",
    shortDescription: "",
    longDescription: "",
    productImages: [],
  });
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);

  const [errors, setErrors] = useState({
    productName: "",
    price: "",
    productImages: "",
  });

  useEffect(() => {
    if (products) {
      setFormData({
        productName: products.productName || "",
        categoryName: products.categoryID || "",
        price: products.price || "",
        shortDescription: products.shortDescription || "",
        longDescription: products.longDescription || "",
        productImages: products.productImages || [],
      });
      setImage(products.productImages);
    }
  }, [products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileUploadClick = () => {
    document.getElementById("file-upload").click();
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const filePreviews = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      file,
    }));

    setFormData((prevState) => ({
      ...prevState,
      productImages: [...prevState.productImages, ...filePreviews],
    }));

    const formDataToSend = new FormData();
    files.forEach((file) => {
      formDataToSend.append("images", file);
    });

    try {
      const res = await uploadImage(formDataToSend);
      setImage(res.payload.imagePaths);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Image upload failed. Please try again.");
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prevState) => {
      const updatedImages = [...prevState.productImages];
      updatedImages.splice(index, 1);
      return {
        ...prevState,
        productImages: updatedImages,
      };
    });
  };

  useEffect(() => {
    categoriesList();
  }, []);

  const categoriesList = async () => {
    try {
      const res = await GetCategoryList(vendorId);
      if (res.success) {
        setCategories(res.payload);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!formData.productName) {
      formErrors.productName = "Product Name is required";
      isValid = false;
    }
    if (!formData.price) {
      formErrors.price = "Price is required";
      isValid = false;
    }
    if (formData.productImages.length === 0) {
      formErrors.productImages = "At least one product image is required";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const payload = {
      name: formData.productName,
      price: parseFloat(formData.price),
      shortDescription: formData.shortDescription,
      longDescription: formData.longDescription,
      categoryId: formData.categoryName,
      productImages: image,
    };

    try {
      let res;
      if (products) {
        res = await UpdateProduct(products.productCode, payload);
      } else {
        res = await CreateProduct(payload);
      }

      if (res) {
        toast.success("Product saved successfully!");
        handleClose();
        productGet();
      } else {
        toast.error("Failed to save product. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ flex: "1 1 100%", sm: "1 1 48%" }}>
          <CustomTextField
            fullWidth
            label="Product Name"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            margin="normal"
            error={!!errors.productName}
            helperText={errors.productName}
          />
        </Box>

        <Box sx={{ flex: "1 1 100%", sm: "1 1 48%" }}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label">Category Name</InputLabel>
            <Select
              labelId="category-label"
              id="category-select"
              value={formData.categoryName}
              label="Category Name"
              name="categoryName"
              onChange={handleInputChange}
            >
              {categories.length > 0 ? (
                categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No categories available</MenuItem>
              )}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ flex: "1 1 100%", sm: "1 1 48%" }}>
          <CustomTextField
            fullWidth
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            type="number"
            margin="normal"
            error={!!errors.price}
            helperText={errors.price}
          />
        </Box>

        <Box sx={{ flex: "1 1 100%", sm: "1 1 48%" }}>
          <CustomTextField
            fullWidth
            label="Short Description"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleInputChange}
            multiline
            rows={3}
            margin="normal"
          />
        </Box>

        <Box sx={{ flex: "1 1 100%", sm: "1 1 48%" }}>
          <CustomTextField
            fullWidth
            label="Long Description"
            name="longDescription"
            value={formData.longDescription}
            onChange={handleInputChange}
            multiline
            rows={3}
            margin="normal"
          />
        </Box>

        <Box sx={{ flex: "1 1 100%", sm: "1 1 48%" }}>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Product Images
          </Typography>

          <Box
            onClick={handleFileUploadClick}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px dashed #ccc",
              borderRadius: 2,
              padding: 2,
              cursor: "pointer",
              width: "94%",
              "&:hover": { borderColor: "rgb(0, 99, 109)" },
            }}
          >
            <UploadIcon sx={{ marginRight: 1 }} />
            <Typography variant="body2">Click to upload images</Typography>
            <input
              type="file"
              id="file-upload"
              name="productImages"
              onChange={handleFileChange}
              multiple
              accept="image/*"
              style={{ display: "none" }}
            />
          </Box>
          {errors.productImages && (
            <FormHelperText error>{errors.productImages}</FormHelperText>
          )}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              marginTop: 2,
            }}
          >
            {formData.productImages.map((file, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  width: 100,
                  height: 100,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <img
                  src={file.url}
                  alt={file.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleRemoveImage(index)}
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                    },
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", sm: "flex-end" },
          marginTop: 2,
          gap: 2,
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            backgroundColor: "#ccc",
            color: "#000",
            "&:hover": { backgroundColor: "#bbb" },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          sx={{
            backgroundColor: "rgb(0, 99, 109)",
            color: "white",
            "&:hover": { backgroundColor: "#005c63" },
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default ProductContent;
