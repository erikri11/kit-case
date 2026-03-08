import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { Avatar, Box, Chip, Link, Stack, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { resolveAvatarSrc } from '@features/customers/utils/resolveAvatarSrc';
import { statusColorMap } from '@features/customers/models/statusColorMap';
import type { Customer } from "@features/customers/models/customer.model";

interface CustomerDetailsHeaderProps {
  customer: Customer;
}

export function CustomerDetailsHeader({ 
  customer 
}: CustomerDetailsHeaderProps) {

  const navigate = useNavigate();
  const { t } = useTranslation('customers');

  const avatarSrc = resolveAvatarSrc(customer.avatar);
  const statusColor = statusColorMap[customer.status];

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Link
          color="text.primary"
          variant="subtitle2"
          underline='hover'
          onClick={() => navigate("/admin/customers/list")}
          sx={{ 
            alignItems: "center", 
            display: "inline-flex", 
            cursor: "pointer",
            gap: 1
          }}
        >
        <ArrowBackIcon />
        {t('Customers')}
        </Link>
      </Box>

      <Stack 
        direction="row" 
        spacing={2} 
        sx={{ alignItems: "center", mb: 4 }}
      >
        <Avatar 
          src={avatarSrc}
          alt={customer.name} 
          sx={{ width: 64, height: 64 }}
        >
          {customer.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
        </Avatar>
    
        <Stack>
          <Stack 
            direction="row" 
            spacing={2} 
            sx={{ 
              alignItems: "center", 
              flexWrap: "wrap" 
            }}
          >
            <Typography variant="h4">{customer.name}</Typography>
            <Chip
              icon={<CheckCircleIcon />}
              label={customer.status}
              size="small"
              variant="outlined"
              color={statusColor}
            />
          </Stack>
          <Typography color="text.secondary" variant="body1">
            {customer.email}
          </Typography>
        </Stack>
      </Stack>
    </>
  );
}
  