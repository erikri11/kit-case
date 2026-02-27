import app from '../app';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { Customer } from '../models/customer';
import { validateCreate, validateUpdate } from '../validators/customersValidate';

let customers: Customer[] = [
  {
		id: uuidv4(),
		name: "Fran Perez",
		avatar: "/avatar/avatar-5.png",
		email: "fran.perez@domain.com",
		phone: "(815) 704-0045",
		quota: 50,
		status: "Active",
		createdAt: dayjs().add(1, "hour").toDate()
	},
	{
		id: uuidv4(),
		name: "Penjani Inyene",
		avatar: "/avatar/avatar-4.png",
		email: "penjani.inyene@domain.com",
		phone: "(803) 937-8925",
		quota: 100,
		status: "Active",
		createdAt: dayjs().add(1, "hour").toDate()
	},
	{
		id: uuidv4(),
		name: "Carson Darrin",
		avatar: "/avatar/avatar-3.png",
		email: "carson.darrin@domain.com",
		phone: "(715) 278-5041",
		quota: 10,
		status: "Blocked",
		createdAt: dayjs().add(1, "hour").toDate()
	},
	{
		id: uuidv4(),
		name: "Siegbert Gottfried",
		avatar: "/avatar/avatar-2.png",
		email: "siegbert.gottfried@domain.com",
		phone: "(603) 766-0431",
		quota: 0,
		status: "Pending",
		createdAt: dayjs().add(1, "hour").toDate()
	},
	{
		id: uuidv4(),
		name: "Miron Vitold",
		avatar: "/avatar/avatar-1.png",
		email: "miron.vitold@domain.com",
		phone: "(425) 434-5535",
		quota: 50,
		status: "Active",
		createdAt: dayjs().add(1, "hour").toDate()
	}
];

app.get('/customers', (req, res) => {
  res.json(customers);
});

app.get('/customers/:id', (req, res) => {
  const t = customers.find(x => x.id === req.params.id);
  if (!t) return res.status(404).json({ error: 'Not found' });
  res.json(t);
});

app.post('/customers', (req, res) => {
  const err = validateCreate(req.body);
  if (err) return res.status(400).json({ error: err });

  const { name, avatar, email, phone, quota, status, createdAt } = req.body;
  const customer: Customer = { id: uuidv4(), name: name.trim(), avatar, email, phone, quota, status, createdAt: createdAt ? new Date(createdAt) : new Date() };
  customers.unshift(customer);
  res.status(201).json(customer);
});

app.put('/customers/:id', (req, res) => {
  const idx = customers.findIndex(x => x.id === req.params.id);
  if (idx < 0) return res.status(404).json({ error: 'Not found' });

  const err = validateUpdate(req.body, false);
  if (err) return res.status(400).json({ error: err });

  const { name, avatar, email, phone, quota, status, createdAt } = req.body;
  customers[idx] = { ...customers[idx], name: name.trim(), avatar, email, phone, quota, status, createdAt: createdAt ? new Date(createdAt) : new Date() };
  res.json(customers[idx]);
});

app.delete('/customers/:id', (req, res) => {
  const before = customers.length;
  customers = customers.filter(x => x.id !== req.params.id);
  if (customers.length === before) return res.status(404).json({ error: 'Not found' });
  res.status(204).send();
});
