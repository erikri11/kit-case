export interface Customer {
  id: string;
	name: string;
  email: string;
	avatar?: string;
	avatarUrl?: string;
	phone?: string;
	quota: number;
	status: CustomerStatus;
	createdAt: Date;
}

export type CustomerStatus = "Active" | "Pending" | "Blocked";
