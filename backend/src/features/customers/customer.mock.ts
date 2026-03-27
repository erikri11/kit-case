import { customerIds } from "./customer.mock.ids";
import { Customer } from "./customer.model";

export const mockCustomers: Customer[] = [
  {
    id: customerIds.fran,
    customerNumber: "CUST-0001",
    name: "Fran Perez",
    avatar: "/avatar/avatar-5.png",
    email: "fran.perez@domain.com",
    phone: "(815) 704-0045",
    company: "",
    quota: 50,
    status: "Active",
    createdAt: new Date("2026-03-24T19:26:34.456Z")
  },
  {
    id: customerIds.penjani,
    customerNumber: "CUST-0002",
    name: "Penjani Inyene",
    avatar: "/avatar/avatar-4.png",
    email: "penjani.inyene@domain.com",
    phone: "(803) 937-8925",
    company: "",
    quota: 100,
    status: "Active",
    createdAt: new Date("2026-03-25T20:31:32.456Z")
  },
  {
    id: customerIds.carson,
    customerNumber: "CUST-0003",
    name: "Carson Darrin",
    avatar: "/avatar/avatar-3.png",
    email: "carson.darrin@domain.com",
    phone: "(715) 278-5041",
    company: "",
    quota: 50,
    status: "Blocked",
    createdAt: new Date("2026-03-26T21:32:33.456Z")
  },
  {
    id: customerIds.siegbert,
    customerNumber: "CUST-0004",
    name: "Siegbert Gottfried",
    avatar: "/avatar/avatar-2.png",
    email: "siegbert.gottfried@domain.com",
    phone: "(603) 766-0431",
    company: "",
    quota: 0,
    status: "Pending",
    createdAt: new Date("2026-03-27T22:33:34.456Z")
  },
  {
    id: customerIds.miron,
    customerNumber: "CUST-0005",
    name: "Miron Vitold",
    avatar: "/avatar/avatar-1.png",
    email: "miron.vitold@domain.com",
    phone: "(425) 434-5535",
    company: "",
    quota: 50,
    status: "Active",
    createdAt: new Date("2026-03-28T23:34:35.456Z")
  }
];
