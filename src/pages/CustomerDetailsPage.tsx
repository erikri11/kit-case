import { Grid } from '@mui/material';
import { CustomerBasicDetailsCard } from '@features/customers/components/CustomerDetails/CustomerBasicDetailsCard/CustomerBasicDetailsCard';
import { CustomerDetailsHeader } from '@features/customers/components/CustomerDetails/CustomerDetailsHeader/CustomerDetailsHeader';
import { CustomerPaymentsCard } from '@features/customers/components/CustomerDetails/CustomerPaymentsCard/CustomerPaymentsCard';
import { CustomerSecurityCard } from '@features/customers/components/CustomerDetails/CustomerSecurityCard/CustomerSecurityCard';
import { CustomerDetailsSkeleton } from '@features/customers/components/CustomerDetails/CustomerDetailsSkeleton';
import { CustomerNotFound } from '@features/customers/components/CustomerDetails/CustomerNotFound';
import { useCustomerDetails } from '@features/customers/components/CustomerDetails/useCustomerDetails';

export function CustomerDetailsPage() {
  const { customer, isLoading } = useCustomerDetails();

  if (isLoading) return <CustomerDetailsSkeleton />;
  if (!customer) return <CustomerNotFound />;

  return (
    <>
      <CustomerDetailsHeader 
        customer={customer} 
      />

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <CustomerBasicDetailsCard 
            customer={customer} 
          />
        </Grid>

        <Grid size={{ xs: 12, lg: 8 }}>
          <CustomerPaymentsCard 
            customer={customer} 
          />
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <CustomerSecurityCard 
            customerId={customer.id} 
          />
        </Grid>
      </Grid>
    </>
  );
}

export default CustomerDetailsPage;