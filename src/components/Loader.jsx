import { ThemeProvider } from "@emotion/react";
import { CircularProgress } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import React from "react";

const Loader = () => {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#21b6b7",
      },
      mode: "dark",
    },
  });

  return (
    <div className="loader">
      <ThemeProvider theme={darkTheme}>
        <CircularProgress color="primary" />
      </ThemeProvider>
    </div>
  );
};

export default Loader;
