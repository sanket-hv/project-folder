import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CommonModal from "../utils/CommonModal";
import ProductContent from "./ProductContent";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteProduct, GetProduct } from "../backedHelper/helper/Product";
import { getVendorID } from "../utils/auth";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ViewDetails from "../utils/ViewDetails";
import ProductView from "./ProductView";
import CustomLinearProgress from "../utils/CustomLinearProgress ";
import { toast } from "react-toastify";

const Product = () => {
  const vendorId = getVendorID();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [productRows, setProductRows] = useState([]);
  const [productView, setProductView] = useState(false);
  const [products, setProducts] = useState("");
  const [loading, setLoading] = useState(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setProductView(false);
  };

  const handleEdit = (product) => {
    setProducts(product);
    setModalOpen(true);
  };

  const handleDelete = async (productCode) => {
    try {
      const res = await DeleteProduct(productCode);
      if (res) {
        toast.success("Product deleted successfully!");
        setModalOpen(false);
        productGet();
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleView = (product) => {
    setProducts(product);
    setProductView(true);
  };

  useEffect(() => {
    productGet();
  }, []);

  const productGet = async () => {
    try {
      const res = await GetProduct(vendorId);
      if (res.success && res.payload?.products) {
        const formattedProducts = res.payload.products.map((product) => ({
          productCode: product?._id,
          productName: product?.name,
          categoryName: product?.categoryId?.name || "N/A",
          categoryID: product?.categoryId?._id,
          price: product.price,
          productImages:
            product.productImages.length > 0
              ? product.productImages
              : "placeholder.jpg",
          shortDescription: product?.shortDescription,
          longDescription: product?.longDescription,
        }));
        setProductRows(formattedProducts);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
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
        <h2>Product</h2>
        <Button
          sx={{
            borderRadius: "10px",
            backgroundColor: "rgb(0, 99, 109)",
            width: "200px",
            padding: 1,
            color: "white",
            "&:hover": {
              backgroundColor: "#263238",
              color: "white",
            },
          }}
          startIcon={<AddIcon />}
          onClick={handleModalOpen}
        >
          New Product
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "auto",
        }}
      >
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <TableContainer sx={{ maxHeight: 640 }}>
            <Table stickyHeader>
              <TableHead
                sx={{
                  backgroundColor: "#263238",
                  color: "white",
                }}
              >
                <TableRow>
                  <TableCell
                    align="left"
                    style={{
                      minWidth: 500,
                      backgroundColor: "#263238",
                      color: "white",
                    }}
                  >
                    Product
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      minWidth: 100,
                      backgroundColor: "#263238",
                      color: "white",
                    }}
                  >
                    Category Name
                  </TableCell>

                  <TableCell
                    align="left"
                    style={{
                      minWidth: 100,
                      backgroundColor: "#263238",
                      color: "white",
                    }}
                  >
                    Price
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      minWidth: 100,
                      backgroundColor: "#263238",
                      color: "white",
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover key={row.productCode}>
                      <TableCell
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          color: "#1C252E",
                        }}
                      >
                        <img
                          src={row.productImages[0]}
                          alt="Product"
                          width="54"
                          height="54"
                          style={{ borderRadius: "10px" }}
                        />
                        {row?.productName}
                      </TableCell>
                      <TableCell>{row?.categoryName}</TableCell>
                      <TableCell>{`${row.price.toFixed(2)}`}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="success"
                          onClick={() => handleEdit(row)}
                        >
                          <EditIcon sx={{ color: "#00636D" }} />
                        </IconButton>
                        <IconButton
                          color="default"
                          onClick={() => handleView(row)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(row?.productCode)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={productRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      <CommonModal
        open={modalOpen}
        handleClose={handleModalClose}
        title="Add New Product"
      >
        <ProductContent
          handleClose={handleModalClose}
          products={products}
          productGet={productGet}
        />
      </CommonModal>

      <ViewDetails
        open={productView}
        handleClose={handleModalClose}
        title="View Product Details"
      >
        <ProductView handleClose={handleModalClose} products={products} />
      </ViewDetails>
    </>
  );
};

export default Product;
