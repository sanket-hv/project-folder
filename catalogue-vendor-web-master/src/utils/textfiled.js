import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

export const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#263238",
    },
  },
  "& .MuiInputLabel-root": {
    "&.Mui-focused": {
      color: "#263238",
    },
  },
});
