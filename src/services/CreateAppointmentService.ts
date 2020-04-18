/* eslint-disable no-useless-constructor */
import { startOfHour } from 'date-fns';

import { Appointment } from '../models/Appointment.model';
import { AppointmentRepository } from '../repositories/Appointment.Repository';

interface RequestDTO {
   provider: string;
   date: Date;
}

export class CreateAppoitmentSerivece {
   private appointmentRepo: AppointmentRepository;

   constructor(appointmentRepo: AppointmentRepository) {
      this.appointmentRepo = appointmentRepo;
   }

   public execute({ date, provider }: RequestDTO): Appointment {
      const appointmentDate = startOfHour(date);
      const findAppointmentInSameDate = this.appointmentRepo.findByDate(
         appointmentDate,
      );

      if (findAppointmentInSameDate) {
         throw Error('this appoitment is alerady blooked');
      }

      const appointment = this.appointmentRepo.create({
         date: appointmentDate,
         provider,
      });

      return appointment;
   }
}
