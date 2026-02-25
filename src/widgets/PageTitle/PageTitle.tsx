import { Box, Typography } from '@mui/material';

interface PageTitleProps {
  title: string;
  subtitle?: string;
}

export function PageTitle(props: PageTitleProps) {
  return (
    <Box display="flex" alignItems="baseline" gap={1} mb={4}>
      <Typography variant="h2">{props.title}</Typography>
      {props.subtitle && (
        <Typography variant="subtitle2" color="text.secondary">
          {props.subtitle}
        </Typography>
      )}
    </Box>
  );
}

export default PageTitle;
