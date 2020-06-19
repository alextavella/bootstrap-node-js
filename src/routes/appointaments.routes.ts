import { parseISO, startOfHour } from 'date-fns';
import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

/**
 * Patterns
 * SoC: Separation of Concerns (Separacao de preocupacao)
 * DTO: Data Transfer Object
 * DRY: Dont repeat yourself
 * SOLID:
 *  SRP (Single Responsability Principle)
    OCP (Open–closed Principle)
    LSP (Liskov substitution Principle)
    ISP (Interface segregation Principle)
    DIP (Dependency Inversion Principle)
 */

appointmentsRouter.get('/', (req, res) => {
  const appoinments = appointmentsRepository.all();

  res.status(HttpStatus.OK).json(appoinments);
});

appointmentsRouter.post('/', (req, res) => {
  try {
    const { provider, date } = req.body;

    const parsedDate = startOfHour(parseISO(date));

    const appointment = new CreateAppointmentService(
      appointmentsRepository,
    ).execute({
      provider,
      date: parsedDate,
    });

    return res.status(HttpStatus.CREATED).json(appointment);
  } catch (e) {
    return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
  }
});

export default appointmentsRouter;
