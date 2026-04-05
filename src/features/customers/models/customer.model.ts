import type { BaseEntity } from "@shared/types/baseEntity";
import type { CustomerStatus } from "./customer.constants";

export interface Customer extends BaseEntity {
	customerNumber: string;
	name: string;
  email: string;
	avatar?: string;
	phone?: string;
	company?: string;
	quota: number;
	status: CustomerStatus;
}

export type CustomerCreate = Pick<Customer, "name" | "email" | "phone" | "avatar" | "company">;
export type CustomerUpdate = Pick<Customer, "name" | "email" | "phone" | "avatar" | "company" | "quota" | "status">;

export type CustomerFieldName = "name" | "email" | "phone";
