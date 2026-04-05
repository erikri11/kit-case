import { type TFunction } from 'i18next';
import { type CustomerStatus } from '@features/customers/models/customer.constants';

export const getOverviewStatusLabel = (t: TFunction, s: CustomerStatus) =>
  t(`overview:status.${s.toLowerCase()}`);
