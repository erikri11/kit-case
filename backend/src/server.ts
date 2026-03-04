import app from './app';

import './features/customers/customer.routes';
import "./features/uploads/upload.routes";

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));
