import { styled } from "@mui/material";
import { SnackbarProvider as NotistackProvider } from "notistack";

// styled component
const Provider = styled(NotistackProvider)(({ theme }) => ({
  "&.SnackbarContent-root.SnackbarItem-contentRoot": {
    boxShadow: theme.shadows[2],
    color: theme.palette.common.black,
    background: theme.palette.common.white,
    fontFamily: theme.typography.fontFamily,
  },
  "&.SnackbarItem-variantSuccess .MuiSvgIcon-root": {
    color: theme.palette.success.main,
  },
  "&.SnackbarItem-variantError .MuiSvgIcon-root": {
    color: theme.palette.error.main,
  },
}));
const SnackbarProvider = ({ children }) => {
  return (
    <Provider
      maxSnack={4}
      autoHideDuration={2000}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      {children}
    </Provider>
  );
};
export default SnackbarProvider;
