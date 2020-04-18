/* eslint-disable no-useless-constructor */
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import { Appointment } from '../models/Appointment.model';
import { AppointmentRepository } from '../repositories/Appointment.Repository';

interface RequestDTO {
   provider: string;
   date: Date;
}

export class CreateAppoitmentSerivice {
   public async execute({ date, provider }: RequestDTO): Promise<Appointment> {
      const appointmentRepo = getCustomRepository(AppointmentRepository);

      const appointmentDate = startOfHour(date);

      const findAppointmentInSameDate = await appointmentRepo.findByDate(
         appointmentDate,
      );

      if (findAppointmentInSameDate) {
         throw Error('this appoitment is alerady blooked');
      }

      const appointment = appointmentRepo.create({
         provider,
         date: appointmentDate,
      });
      await appointmentRepo.save(appointment);

      return appointment;
   }
}
