import { LinearProgress, Box, linearProgressClasses } from "@mui/material";

const CustomLinearProgress = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <LinearProgress
        // color="success"
        sx={{
          width: "30%",
          height: 5,
          borderRadius: 2,
          [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: "transparent",
          },
          [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 2,
            background:
              "linear-gradient(45deg, rgb(7, 123, 158), rgb(1, 87, 97), rgb(2, 129, 146), rgb(5, 109, 98))",
          },
        }}
      />
    </Box>
  );
};

export default CustomLinearProgress;
