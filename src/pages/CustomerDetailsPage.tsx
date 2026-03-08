import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { CustomersApi } from '@features/customers/api/customersApi';
import { CustomerBasicDetailsCard } from '@features/customers/components/CustomerDetails/CustomerBasicDetailsCard/CustomerBasicDetailsCard';
import { CustomerDetailsHeader } from '@features/customers/components/CustomerDetails/CustomerDetailsHeader/CustomerDetailsHeader';
import { CustomerPaymentsCard } from '@features/customers/components/CustomerDetails/CustomerPaymentsCard/CustomerPaymentsCard';
import { CustomerSecurityCard } from '@features/customers/components/CustomerDetails/CustomerSecurityCard/CustomerSecurityCard';
import { CustomerDetailsSkeleton } from '@features/customers/components/CustomerDetails/CustomerDetailsSkeleton';
import { CustomerNotFound } from '@features/customers/components/CustomerDetails/CustomerNotFound';
import type { CustomerDetails } from '@features/customers/models/customer.details.model';

export function CustomerDetailsPage() {
  const { customerId } = useParams<{ customerId: string }>();

  const [customer, setCustomer] = useState<CustomerDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!customerId) {
      setIsLoading(false);
      return;
    }

    const loadCustomerDetails = async () => {
      try {
        setIsLoading(true);
        // TODO:: Simulate loading delay, remove after testing
        await new Promise((resolve) => setTimeout(resolve, 2000)); 
        const data = await CustomersApi.getById(customerId);
        setCustomer(data);
      } catch (e) {
        console.error('Failed to load customer', e);
        setCustomer(null);
      } finally {
        setIsLoading(false);
      }
    };
    loadCustomerDetails();
  }, [customerId]);

  // TODO:: Remove after testing
  console.log('Loaded customer:', customer);

  if (isLoading) {
    return <CustomerDetailsSkeleton />;
  }

  if (!customer) {
    return <CustomerNotFound />;
  }

  return (
    <>
      <CustomerDetailsHeader 
        customer={customer} 
      />

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 5 }}>
          <CustomerBasicDetailsCard 
            customer={customer} 
          />
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <CustomerPaymentsCard 
            customer={customer} 
          />
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <CustomerSecurityCard 
            customerId={customer.id} 
          />
        </Grid>
      </Grid>
    </>
  );
}

export default CustomerDetailsPage;
