import { parseISO } from 'date-fns';
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import { AppointmentRepository } from '../repositories/Appointment.Repository';
import { CreateAppoitmentSerivice } from '../services/CreateAppointmentService';

const appointmentsRoutes = Router();

appointmentsRoutes.get('/', async (req, res) => {
   const appointmentRepo = getCustomRepository(AppointmentRepository);
   const appointments = await appointmentRepo.find();

   return res.json(appointments);
});

appointmentsRoutes.post('/', async (request, response) => {
   try {
      const { provider, date } = request.body;

      const parserdDate = parseISO(date);

      const createAppoitmentSerivece = new CreateAppoitmentSerivice();

      const appointment = await createAppoitmentSerivece.execute({
         provider,
         date: parserdDate,
      });

      return response.json(appointment);
   } catch (error) {
      return response.status(401).json({ message: error.message });
   }
});

export default appointmentsRoutes;
