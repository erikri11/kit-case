import type { Components, Theme } from "@mui/material";

export const MuiButton: Components<Theme> = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "none",
        minWidth: "140px"
      }
    },
    variants: [
      // contained grey
      {
        props: { variant: "contained", color: "customGrey" },
        style: ({ theme }) => ({
          backgroundColor: theme.palette.customGrey.main,
          color: theme.palette.customGrey.contrastText,
          "&:hover": {
            backgroundColor: theme.palette.customGrey.dark
          }
        })
      },
      // outlined grey
      {
        props: { variant: "outlined", color: "customGrey" },
        style: ({ theme }) => ({
          borderColor: theme.palette.customGrey.main,
          color: theme.palette.customGrey.main,
          "&:hover": {
            backgroundColor: theme.palette.customGrey.light
          }
        })
      },
      // text grey
      {
        props: { variant: "text", color: "customGrey" },
        style: ({ theme }) => ({
          color: theme.palette.customGrey.main,
          "&:hover": {
            backgroundColor: theme.palette.customGrey.light
          }
        })  
      }
    ]
  }
};
