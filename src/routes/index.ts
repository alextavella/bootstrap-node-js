import { Router } from 'express';
import appointmentsRouter from './appointaments.routes';

const routes = Router();
routes.use('/appointments', appointmentsRouter);

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello GoStack' });
});

routes.post('/users', (req, res) => {
  const { name, email } = req.body;

  const user = {
    name,
    email,
  };

  return res.json(user);
});

export default routes;
