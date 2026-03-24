import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { Avatar, Card, CardContent, CardHeader, useTheme } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import type { Customer } from "@features/customers/models/customer.model";
import BarChartIcon from "@mui/icons-material/BarChart";
import green from 'node_modules/@mui/material/esm/colors/green';

interface TaskCompletionChartProps {
  customers: Customer[];
}

export function OverviewSignUpsChart({
  customers
}: TaskCompletionChartProps) {
  
  const theme = useTheme();
  const { t } = useTranslation(['overview', 'customers']);

  const { activeCount, pendingCount, blockedCount } = useMemo(() => {
    const active = customers.filter((c) => c.status === "Active").length;
    const pending = customers.filter((c) => c.status === "Pending").length;
    const blocked = customers.filter((c) => c.status === "Blocked").length;

    return {
      activeCount: active,
      pendingCount: pending,
      blockedCount: blocked
    };
  }, [customers]);

  const labels = [
    t("customers:status.Active"),
    t("customers:status.Pending"),
    t("customers:status.Blocked")
  ];

  return (
    <Card variant='outlined' sx={{ my: 4 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: green[500] }}>
            <BarChartIcon />
          </Avatar>
        }
        title={t("overview:labels.barChartTitle")}
        subheader={new Date().toLocaleDateString()}
      />
      <CardContent>
        <BarChart
          height={260}
          xAxis={[
            {
              scaleType: "band",
              data: labels,
              colorMap: {
                type: "ordinal",
                values: labels,
                colors: [
                  theme.palette.success.main,
                  theme.palette.warning.main,
                  theme.palette.error.main
                ]
              }
            }
          ]}
          series={[
            {
              label: t("overview:signUpsByStatus.label"),
              data: [activeCount, pendingCount, blockedCount],
              color: theme.palette.text.secondary
            }
          ]}
          yAxis={[{ min: 0 }]}
          grid={{ horizontal: true, vertical: true }}
          slotProps={{
            legend: {
              position: { vertical: "bottom", horizontal: "center" }
            }
          }}
        />
      </CardContent>
    </Card>
  );
}

export default OverviewSignUpsChart;
