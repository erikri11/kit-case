export interface Customer {
  id: string;
	name: string;
  email: string;
	avatar?: string;
	avatarUrl?: string;
	phone: string;
	quota: number;
	status: CustomerStatus;
	createdAt: string;
}

export type CustomerStatus = "Active" | "Pending" | "Blocked";
export type CustomerFieldName = "name" | "email" | "phone";

// POST payload: server sets id, quota, status, createdAt
export type CustomerCreate = Omit<Customer, "id" | "quota" | "status" | "createdAt">;

// PUT payload: partial update, and still server-owned fields cannot be changed
export type CustomerUpdate = Partial<Omit<Customer, "id" | "createdAt">>;
