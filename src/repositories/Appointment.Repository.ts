import { isEqual } from 'date-fns';

import { Appointment } from '../models/Appointment.model';

interface CreateAppoitmentDto {
   provider: string;
   date: Date;
}

export class AppointmentRepository {
   private appointments: Appointment[];

   constructor() {
      this.appointments = [];
   }

   public findAll(): Appointment[] {
      return this.appointments;
   }

   public findByDate(date: Date): Appointment | null {
      const findAppointment = this.appointments.find(appointment =>
         isEqual(date, appointment.date),
      );

      return findAppointment || null;
   }

   public create({ date, provider }: CreateAppoitmentDto): Appointment {
      const appointment = new Appointment({ provider, date });

      this.appointments.push(appointment);

      return appointment;
   }
}
