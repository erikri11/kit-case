import { useEffect, useState } from 'react';
import { customerApi } from '@features/customers/api/customersApi';
import type { Customer } from "@features/customers/models/model/customer.model";
import { connectSocket, socket } from '@shared/socket/socket';
import { EVENTS } from '@shared/models/constants/events.constants';
import { getPercentChange } from '@shared/utils/getPercentChange';
import type { Trend } from '@features/overview/models/trend.type';

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await customerApi.get();
        setCustomers(data);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error("Failed to load customers:", errorMessage);
      } 
    };

    loadCustomers();
    connectSocket();

    const handleCreated = (customer: Customer) => {
      setCustomers((prev) =>
        prev.some((c) => c.id === customer.id) ? prev : [customer, ...prev]
      );
    };

    const handleUpdated = (updatedCustomer: Customer) => {
      setCustomers((prev) =>
        prev.map((customer) =>
          customer.id === updatedCustomer.id ? updatedCustomer : customer
        )
      );
    };

    const handleDeleted = (customerId: string) => {
      setCustomers((prev) => prev.filter((customer) => customer.id !== customerId));
    };

    socket.on(EVENTS.CUSTOMER.CREATED, handleCreated);
    socket.on(EVENTS.CUSTOMER.UPDATED, handleUpdated);
    socket.on(EVENTS.CUSTOMER.DELETED, handleDeleted);

    return () => {
      socket.off(EVENTS.CUSTOMER.CREATED, handleCreated);
      socket.off(EVENTS.CUSTOMER.UPDATED, handleUpdated);
      socket.off(EVENTS.CUSTOMER.DELETED, handleDeleted);
    };
  }, []);

  const now = new Date();

  const startOfThisMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  );

  const startOfLastMonth = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    1
  );

  const customersThisMonth = customers.filter((customer) => {
    const createdAt = new Date(customer.createdAt);
    return createdAt >= startOfThisMonth;
  }).length;

  const customersLastMonth = customers.filter((customer) => {
    const createdAt = new Date(customer.createdAt);
    return createdAt >= startOfLastMonth && createdAt < startOfThisMonth;
  }).length;

  const customerDiff = getPercentChange(
    customersThisMonth, customersLastMonth
  );

  const customerTrend: Trend = 
    customerDiff >= 0 ? "up" : "down";

  return {
    customers,
    customersThisMonth,
    customerDiff,
    customerTrend
  };
}
