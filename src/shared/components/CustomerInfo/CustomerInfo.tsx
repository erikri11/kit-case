import { Avatar, Stack, Typography } from "@mui/material";

interface CustomerInfoProps {
  name: string;
  email: string;
  avatar?: string;
};

export function CustomerInfo({ 
  name, 
  email, 
  avatar
 }: CustomerInfoProps) {

  return (
    <Stack 
      direction="row" 
      spacing={2} 
      sx={{ 
        alignItems: "center", 
        height: "100%" 
        }}
      >
      <Avatar src={avatar}>
        {!avatar && name?.charAt(0).toUpperCase()}
      </Avatar>

      <Stack>
        <Typography variant="body2">{name}</Typography>

        <Typography color="text.secondary" variant="body2">
          {email}
        </Typography>
      </Stack>
    </Stack>
  );
}
