import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import { AppError } from '../errors/appError';
import { Appointment } from '../models/Appointment.model';
import { AppointmentRepository } from '../repositories/Appointment.Repository';

interface RequestDTO {
   provider_id: string;
   date: Date;
}

export class CreateAppoitmentSerivice {
   public async execute({
      date,
      provider_id,
   }: RequestDTO): Promise<Appointment> {
      const appointmentRepo = getCustomRepository(AppointmentRepository);

      const appointmentDate = startOfHour(date);

      const findAppointmentInSameDate = await appointmentRepo.findByDate(
         appointmentDate,
      );

      if (findAppointmentInSameDate) {
         throw new AppError('this appoitment is alerady blooked');
      }

      const appointment = appointmentRepo.create({
         provider_id,
         date: appointmentDate,
      });
      await appointmentRepo.save(appointment);

      return appointment;
   }
}
