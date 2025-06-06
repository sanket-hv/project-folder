import React, { useEffect, useState } from "react";
import { Box, Tabs, Typography, Card, Button } from "@mui/material";
import { StyledTab } from "../utils/CommonTab";
import CommonModal from "../utils/CommonModal";
import ProfileContent from "./ProfileContent";
import { getVendorID } from "../utils/auth";
import { GetProfile } from "../backedHelper/helper/Profile";
import CustomLinearProgress from "../utils/CustomLinearProgress ";

const Profile = () => {
  const vendorId = getVendorID();
  const [value, setValue] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [vendorData, setVendorData] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const res = await GetProfile(vendorId);
      if (res?.success) {
        setVendorData(res.payload.vendorData);
      }
    } catch (error) {
      console.log("Error fetching profile:", error);
    }
  };

  if (!vendorData) {
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
        <h2>Profile</h2>
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
          onClick={handleModalOpen}
        >
          Edit Profile
        </Button>
      </Box>

      {/* Display the vendor's basic information */}
      {vendorData && (
        <Box
          sx={{
            background:
              "linear-gradient(45deg, #004c63,rgb(1, 122, 136),rgb(2, 129, 146),rgb(5, 109, 98))",
            color: "white",
            padding: "30px 20px",
            borderRadius: "15px",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            mb: 4,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {vendorData.name} {/* Vendor Name */}
          </Typography>
          <Typography variant="h6" mt={2}>
            {vendorData.address} {/* Vendor Address */}
          </Typography>
          <Typography variant="h6" mt={1}>
            {vendorData.mobileNo} {/* Vendor Mobile Number */}
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          borderRadius: "10px",
          mt: 3,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="vendor details tabs"
          TabIndicatorProps={{
            style: { display: "none" },
          }}
          sx={{
            backgroundColor: "rgb(38, 50, 56)",
            borderRadius: "10px",
            "& .MuiTabs-flexContainer": {
              p: 1,
            },
          }}
        >
          <StyledTab label="Payment Details" />
          <StyledTab label="Business Details" />
        </Tabs>
      </Box>

      <Box sx={{ width: "100%", mt: 2 }}>
        <Card
          sx={{
            borderRadius: "12px",
            maxWidth: 600,
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            padding: "20px",
            flex: "1 1 45%",
            border: "1px solid #ccc",
          }}
        >
          <Box sx={{ width: "100%" }}>
            {value === 0 && vendorData?.paymentDetails && (
              <div>
                <Typography sx={{ fontWeight: "bold" }}>Bank Name:</Typography>
                <Typography>{vendorData.paymentDetails.bankName}</Typography>

                <Typography sx={{ fontWeight: "bold" }}>
                  Account Holder Name:
                </Typography>
                <Typography>
                  {vendorData.paymentDetails.accountHolderName}
                </Typography>

                <Typography sx={{ fontWeight: "bold" }}>
                  Account Number:
                </Typography>
                <Typography>
                  {vendorData.paymentDetails.accountNumber}
                </Typography>

                <Typography sx={{ fontWeight: "bold" }}>
                  Account Type:
                </Typography>
                <Typography>{vendorData.paymentDetails.accoutType}</Typography>
              </div>
            )}
            {value === 1 && vendorData?.businessDetails && (
              <div>
                <Typography sx={{ fontWeight: "bold" }}>
                  Company Name:
                </Typography>
                <Typography>
                  {vendorData.businessDetails.companyName}
                </Typography>

                <Typography sx={{ fontWeight: "bold" }}>
                  GST Address:
                </Typography>
                <Typography>{vendorData.businessDetails.gstAddress}</Typography>

                <Typography sx={{ fontWeight: "bold" }}>GST No:</Typography>
                <Typography>{vendorData.businessDetails.gstNo}</Typography>
              </div>
            )}
          </Box>
        </Card>
      </Box>

      <CommonModal
        open={modalOpen}
        handleClose={handleModalClose}
        title="Edit Profile"
      >
        <ProfileContent
          handleClose={handleModalClose}
          vendorData={vendorData}
          getProfile={getProfile}
        />
      </CommonModal>
    </>
  );
};

export default Profile;
