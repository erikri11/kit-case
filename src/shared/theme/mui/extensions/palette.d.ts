import '@mui/material/styles';
import '@mui/material/Button';

// 1. Extend theme palette
declare module "@mui/material/styles" {
  interface Palette {
    customGrey: Palette["primary"];
    customTextGrey: Palette["primary"];
  }

  interface PaletteOptions {
    customGrey?: PaletteOptions["primary"];
    customTextGrey?: PaletteOptions["primary"];
  }
}

// 2. Allow color on Button
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    customGrey: true;
  }
}
