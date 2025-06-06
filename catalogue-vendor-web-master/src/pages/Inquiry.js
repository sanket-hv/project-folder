import { Box, Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GetInquiry } from "../backedHelper/helper/Inquiry";
import { getVendorID } from "../utils/auth";
import CustomLinearProgress from "../utils/CustomLinearProgress ";

const Inquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const vendorId = getVendorID();

  useEffect(() => {
    InquiryGet();
  }, []);

  const InquiryGet = async () => {
    try {
      const res = await GetInquiry(vendorId);

      if (res.success && res.payload && res.payload.inquiries) {
        setInquiries(res?.payload?.inquiries);
      }
    } catch (error) {
      console.log("Error fetching inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <CustomLinearProgress />;
  }

  return (
    <Box>
      <h2>Inquiries</h2>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {inquiries.length > 0 ? (
          inquiries.map((inquiry, index) => (
            <Card
              key={index}
              sx={{
                width: "48%",
                borderRadius: "12px",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                padding: "10px",
                marginBottom: "20px",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ color: "rgb(0 99 109)" }}>
                  {inquiry.name}
                </Typography>
                <Typography color="textSecondary" mt={1}>
                  {inquiry.email}
                </Typography>
                <Typography color="textSecondary">{inquiry.phone}</Typography>
                <Typography sx={{ color: "#263238", mt: 1 }}>
                  {inquiry.message}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>No inquiries found.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Inquiry;
