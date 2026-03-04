import { Customer } from "./customer.model";
import { v4 as uuidv4 } from 'uuid';

export const mockCustomers: Customer[] = [
  {
		id: uuidv4(),
		name: "Fran Perez",
		avatar: "/avatar/avatar-5.png",
		email: "fran.perez@domain.com",
		phone: "(815) 704-0045",
		quota: 50,
		status: "Active",
		createdAt: new Date()
	},
	{
		id: uuidv4(),
		name: "Penjani Inyene",
		avatar: "/avatar/avatar-4.png",
		email: "penjani.inyene@domain.com",
		phone: "(803) 937-8925",
		quota: 100,
		status: "Active",
		createdAt: new Date()
	},
	{
		id: uuidv4(),
		name: "Carson Darrin",
		avatar: "/avatar/avatar-3.png",
		email: "carson.darrin@domain.com",
		phone: "(715) 278-5041",
		quota: 50,
		status: "Blocked",
		createdAt: new Date()
	},
	{
		id: uuidv4(),
		name: "Siegbert Gottfried",
		avatar: "/avatar/avatar-2.png",
		email: "siegbert.gottfried@domain.com",
		phone: "(603) 766-0431",
		quota: 0,
		status: "Pending",
		createdAt: new Date()
	},
	{
		id: uuidv4(),
		name: "Miron Vitold",
		avatar: "/avatar/avatar-1.png",
		email: "miron.vitold@domain.com",
		phone: "(425) 434-5535",
		quota: 50,
		status: "Active",
		createdAt: new Date()
	}
];
