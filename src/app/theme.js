import createTheme from "@mui/material/styles/createTheme";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(46, 161, 226)",
      contrastText: "white",
    },
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
    },
  },
});

export default theme;
