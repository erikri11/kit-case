import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { blue, green, orange } from '@mui/material/colors';
import { PageTitle } from '../widgets/PageTitle/PageTitle';
import { Summary } from '@features/overview/components/Summary/Summary';
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import StoreOutlinedIcon  from "@mui/icons-material/StoreOutlined";
import OverviewSignUpsChart from '@features/overview/components/OverviewSignUpsChart/OverviewSignUpsChart';
import { useCustomers } from '@shared/hooks/useCustomers';
import { useTasks } from '@features/tasks/hooks/useTasks';
import { useOrders } from '@features/orders/hooks/useOrders';
import TasksPreview from '@features/overview/components/TasksPreview/TasksPreview';
import { RefundedOrdersPreview } from '@features/overview/components/RefundedOrdersPreview/RefundedOrdersPreview';
import ProductsPreview from '@features/overview/components/ProductsPreview/ProductsPreview';
import { useProducts } from '@features/products/hooks/useProducts';

export function OverviewPage() {
  const { t } = useTranslation("overview");

  const { 
    customers, 
    customersThisMonth, 
    customerDiff, 
    customerTrend 
  } = useCustomers();

  const { 
    activeTasks, 
    activeTasksThisMonth,
    activeTasksDiff, 
    activeTasksTrend,
    upcomingTasks
  } = useTasks();

  const { 
    refundedOrders,
    refundedThisMonth,
    refundedDiff,
    refundedTrend,
    latestRefundedOrders
  } = useOrders();

  const {
    latestActiveProducts
  } = useProducts();

  return (
    <>
      <PageTitle 
        title={t("overview:pageTitle.title")} 
        subtitle={t("overview:pageTitle.subtitle")} 
      />

      <Grid container spacing={4}>
        <Grid size={{xs: 12, md: 6, lg: 4}}>
          <Summary 
            amount={customersThisMonth} 
            totalAmount={customers.length}
            diff={customerDiff} 
            icon={PeopleOutlinedIcon} 
            title={t("overview:labels.signUps")}
            trend={customerTrend} 
            sx={{ bgcolor: green[500] }}
          />
        </Grid>

        <Grid size={{xs: 12, md: 6, lg: 4}}>
          <Summary 
            amount={activeTasksThisMonth}
            totalAmount={activeTasks}
            diff={activeTasksDiff} 
            icon={BallotOutlinedIcon} 
            title={t("overview:labels.openTasks")}
            trend={activeTasksTrend} 
            sx={{ bgcolor: blue[500] }}
          />
        </Grid>

        <Grid size={{xs: 12, md: 6, lg: 4}}>
          <Summary 
            totalAmount={refundedOrders}
            amount={refundedThisMonth} 
            diff={refundedDiff} 
            icon={StoreOutlinedIcon} 
            title={t("overview:labels.refundedOrders")} 
            trend={refundedTrend} 
            sx={{ bgcolor: orange[500] }}
          />
        </Grid>
      </Grid>   

      <OverviewSignUpsChart 
        customers={customers} 
      />
      
      <Grid container spacing={4}>
        <Grid size={{xs: 12, md: 6, lg: 4}}>
          <TasksPreview 
            tasks={upcomingTasks}
          />
        </Grid>

        <Grid size={{xs: 12, md: 6, lg: 4}}>
          <RefundedOrdersPreview 
            orders={latestRefundedOrders}
          />
        </Grid>

        <Grid size={{xs: 12, md: 6, lg: 4}}>
          <ProductsPreview 
            products={latestActiveProducts}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default OverviewPage;
