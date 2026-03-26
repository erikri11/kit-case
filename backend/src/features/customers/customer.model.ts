import { BaseEntity } from "../../shared/types/BaseEntity";

export interface Customer extends BaseEntity {
	customerNumber: string;
	name: string;
  email: string;
	avatar?: string;
	phone?: string;
	quota: number;
	status: CustomerStatus;
}

export type CustomerStatus = "Active" | "Pending" | "Blocked";

export type CustomerCreate = Pick<Customer, "name" | "email" | "phone" | "avatar">;
export type CustomerUpdate = Pick<Customer, "name" | "email" | "phone" | "avatar" | "quota" | "status">;
