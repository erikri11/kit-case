import type { BaseEntity } from "@shared/types/baseEntity";

export interface Customer extends BaseEntity {
	name: string;
  email: string;
	avatar?: string;
	phone?: string;
	quota: number;
	status: CustomerStatus;
}

export type CustomerStatus = "Active" | "Pending" | "Blocked";

// Utgår??
export type CustomerFieldName = "name" | "email" | "phone";

export type CustomerCreate = Pick<Customer, "name" | "email" | "phone" | "avatar">;
export type CustomerUpdate = Pick<Customer, "name" | "email" | "phone" | "avatar" | "quota" | "status">;
