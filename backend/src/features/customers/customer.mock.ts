import { customerIds } from "./customer.mock.ids";
import { Customer } from "./customer.model";

export const mockCustomers: Customer[] = [
  {
    id: customerIds.fran,
    name: "Fran Perez",
    avatar: "/avatar/avatar-5.png",
    email: "fran.perez@domain.com",
    phone: "(815) 704-0045",
    quota: 50,
    status: "Active",
    createdAt: new Date()
  },
  {
    id: customerIds.penjani,
    name: "Penjani Inyene",
    avatar: "/avatar/avatar-4.png",
    email: "penjani.inyene@domain.com",
    phone: "(803) 937-8925",
    quota: 100,
    status: "Active",
    createdAt: new Date()
  },
  {
    id: customerIds.carson,
    name: "Carson Darrin",
    avatar: "/avatar/avatar-3.png",
    email: "carson.darrin@domain.com",
    phone: "(715) 278-5041",
    quota: 50,
    status: "Blocked",
    createdAt: new Date()
  },
  {
    id: customerIds.siegbert,
    name: "Siegbert Gottfried",
    avatar: "/avatar/avatar-2.png",
    email: "siegbert.gottfried@domain.com",
    phone: "(603) 766-0431",
    quota: 0,
    status: "Pending",
    createdAt: new Date()
  },
  {
    id: customerIds.miron,
    name: "Miron Vitold",
    avatar: "/avatar/avatar-1.png",
    email: "miron.vitold@domain.com",
    phone: "(425) 434-5535",
    quota: 50,
    status: "Active",
    createdAt: new Date()
  }
];
