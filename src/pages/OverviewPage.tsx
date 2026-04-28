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

export function OverviewPage() {
  const { t } = useTranslation("overview");
  const customers = useCustomers();
  const { activeTasks } = useTasks();
  const { refundedOrders } = useOrders();

  return (
    <>
      <PageTitle 
        title={t("overview:pageTitle.title")} 
        subtitle={t("overview:pageTitle.subtitle")} 
      />

      <Grid container spacing={4}>
        <Grid size={{xs: 12, md: 4}}>
          <Summary 
            amount={activeTasks}
            diff={15} 
            icon={ChecksListIcon} 
            title={t("overview:labels.openTasks")}
            trend="up" 
            sx={{ bgcolor: blue[500] }}
          />
        </Grid>

        <Grid size={{xs: 12, md: 4}}>
          <Summary 
            amount={customers.length} 
            diff={5} 
            icon={PeopleIcon} 
            title={t("overview:labels.signUps")}
            trend="down" 
            sx={{ bgcolor: green[500] }}
          />
        </Grid>

        <Grid size={{xs: 12, md: 4}}>
          <Summary 
            amount={refundedOrders} 
            diff={12} 
            icon={WarningIcon} 
            title={t("overview:labels.refundedOrders")} 
            trend="up" 
            sx={{ bgcolor: orange[500] }}
          />
        </Grid>
      </Grid>   

      <OverviewSignUpsChart 
        customers={customers} 
      />
    </>
  );
}

export default OverviewPage;
