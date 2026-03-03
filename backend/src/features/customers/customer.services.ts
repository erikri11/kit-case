import { v4 as uuidv4 } from 'uuid';
import { validateCreate, validateUpdate } from './customer.validate';
import { Customer } from './customer.model';
import app from '../../app';
import { mockCustomers } from "./customer.mock";

let customers: Customer[] = [...mockCustomers];

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

  const { name, email, phone } = req.body;
  const customer: Customer = { 
    id: uuidv4(), 
    name: name.trim(), 
    avatar: 'NN', 
    email, 
    phone, 
    quota: 0, 
    status: 'Pending', 
    createdAt: new Date() 
  };
  customers.unshift(customer);
  res.status(201).json(customer);
});

app.put('/customers/:id', (req, res) => {
  const idx = customers.findIndex(x => x.id === req.params.id);
  if (idx < 0) return res.status(404).json({ error: 'Not found' });

  const err = validateUpdate(req.body, false);
  if (err) return res.status(400).json({ error: err });

  const { name, email, phone, quota, status } = req.body;
  customers[idx] = { 
    ...customers[idx], 
    name: name.trim(), 
    avatar: 'NN', 
    email, 
    phone, 
    quota, 
    status, 
    createdAt: new Date() 
  };
  res.json(customers[idx]);
});

app.delete('/customers/:id', (req, res) => {
  const before = customers.length;
  customers = customers.filter(x => x.id !== req.params.id);
  if (customers.length === before) return res.status(404).json({ error: 'Not found' });
  res.status(204).send();
});
