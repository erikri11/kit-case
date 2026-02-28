import type * as React from 'react';
import '@mui/material/styles';
import '@mui/material/Typography';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    menu: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    menu?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    menu: true;
  }
}
