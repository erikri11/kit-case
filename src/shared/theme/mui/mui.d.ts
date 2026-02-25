import '@mui/material/styles';
import '@mui/material/Button';

// 1. Extend theme palette
declare module '@mui/material/styles' {
  interface Palette {
    customGrey: Palette['primary'];
  }

  interface PaletteOptions {
    customGrey?: PaletteOptions['primary'];
  }
}

// 2. Allow color on Button
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    grey: true;
  }
}
