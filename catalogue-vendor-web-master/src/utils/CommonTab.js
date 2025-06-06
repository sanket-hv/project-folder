import { Box, Tab } from "@mui/material";
import { styled } from "@mui/system";

export const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
};

export const TabLabel = ({ name }) => (
  <Box
    display="flex"
    alignItems="center"
    gap={"10px"}
    sx={{
      fontSize: "14px",
      fontWeight: 600,
      color: "#FFFFFF",
      padding: "8px 12px",
    }}
    className="tabName"
  >
    {name}
  </Box>
);

export const StyledTab = styled(Tab)(() => ({
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
  padding: "4px 10px",
  transition: "background-color 0.3s ease-in-out, transform 0.3s ease-in-out",
  color: "#FFFFFF",
  "&.Mui-selected": {
    borderRadius: "10px",
    backgroundColor: "rgb(0 99 109)",
    color: "#FFFFFF",
    "& .tabName": {
      color: "#FFFFFF",
      fontSize: "14px",
      fontWeight: 600,
    },
  },
  "&:not(.Mui-selected)": {
    transform: "scale(1)",
    borderRadius: "10px",
  },
}));
