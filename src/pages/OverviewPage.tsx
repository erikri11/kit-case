import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { blue, green, orange } from '@mui/material/colors';
import { PageTitle } from '../widgets/PageTitle/PageTitle';
import { Summary } from '@features/dashboard/components/Summary/Summary';
import ChecksListIcon from "@mui/icons-material/Checklist";
import PeopleIcon from "@mui/icons-material/People";
import WarningIcon  from "@mui/icons-material/Warning";
import OverviewSignUpsChart from '@features/dashboard/components/OverviewSignUpsChart/OverviewSignUpsChart';
import { useCustomers } from '@shared/hooks/useCustomers';

export function OverviewPage() {
  const { t } = useTranslation('overview');
  const customers = useCustomers();

  return (
    <>
      <PageTitle 
        title={t('overview:pageTitle.title')} 
        subtitle={t('overview:pageTitle.subtitle')} 
      />

      <Grid container spacing={4}>
        <Grid size={{xs: 12, md: 4}}>
          <Summary 
            amount={31} 
            diff={15} 
            icon={ChecksListIcon} 
            title="Tickets" 
            trend="up" 
            sx={{ bgcolor: blue[500] }}
          />
        </Grid>

        <Grid size={{xs: 12, md: 4}}>
          <Summary 
            amount={customers.length} 
            diff={5} 
            icon={PeopleIcon} 
            title="Sign ups" 
            trend="down" 
            sx={{ bgcolor: green[500] }}
          />
        </Grid>

        <Grid size={{xs: 12, md: 4}}>
          <Summary 
            amount={21} 
            diff={12} 
            icon={WarningIcon} 
            title="Open issues" 
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
