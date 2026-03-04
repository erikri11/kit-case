import app from './app';

import './features/customers/customer.services';
import "./features/uploads/upload.services";

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));
