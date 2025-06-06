import React, { useEffect, useState } from "react";
import { Typography, Avatar, Divider, Box, Button } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PinterestIcon from "@mui/icons-material/Pinterest";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CommonModal from "../utils/CommonModal";
import SettingContent from "./SettingContent";
import { GetSetting } from "../backedHelper/helper/Setting";
import { getVendorID } from "../utils/auth";
import CustomLinearProgress from "../utils/CustomLinearProgress ";

const Setting = () => {
  const vendorId = getVendorID();
  const [modalOpen, setModalOpen] = useState(false);
  const [siteSettings, setSiteSettings] = useState(null);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleSaveSettings = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    settingSite();
  }, []);

  const settingSite = async () => {
    try {
      const res = await GetSetting(vendorId);
      if (res.success) {
        setSiteSettings(res?.payload?.siteSettings);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  if (!siteSettings) {
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
        <h2>Setting</h2>
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
          Update Setting
        </Button>
      </Box>

      {siteSettings.map((siteSettings, index) => (
      <Box
      key={index}
        sx={{
          padding: 2,
          width: "98%",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
      >
        <Box>
          <Box
            sx={{
              position: "relative",
              background:
                "linear-gradient(45deg, #004c63,rgb(1, 122, 136),rgb(2, 129, 146),rgb(5, 109, 98))",
              color: "white",
              padding: "30px 20px",
              borderRadius: "15px",
              display: "flex",
              flexDirection: "column",
              mb: 4,
              height: "70PX",
            }}
          >
            <Box display="flex" justifyContent="flex-start">
              <Avatar
                src={siteSettings?.logo[0]}
                alt="Logo"
                sx={{
                  width: 120,
                  height: 120,
                  position: "absolute",
                  bottom: "-20%",
                  left: "80px",
                  transform: "translateX(-50%)",
                }}
              />
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 2, mt: 5 }} />

        <Box display="flex" flexDirection="column" gap={2} mb={2}>
          <Typography variant="body1">
            <BusinessIcon sx={{ verticalAlign: "middle", mr: 1 }} />
            {siteSettings?.address}
          </Typography>
          <Typography variant="body1">
            <PhoneIcon sx={{ verticalAlign: "middle", mr: 1 }} />
            {siteSettings?.phone}
          </Typography>
          <Typography variant="body1">
            <EmailIcon sx={{ verticalAlign: "middle", mr: 1 }} />
            {siteSettings?.mainWeb}
          </Typography>
        </Box>

        <Typography variant="h6" align="center">
          Social Media
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
          {siteSettings?.facebook && (
            <Box display="flex" alignItems="center">
              <FacebookIcon color="primary" sx={{ mr: 1 }} />
              <Typography>{siteSettings?.facebook}</Typography>
            </Box>
          )}
          {siteSettings?.linkedin && (
            <Box display="flex" alignItems="center">
              <LinkedInIcon color="primary" sx={{ mr: 1 }} />
              <Typography>{siteSettings?.linkedin}</Typography>
            </Box>
          )}
          {siteSettings?.instagram && (
            <Box display="flex" alignItems="center">
              <InstagramIcon color="secondary" sx={{ mr: 1 }} />
              <Typography>{siteSettings?.instagram}</Typography>
            </Box>
          )}
          {siteSettings?.twitter && (
            <Box display="flex" alignItems="center">
              <TwitterIcon color="primary" sx={{ mr: 1 }} />
              <Typography>{siteSettings?.twitter}</Typography>
            </Box>
          )}
          {siteSettings?.whatsapp && (
            <Box display="flex" alignItems="center">
              <WhatsAppIcon color="success" sx={{ mr: 1 }} />
              <Typography>{siteSettings?.whatsapp}</Typography>
            </Box>
          )}
          {siteSettings?.youtube && (
            <Box display="flex" alignItems="center">
              <YouTubeIcon color="error" sx={{ mr: 1 }} />
              <Typography>{siteSettings?.youtube}</Typography>
            </Box>
          )}
          {siteSettings?.pinterest && (
            <Box display="flex" alignItems="center">
              <PinterestIcon color="error" sx={{ mr: 1 }} />
              <Typography>{siteSettings?.pinterest}</Typography>
            </Box>
          )}
        </Box>
      </Box>))}

      <CommonModal
        open={modalOpen}
        handleClose={handleModalClose}
        title="Update Setting"
      >
        <SettingContent
          handleClose={handleModalClose}
          handleSave={handleSaveSettings}
          siteSettings={siteSettings}
          settingSite={settingSite}
        />
      </CommonModal>
    </>
  );
};

export default Setting;
