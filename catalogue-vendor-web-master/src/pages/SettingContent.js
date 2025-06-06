import React, { useEffect, useState } from "react";
import { Button, Box, Typography, Popover } from "@mui/material";
import { SwatchesPicker } from "react-color";
import EditIcon from "@mui/icons-material/Edit";
import { CustomTextField } from "../utils/textfiled";
import { UpdateSetting } from "../backedHelper/helper/Setting";
import { uploadImage } from "../backedHelper/helper/Uplaod";
import { getVendorID } from "../utils/auth";
import { toast } from "react-toastify";

const SettingContent = ({ handleClose, siteSettings, settingSite }) => {
  const [settingState, setSettingState] = useState({
    phone: "",
    email: "",
    address: "",
    whatsapp: "",
    facebook: "",
    linkedin: "",
    instagram: "",
    twitter: "",
    youtube: "",
    pinterest: "",
    googleBusiness: "",
    color: "",
    logo: [],
  });
  const vendorId = getVendorID();
  const [image, setImage] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [errors, setErrors] = useState({
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (siteSettings) {
      setSettingState({
        phone: siteSettings.phone || "",
        email: siteSettings.email || "",
        address: siteSettings.address || "",
        whatsapp: siteSettings.whatsapp || "",
        facebook: siteSettings.facebook || "",
        linkedin: siteSettings.linkedin || "",
        instagram: siteSettings.instagram || "",
        twitter: siteSettings.twitter || "",
        youtube: siteSettings.youtube || "",
        pinterest: siteSettings.pinterest || "",
        color: siteSettings.color || "",
        logo: siteSettings.logo,
      });
    }
  }, [siteSettings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettingState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleColorChange = (color) => {
    setSettingState((prevState) => ({
      ...prevState,
      color: color.hex,
    }));
    setShowColorPicker(false);
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setShowColorPicker(true);
  };

  const handlePopoverClose = () => {
    setShowColorPicker(false);
  };

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettingState((prevState) => ({
          ...prevState,
          logo: reader.result,
        }));
      };
      reader.readAsDataURL(file);

      const formDataToSend = new FormData();
      formDataToSend.append("images", file);

      try {
        const res = await uploadImage(formDataToSend);
        setImage(res.payload?.imagePaths || []);
        toast.success("Image uploaded successfully!");
      } catch (error) {
        toast.error("Image upload failed. Please try again.");
      }
    }
  };

  const validate = () => {
    let validationErrors = {};
    if (!settingState.phone)
      validationErrors.phone = "Phone number is required";
    if (!settingState.email) validationErrors.email = "Email is required";
    if (!settingState.address) validationErrors.address = "Address is required";
    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    const payload = {
      phone: String(settingState.phone),
      email: settingState.email,
      address: settingState.address,
      whatsapp: settingState.whatsapp,
      facebook: settingState.facebook,
      linkedin: settingState.linkedin,
      instagram: settingState.instagram,
      twitter: settingState.twitter,
      youtube: settingState.youtube,
      pinterest: settingState.pinterest,
      googleBusiness: settingState.settingState,
      color: settingState.color,
      logo: image ? image : siteSettings.logo,
    };

    try {
      const res = await UpdateSetting(vendorId, payload);
      if (res) {
        toast.success("Setting updated successfully!");
        settingSite();
        handleClose();
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          mb: 3,
        }}
      >
        <img
          alt="Logo"
          src={settingState.logo}
          style={{
            height: "100px",
            width: "100px",
            borderRadius: "15px",
            objectFit: "cover",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: "-10px",
            left: "35px",
            cursor: "pointer",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "4px",
          }}
          onClick={() => document.getElementById("logo-input").click()}
        >
          <EditIcon color="success" />
        </Box>

        <input
          id="logo-input"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleLogoChange}
        />
      </Box>

      <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        <CustomTextField
          label="Phone"
          name="phone"
          value={settingState.phone}
          onChange={handleChange}
          fullWidth
          error={!!errors.phone}
          helperText={errors.phone}
        />
        <CustomTextField
          label="Email"
          name="email"
          value={settingState.email}
          onChange={handleChange}
          fullWidth
          error={!!errors.email}
          helperText={errors.email}
        />
      </div>

      <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        <CustomTextField
          label="Address"
          name="address"
          value={settingState.address}
          onChange={handleChange}
          fullWidth
          error={!!errors.address}
          helperText={errors.address}
        />
        <CustomTextField
          label="Whatsapp"
          name="whatsapp"
          value={settingState.whatsapp}
          onChange={handleChange}
          fullWidth
        />
      </div>

      <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        <CustomTextField
          label="Facebook"
          name="facebook"
          value={settingState.facebook}
          onChange={handleChange}
          fullWidth
        />
        <CustomTextField
          label="LinkedIn"
          name="linkedin"
          value={settingState.linkedin}
          onChange={handleChange}
          fullWidth
        />
      </div>

      <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        <CustomTextField
          label="Instagram"
          name="instagram"
          value={settingState.instagram}
          onChange={handleChange}
          fullWidth
        />
        <CustomTextField
          label="Twitter"
          name="twitter"
          value={settingState.twitter}
          onChange={handleChange}
          fullWidth
        />
      </div>

      <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        <CustomTextField
          label="YouTube"
          name="youtube"
          value={settingState.youtube}
          onChange={handleChange}
          fullWidth
        />
        <CustomTextField
          label="Pinterest"
          name="pinterest"
          value={settingState.pinterest}
          onChange={handleChange}
          fullWidth
        />
      </div>
      {/* 
      <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        <CustomTextField
          label="Google Business"
          name="googleBusiness"
          value={settingState.googleBusiness}
          onChange={handleChange}
          fullWidth
        />
      </div> */}

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography>Choose a Color</Typography>
        <Box
          onClick={handlePopoverOpen}
          style={{
            width: "80px",
            height: "40px",
            backgroundColor: settingState.color,
            cursor: "pointer",
            border: "1px solid #ccc",
            display: "inline-block",
          }}
        />
        <Popover
          open={showColorPicker}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          slotProps={{
            paper: {
              style: {
                height: "244px",
              },
            },
          }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <SwatchesPicker
            styles={{ maxHeight: "100%", overflowY: "auto" }}
            color={settingState.color}
            onChange={handleColorChange}
          />
        </Popover>
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
    </div>
  );
};

export default SettingContent;
