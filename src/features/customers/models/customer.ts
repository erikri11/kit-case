export interface Customer {
  id: string;
	name: string;
	avatar?: string;
	avatarUrl?: string;
	email: string;
	phone: string;
	quota: number;
	status: CustomerStatus;
	createdAt: string;
}

export type CustomerStatus = "Active" | "Pending" | "Blocked";

// POST payload: server sets id, avatarUrl, createdAt
export type CustomerCreate = Omit<Customer, "id" | "quota" | "status" | "createdAt">;

// PUT payload: partial update, and still server-owned fields cannot be changed
export type CustomerUpdate = Partial<Omit<Customer, "id" | "createdAt">>;

