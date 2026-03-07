import type { CSSProperties } from "react";

declare module '@mui/material/styles' {
  interface TypographyVariants {
    menu: CSSProperties;
    dialogTitle: CSSProperties;
  }

  interface TypographyVariantsOptions {
    menu?: CSSProperties;
    dialogTitle?: CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    menu: true;
    dialogTitle: true;
  }
}

