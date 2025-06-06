import React from "react";
import { Modal, Box, Typography } from "@mui/material";

const CommonModal = ({ open, handleClose, children, title }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      sx={{
        backdropFilter: "blur(5px)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 600 }, 
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {title && (
          <Typography
            variant="h6"
            sx={{
              textAlign: "left",
              fontWeight: "bold",
              color: "#333",
              marginBottom: 1,
            }}
          >
            {title}
          </Typography>
        )}
        {children}
      </Box>
    </Modal>
  );
};

export default CommonModal;
