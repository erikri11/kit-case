import { customerIds } from "./customer.mock.ids";
import { Customer } from "./customer.model";

export const mockCustomers: Customer[] = [
  // (April 2026)
  {
    id: customerIds.fran,
    customerNumber: "CUST-0001",
    name: "Fran Perez",
    avatar: "/avatars/avatar-5.png",
    email: "fran.perez@domain.com",
    phone: "(815) 704-0045",
    company: "",
    quota: 50,
    status: "Active",
    createdAt: new Date("2026-04-24T12:00:00")
  },
  {
    id: customerIds.penjani,
    customerNumber: "CUST-0002",
    name: "Penjani Inyene",
    avatar: "/avatars/avatar-4.png",
    email: "penjani.inyene@domain.com",
    phone: "(803) 937-8925",
    company: "",
    quota: 100,
    status: "Active",
    createdAt: new Date("2026-04-25T12:00:00")
  },
  {
    id: customerIds.carson,
    customerNumber: "CUST-0003",
    name: "Carson Darrin",
    avatar: "/avatars/avatar-3.png",
    email: "carson.darrin@domain.com",
    phone: "(715) 278-5041",
    company: "",
    quota: 50,
    status: "Active",
    createdAt: new Date("2026-04-26T12:00:00")
  },
  
  // (March 2026)
  {
    id: customerIds.siegbert,
    customerNumber: "CUST-0004",
    name: "Siegbert Gottfried",
    avatar: "/avatars/avatar-2.png",
    email: "siegbert.gottfried@domain.com",
    phone: "(603) 766-0431",
    company: "",
    quota: 0,
    status: "Active",
    createdAt: new Date("2026-03-02T12:00:00")
  },
  {
    id: customerIds.miron,
    customerNumber: "CUST-0005",
    name: "Miron Vitold",
    avatar: "/avatars/avatar-1.png",
    email: "miron.vitold@domain.com",
    phone: "(425) 434-5535",
    company: "",
    quota: 50,
    status: "Active",
    createdAt: new Date("2026-03-11T12:00:00")
  }
];
