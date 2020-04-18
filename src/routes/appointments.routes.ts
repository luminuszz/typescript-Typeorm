import { parseISO } from 'date-fns';
import { Router } from 'express';

import { AppointmentRepository } from '../repositories/Appointment.Repository';
import { CreateAppoitmentSerivece } from '../services/CreateAppointmentService';

const appointmentsRoutes = Router();

const appointmentRepo = new AppointmentRepository();

appointmentsRoutes.get('/', (req, res) => {
   const appointments = appointmentRepo.findAll();

   return res.json(appointments);
});

appointmentsRoutes.post('/', (request, response) => {
   try {
      const createAppoitmentSerivece = new CreateAppoitmentSerivece(
         appointmentRepo,
      );
      const { provider, date } = request.body;

      const parserdDate = parseISO(date);
      const appointment = createAppoitmentSerivece.execute({
         provider,
         date: parserdDate,
      });

      return response.json(appointment);
   } catch (error) {
      return response.json(error);
   }
});

export default appointmentsRoutes;
