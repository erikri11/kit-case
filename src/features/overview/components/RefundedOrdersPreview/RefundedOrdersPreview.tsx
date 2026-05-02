import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Divider, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import UndoIcon from '@mui/icons-material/Undo';
import dayjs from "dayjs";
import { orange } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";
import type { Order } from "@features/orders/models/model/order.model";
import { getPreviewHeight } from "@shared/utils/getPreviewHeight";
import { useTranslation } from "react-i18next";
import { formatPrice } from "@shared/utils/formatPrice";
import useCurrency from "@shared/context/currency/useCurrency";
import type { Currency } from "@features/products/models/product.constants";

interface RefundedOrdersPreviewProps {
  orders: Order[];
}

export function RefundedOrdersPreview({ 
  orders
}: RefundedOrdersPreviewProps) {

  const navigate = useNavigate();
  const { t, i18n } = useTranslation("overview");
  const { currency: displayCurrency } = useCurrency();

  const language = i18n.language;
  const ROW_COUNT = 3;

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Avatar 
          sx={{
              bgcolor: orange[300],
              border: "2px solid",
              borderColor: orange[500]
            }}
          >
            <UndoIcon />
          </Avatar>
        }
        title={t("common:labels.latestRefundedOrders")}
        subheader={new Date().toLocaleDateString()}
      />
      <CardContent sx={{ 
        py: "8px", 
        height: getPreviewHeight(ROW_COUNT)}}
      >
        {orders.length === 0 ? (
          <Stack
            sx={{
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <UndoIcon color="disabled" />
            <Typography variant="body2" color="text.secondary">
              {t("common:labels.noRefundedOrdersYet")}
            </Typography>
          </Stack>
        ) : (
          <List disablePadding>
            {orders.map((order) => (
              <OrderPreviewItem 
                order={order} 
                key={order.id} 
                language={language}
                displayCurrency={displayCurrency}
              />
            ))}
          </List>
        )}
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button 
          color="primary" 
          size="small"
          endIcon={<ArrowForwardIcon />} 
          onClick={() => navigate("/admin/orders")}
        >
          {t("common:labels.viewAllOrders")}
        </Button>
      </CardActions>
    </Card>
  );
}

interface OrderPreviewItemProps {
  order: Order;
  language: string;
  displayCurrency: Currency;
}

function OrderPreviewItem({ 
  order,
  language,
  displayCurrency
}: OrderPreviewItemProps) {

  return (
    <ListItem disableGutters>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: "center",
          height: "100%",
          mr: 2
        }}
      >
        <Stack
          sx={{
          bgcolor: "customGrey.light",
          borderRadius: 1.5,
          flex: "0 0 auto",
          px: 1,
          py: 0.25,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: 40,
          width: 40
        }}
        >
          <Typography variant="caption" sx={{ lineHeight: 1 }}>
            {dayjs(order.issueDate).format("MMM").toUpperCase()}
          </Typography>

          <Typography variant="h6" sx={{ lineHeight: 1, fontWeight: "bold" }}>
            {dayjs(order.issueDate).format("D")}
          </Typography>
        </Stack>
      </Stack>
      <ListItemText
        disableTypography
        primary={
          <Typography variant="body2" noWrap>
            {order.orderNumber}
          </Typography>
        }
        secondary={
          <Typography 
            color="text.secondary" 
            variant="body2" 
            noWrap
          >
            {formatPrice(
              order.totalAmount,
              order.currency ?? "USD",
              displayCurrency,
              language
            )}
          </Typography>
        }
      />
    </ListItem>
  );
}

export default RefundedOrdersPreview;
