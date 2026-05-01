import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { blue, green, orange } from '@mui/material/colors';
import { PageTitle } from '../widgets/PageTitle/PageTitle';
import { Summary } from '@features/overview/components/Summary/Summary';
import ChecksListIcon from "@mui/icons-material/Checklist";
import PeopleIcon from "@mui/icons-material/People";
import WarningIcon  from "@mui/icons-material/Warning";
import OverviewSignUpsChart from '@features/overview/components/OverviewSignUpsChart/OverviewSignUpsChart';
import { useCustomers } from '@shared/hooks/useCustomers';
import { useTasks } from '@features/tasks/hooks/useTasks';
import { useOrders } from '@features/orders/hooks/useOrders';
import TasksPreview from '@features/overview/components/TasksPreview/TasksPreview';

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
    refundedTrend
  } = useOrders();

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
            icon={PeopleIcon} 
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
            icon={ChecksListIcon} 
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
            icon={WarningIcon} 
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
        <Grid size={{xs: 12, lg: 6, xl: 4}}>
          <TasksPreview 
            tasks={upcomingTasks}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default OverviewPage;
