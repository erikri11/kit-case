import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { Avatar, Box, Chip, Link, Stack, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { resolveAvatarSrc } from '@features/customers/utils/resolveAvatarSrc';
import type { Customer } from "@features/customers/models/customer.model";
import { CUSTOMER_STATUS_CONFIG } from '@features/customers/models/customerStatusConfig.ts';

interface CustomerDetailsHeaderProps {
  customer: Customer;
}

export function CustomerDetailsHeader({ customer }: CustomerDetailsHeaderProps) {
  const navigate = useNavigate();
  const { t } = useTranslation("menu");

  const avatarSrc = resolveAvatarSrc(customer.avatar);

  const config = CUSTOMER_STATUS_CONFIG[customer.status];
  const Icon = config.icon;

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Link
          component="button"
          type="button"
          color="text.primary"
          variant="subtitle2"
          underline="hover"
          onClick={() => navigate("/admin/customers/list")}
          sx={{ 
            alignItems: "center", 
            display: "inline-flex", 
            cursor: "pointer",
            gap: 1
          }}
        >
        <ArrowBackIcon />
        {t("menu:customers")}
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
          {customer.name
            .trim()
            .split(/\s+/)
            .map((n) => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase()
          }
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
            <Typography variant="h4">
              {customer.name}
            </Typography>
            <Chip
              icon={<Icon />}
              label={t(config.labelKey)}
              size="small"
              variant="outlined"
              color={config.color}
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
  