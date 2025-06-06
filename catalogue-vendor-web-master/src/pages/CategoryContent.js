import React, { useEffect, useState } from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import CloseIcon from "@mui/icons-material/Close";
import { uploadImage } from "../backedHelper/helper/Uplaod";
import {
  CreateCategory,
  GetCategory,
  PutCategory,
} from "../backedHelper/helper/Category";
import { getVendorID } from "../utils/auth";
import { CustomTextField } from "../utils/textfiled";
import { toast } from "react-toastify";
import axios from "axios";

const CategoryContent = ({
  handleClose,
  getAllCategories,
  categoryId,
  subcategory,
  setSelectedCategoryId,
  type,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    categoryImages: [],
  });
  const [errors, setErrors] = useState({
    name: "",
    categoryImages: "",
  });
  const vendorId = getVendorID();

  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (categoryId && type === "editCategory") {
      const selectedCategory = categories.find(
        (category) => category.id === categoryId
      );

      if (selectedCategory) {
        setFormData({
          name: selectedCategory.name || "",
          categoryImages: selectedCategory.imageUrl
            ? [{ url: selectedCategory.imageUrl }]
            : [],
        });
        setImage(selectedCategory.imageUrl ? [selectedCategory.imageUrl] : []);
      }
    }
    if (subcategory && type === "editSubCategory") {
      const selectedSubCategory = categories
        .flatMap((category) => category.subcategories || [])
        .find((subcategoryItem) => subcategoryItem.id === subcategory);

      if (selectedSubCategory) {
        setFormData({
          name: selectedSubCategory.name || "",
          categoryImages: selectedSubCategory.imageUrl
            ? [{ url: selectedSubCategory.imageUrl }]
            : [],
        });
        setImage(
          selectedSubCategory.imageUrl ? [selectedSubCategory.imageUrl] : []
        );
      }
    }
  }, [categoryId, subcategory, categories]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
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
      categoryImages: [...prevState.categoryImages, ...filePreviews],
    }));

    const formDataToSend = new FormData();
    files.forEach((file) => {
      setImage(file);
      formDataToSend.append("categoryImages", file);
    });

    try {
      const res = await uploadImage(formDataToSend);
      // setImage(res.payload.imagePaths);
      setImage(formDataToSend);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Image upload failed. Please try again.");
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prevState) => {
      const updatedImages = [...prevState.categoryImages];
      updatedImages.splice(index, 1);
      return {
        ...prevState,
        categoryImages: updatedImages,
      };
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const res = await GetCategory(vendorId);
      if (res?.success) {
        setCategories(res.payload.categories || []);
      } else {
        console.error("Failed to fetch categories:", res.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = "Category name is required";
    if (formData.categoryImages.length === 0)
      formErrors.categoryImages = "At least one image is required";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);

    formDataToSend.append("categoryImages", image);

    // const payload = {
    //   name: formData.name,
    //   categoryImages: formData.categoryImages,
    //   ...(type !== "editSubCategory" &&
    //     type !== "editCategory" &&
    //     categoryId &&
    //     !subcategory && { parentId: categoryId }),
    // };

    console.log("image formdata", formDataToSend);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const res =
        subcategory && type === "editSubCategory"
          ? await PutCategory(subcategory, formDataToSend)
          : categoryId && type === "editCategory"
          ? await PutCategory(categoryId, formDataToSend)
          : await CreateCategory(formDataToSend, config);

      if (res) {
        toast.success("Category saved successfully!");
        getAllCategories();
        setSelectedCategoryId(null);
      } else {
        toast.error("Failed to save product. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }

    handleClose();
  };

  const handleSubmitThis = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);

    formData.categoryImages.forEach((imgObj) => {
      formDataToSend.append("categoryImages", imgObj.file);
    });

    await axios.post("http://localhost:8080/api/category", formDataToSend);
  };

  const handleFileUploadClick = () => {
    document.getElementById("file-upload").click();
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <CustomTextField
          fullWidth
          label="Category Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          margin="normal"
          error={!!errors.name}
          helperText={errors.name}
        />

        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Category Images
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
            width: "100%",
            "&:hover": { borderColor: "rgb(0, 99, 109)" },
          }}
        >
          <UploadIcon sx={{ marginRight: 1 }} />
          <Typography variant="body2">Click to upload images</Typography>
          <input
            type="file"
            id="file-upload"
            name="categoryImages"
            onChange={handleFileChange}
            multiple
            accept="image/*"
            style={{ display: "none" }}
          />
        </Box>
        {errors.categoryImages && (
          <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>
            {errors.categoryImages}
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            marginTop: 2,
          }}
        >
          {formData.categoryImages.map((file, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                width: "100px",
                height: "100px",
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
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
          onClick={handleSubmitThis}
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

export default CategoryContent;
