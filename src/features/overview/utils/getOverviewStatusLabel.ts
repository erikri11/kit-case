import { type TFunction } from 'i18next';
import { type Status } from '@features/customers/models/status';

export const getOverviewStatusLabel = (t: TFunction, s: Status) =>
  t(`overview:status.${s.toLowerCase()}`);
