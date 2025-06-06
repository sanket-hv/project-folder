import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CommonModal from "../utils/CommonModal";
import CategoryContent from "./CategoryContent";
import { getVendorID } from "../utils/auth";
import { DeleteCategory, GetCategory } from "../backedHelper/helper/Category";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomLinearProgress from "../utils/CustomLinearProgress ";
import { toast } from "react-toastify";
import { GetProduct } from "../backedHelper/helper/Product";

const Category = () => {
  const [expanded, setExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [modalType, setModalType] = useState("");
  const vendorId = getVendorID();
  const [loading, setLoading] = useState(true);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [productList, setProductList] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleModalOpen = (
    categoryId = null,
    subcategory = null,
    type = ""
  ) => {
    setSelectedCategoryId(categoryId);
    setSelectedSubcategory(subcategory);
    setModalType(type);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedCategoryId(null);
    setSelectedSubcategory(null);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleDelete = async (categoryID, subcategoryID) => {
    const id = categoryID ? categoryID : subcategoryID;
    setConfirmationDialogOpen(true);
    setCategoryToDelete(String(id));
    try {
      const res = await GetProduct(vendorId, id);
      if (res) {
        setProductList(res.payload.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await DeleteCategory(categoryToDelete);
      if (res) {
        toast.success("Category deleted successfully!");
        getAllCategories();
      }
      setConfirmationDialogOpen(false);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      setConfirmationDialogOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setConfirmationDialogOpen(false);
    setCategoryToDelete(null);
  };

  const getAllCategories = async () => {
    try {
      const res = await GetCategory(vendorId);
      if (res?.success) {
        setCategories(res.payload.categories || []);
      } else {
        console.error("Failed to fetch categories:", res.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <CustomLinearProgress />;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Categories</h2>
        <Button
          sx={{
            borderRadius: "12px",
            backgroundColor: "#00636d",
            width: "200px",
            padding: 1,
            color: "white",
            "&:hover": {
              backgroundColor: "#263238",
              color: "white",
            },
          }}
          onClick={() => handleModalOpen()}
          startIcon={<AddIcon />}
        >
          New Category
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          padding: 2,
          borderRadius: "8px",
          marginTop: 2,
        }}
      >
        {categories.map((category) => (
          <Box
            key={category.id}
            sx={{
              width: "100%",
              marginBottom: "16px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            <Accordion
              expanded={expanded === `panel${category.id}`}
              onChange={handleChange(`panel${category.id}`)}
              sx={{
                borderRadius: "10px",
                boxShadow: "none",
                border: "none",
                transition: "max-height 0.5s ease",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${category.id}-content`}
                id={`panel${category.id}-header`}
                sx={{
                  backgroundColor: "#f5f5f5",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Box display={"flex"} alignItems={"center"} gap={2}>
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        transition: "transform 0.3s ease",
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 500, marginRight: "20px" }}
                    >
                      {category.name}
                    </Typography>
                  </Box>

                  <Box>
                    <IconButton color="success">
                      <EditIcon
                        sx={{ color: "#00636D" }}
                        onClick={() =>
                          handleModalOpen(category.id, null, "editCategory")
                        }
                      />
                    </IconButton>
                    <IconButton color="error">
                      <DeleteIcon onClick={() => handleDelete(category.id)} />
                    </IconButton>
                  </Box>
                </Box>
              </AccordionSummary>

              <AccordionDetails
                sx={{
                  padding: 3,
                  backgroundColor: "#fafafa",
                  borderRadius: "8px",
                }}
              >
                <Box display={"flex"} justifyContent={"flex-end"} mb={2}>
                  <Button
                    sx={{
                      borderRadius: "12px",
                      backgroundColor: "#00636d",
                      width: "200px",
                      padding: 1,
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#263238",
                        color: "white",
                      },
                    }}
                    startIcon={<AddIcon />}
                    onClick={() => handleModalOpen(category.id)}
                  >
                    Add Sub Category
                  </Button>
                </Box>
                <Card
                  sx={{
                    marginBottom: 2,
                    textAlign: "start",
                    padding: 2,
                    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                    borderRadius: "8px",
                  }}
                >
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      transition: "transform 0.3s ease",
                    }}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6">{category.name}</Typography>
                    </Box>
                  </CardContent>
                </Card>

                {category.subcategories && category.subcategories.length > 0 ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 2,
                    }}
                  >
                    {category.subcategories.map((sub) => (
                      <Card
                        key={sub.id}
                        sx={{
                          width: "calc(23% - 16px)",
                          textAlign: "start",
                          padding: 2,
                          boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                          borderRadius: "8px",
                        }}
                      >
                        <img
                          src={sub.imageUrl}
                          alt={sub.name}
                          style={{
                            width: "100%",
                            height: "150px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                        <CardContent>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Typography>{sub.name}</Typography>
                            <Box>
                              <IconButton color="success">
                                <EditIcon
                                  sx={{ color: "#00636D" }}
                                  onClick={() =>
                                    handleModalOpen(
                                      category.id,
                                      sub.id,
                                      "editSubCategory"
                                    )
                                  }
                                />
                              </IconButton>
                              <IconButton color="error">
                                <DeleteIcon
                                  onClick={() => handleDelete(sub.id)}
                                />
                              </IconButton>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                ) : (
                  <Typography>No subcategories available.</Typography>
                )}
              </AccordionDetails>
            </Accordion>
          </Box>
        ))}
      </Box>
      <CommonModal
        open={modalOpen}
        handleClose={handleModalClose}
        title={selectedCategoryId ? "Add Sub Category" : "Add New Category"}
      >
        <CategoryContent
          handleClose={handleModalClose}
          getAllCategories={getAllCategories}
          categoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          subcategory={selectedSubcategory}
          type={modalType}
        />
      </CommonModal>

      <Dialog open={confirmationDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete?
          {productList && productList.length > 0 ? (
            productList.map((product) => (
              <Box key={product._id} sx={{ padding: 2 }}>
                <Typography variant="h6">{product.name}</Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {product.productImages && product.productImages.length > 0 ? (
                    product.productImages.map((image, index) => (
                      <img
                        key={index}
                        src={`/${image}`}
                        alt={`Product image ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "auto",
                          maxWidth: "300px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    ))
                  ) : (
                    <Typography>No images available</Typography>
                  )}
                </Box>
              </Box>
            ))
          ) : (
            <Typography mt={2}>No products found.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancelDelete}
            sx={{
              backgroundColor: "#ccc",
              color: "#000",
              "&:hover": { backgroundColor: "#bbb" },
            }}
          >
            No
          </Button>
          <Button
            onClick={handleConfirmDelete}
            sx={{
              backgroundColor: "rgb(0, 99, 109)",
              color: "white",
              "&:hover": { backgroundColor: "#005c63" },
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Category;
