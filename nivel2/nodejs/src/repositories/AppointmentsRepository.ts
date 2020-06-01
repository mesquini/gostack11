import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface ICreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const findappointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return findappointment || null;
  }

  public create({ provider, date }: ICreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;