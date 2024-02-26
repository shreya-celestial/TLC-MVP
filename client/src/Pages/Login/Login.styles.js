import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    gap: "20px",
    [theme.breakpoints.down("md")]: {
      padding: "50px 8px",
      justifyContent: "start",
    },
  },
  logo: {
    width: "115px",
    objectFit: "contain",
  },
  header: {
    fontSize: "14px !important",
    fontWeight: "500 !important",

    "& span": {
      color: "#259311",
      fontWeight: "600",
    },
  },
  mainWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  //   form styling
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
  },
  formControl: {
    [theme.breakpoints.down("md")]: { width: "100%" },
    width: "359px",
    display: "flex",
    gap: "5px",
    "& label": {
      fontWeight: "500",
      fontSize: "14px",
      color: "#259311",
    },
    "& .MuiInputBase-formControl": {
      border: "1.5px solid #6C6C6C50",
      borderRadius: "5px",
      height: "40px",
      "& input": {
        fontSize: "14px",
      },
      "& fieldset": {
        display: "none",
      },
      "&.Mui-focused": {
        borderColor: "#259311",
      },
    },
  },

  // formElement and Link inside Box Styling
  FormElementInBox: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: { width: "100%" },
    width: "359px",
    gap: "10px",
    "& .forgotPassword , p": {
      fontSize: "12px",
      color: "#000000",
      fontWeight: "500",
      color: "#4E73BE",
      textDecoration: "none",
    },
    "& .signup": {
      textDecoration: "none",
      color: "#259311",
      fontWeight: "600",
    },
  },
  //  form continue and continue with google button styling
  signupBtn: {
    height: "40px",
    width: "100%",
    borderRadius: "5px",
    textTransform: "capitalize !important",
    backgroundColor: "#259311 !important",
    color: "#ffffff !important",
    fontWeight: "400 !important",
    "&.googleBtn": {
      color: "#000000 !important",
      backgroundColor: "#ffffff !important",
      border: "1.5px solid  #259311 !important",
      "&:hover": {
        [theme.breakpoints.up("md")]: {
          backgroundColor: "#25931110 !important",
        },
      },
    },
    "&.signupBtn:hover": {
      [theme.breakpoints.up("md")]: {
        opacity: ".9",
      },
    },
  },
}));
