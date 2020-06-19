import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

export interface IAppointmentRepository {
  all(): Appointment[];
  create({ provider, date }: CreateAppointmentDTO): Appointment;
  findByDate(date: Date): Appointment | null;
}

class AppointmentsRepository implements IAppointmentRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }

  public findByDate(date: Date): Appointment | null {
    return this.appointments.find(a => isEqual(a.date, date)) || null;
  }
}

export default AppointmentsRepository;
