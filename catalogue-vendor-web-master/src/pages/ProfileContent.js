import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { CustomTextField } from "../utils/textfiled";
import { putProfile } from "../backedHelper/helper/Profile";
import { getVendorID } from "../utils/auth";
import { toast } from "react-toastify";

const ProfileContent = ({ handleClose, vendorData, getProfile }) => {
  const vendorId = getVendorID();
  const [profile, setProfile] = useState({
    name: "",
    address: "",
    mobileNo: "",
    paymentDetails: {
      bankName: "",
      accountHolderName: "",
      accountType: "",
      accountNumber: "",
    },
    businessDetails: {
      companyName: "",
      gstNo: "",
      gstAddress: "",
    },
  });

  const [errors, setErrors] = useState({
    name: "",
    address: "",
    mobileNo: "",
    paymentDetails: {
      accountNumber: "",
      accountHolderName: "",
      bankName: "",
      accountType: "",
    },
    businessDetails: {
      companyName: "",
      gstNo: "",
      gstAddress: "",
    },
  });

  const usernameRegex = /^[a-z0-9_-]+$/;

  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}$/;

  const accountNumberRegex = /^[0-9]+$/;

  useEffect(() => {
    if (vendorData) {
      setProfile({
        name: vendorData.name || "",
        address: vendorData.address || "",
        mobileNo: vendorData.mobileNo ? String(vendorData.mobileNo) : "",
        paymentDetails: {
          bankName: vendorData.paymentDetails.bankName || "",
          accountHolderName: vendorData.paymentDetails.accountHolderName || "",
          accountType: vendorData.paymentDetails.accountType || "",
          accountNumber: vendorData.paymentDetails.accountNumber || "",
        },
        businessDetails: {
          companyName: vendorData.businessDetails.companyName || "",
          gstNo: vendorData.businessDetails.gstNo || "",
          gstAddress: vendorData.businessDetails.gstAddress || "",
        },
      });
    }
  }, [vendorData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name" && value && !usernameRegex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Username must be in lowercase and can only contain letters, digits, underscores, or hyphens.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "",
      }));
    }

    if (
      name === "paymentDetails.accountNumber" &&
      value &&
      !accountNumberRegex.test(value)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        paymentDetails: {
          ...prevErrors.paymentDetails,
          accountNumber: "Account number must only contain digits.",
        },
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        paymentDetails: {
          ...prevErrors.paymentDetails,
          accountNumber: "",
        },
      }));
    }

    if (name === "businessDetails.gstNo" && value && !gstRegex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        businessDetails: {
          ...prevErrors.businessDetails,
          gstNo: "Please enter a valid GST number.",
        },
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        businessDetails: {
          ...prevErrors.businessDetails,
          gstNo: "",
        },
      }));
    }

    setProfile((prevProfile) => {
      const keys = name.split(".");
      if (keys.length === 1) {
        return { ...prevProfile, [name]: value };
      }
      return {
        ...prevProfile,
        [keys[0]]: {
          ...prevProfile[keys[0]],
          [keys[1]]: value,
        },
      };
    });
  };

  const handleSubmit = async () => {
    let newErrors = { ...errors };

    Object.keys(profile).forEach((key) => {
      if (typeof profile[key] === "object") {
        Object.keys(profile[key]).forEach((nestedKey) => {
          if (!profile[key][nestedKey]) {
            newErrors = {
              ...newErrors,
              [key]: {
                ...newErrors[key],
                [nestedKey]: `${nestedKey
                  .replace(/([A-Z])/g, " $1")
                  .toUpperCase()} is required.`,
              },
            };
          }
        });
      } else {
        if (!profile[key]) {
          newErrors = {
            ...newErrors,
            [key]: `${key
              .replace(/([A-Z])/g, " $1")
              .toUpperCase()} is required.`,
          };
        }
      }
    });

    if (!profile.paymentDetails.accountType) {
      newErrors = {
        ...newErrors,
        paymentDetails: {
          ...newErrors.paymentDetails,
          accountType: "Account Type is required",
        },
      };
    }

    setErrors(newErrors);

    try {
      const res = await putProfile(vendorId, profile);
      if (res) {
        toast.success("Profile saved successfully!");
        handleClose();
        getProfile();
      } else {
        toast.error("Failed to save product. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ width: "100%" }}>Profile Details</Typography>
        {["name", "mobileNo", "address"].map((field) => (
          <CustomTextField
            key={field}
            label={field.replace(/([A-Z])/g, " $1").toUpperCase()}
            name={field}
            value={profile[field]}
            onChange={handleChange}
            error={!!errors[field]}
            helperText={errors[field]}
            sx={{ flex: "1 1 calc(16.66% - 16px)", minWidth: "250px" }}
          />
        ))}
        <Typography sx={{ width: "100%" }}>Payment Details</Typography>
        {Object.keys(profile.paymentDetails).map((field) => {
          if (field === "accountType") {
            return (
              <FormControl
                key={field}
                sx={{ flex: "1 1 calc(16.66% - 16px)", minWidth: "150px" }}
                error={!!errors.paymentDetails?.accountType}
              >
                <InputLabel>Account Type</InputLabel>
                <Select
                  label="Account Type"
                  name="paymentDetails.accountType"
                  value={profile.paymentDetails.accountType}
                  onChange={handleChange}
                >
                  <MenuItem value="Saving">Saving</MenuItem>
                  <MenuItem value="Current">Current</MenuItem>
                  <MenuItem value="Salary">Salary</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
                {errors.paymentDetails?.accountType && (
                  <FormHelperText>
                    {errors.paymentDetails.accountType}
                  </FormHelperText>
                )}
              </FormControl>
            );
          } else {
            return (
              <CustomTextField
                key={field}
                label={field.replace(/([A-Z])/g, " $1").toUpperCase()}
                name={`paymentDetails.${field}`}
                value={profile.paymentDetails[field]}
                onChange={handleChange}
                error={!!errors.paymentDetails?.[field]}
                helperText={errors.paymentDetails?.[field]}
                sx={{ flex: "1 1 calc(16.66% - 16px)", minWidth: "150px" }}
                type={field === "accountNumber" ? "number" : "text"}
              />
            );
          }
        })}
        <Typography sx={{ width: "100%" }}>Business Details</Typography>
        {Object.keys(profile.businessDetails).map((field) => (
          <CustomTextField
            key={field}
            label={field.replace(/([A-Z])/g, " $1").toUpperCase()}
            name={`businessDetails.${field}`}
            value={profile.businessDetails[field]}
            onChange={handleChange}
            error={!!errors.businessDetails?.[field]}
            helperText={errors.businessDetails?.[field]}
            sx={{ flex: "1 1 calc(16.66% - 16px)", minWidth: "250px" }}
          />
        ))}
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
    </>
  );
};

export default ProfileContent;
