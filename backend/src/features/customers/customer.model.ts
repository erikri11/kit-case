export interface Customer {
  id: string;
	name: string;
	avatar?: string;
	email: string;
	phone?: string;
	quota: number;
	status: CustomerStatus;
	createdAt: Date;
}

export type CustomerStatus = "Active" | "Pending" | "Blocked";
