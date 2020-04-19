import { Router } from 'express';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (req, res) => {
   try {
      const { email, password } = req.body;
      return res.json({ ok: true });
   } catch (error) {
      return res.status(401).json({ message: error.message });
   }
});

export default sessionsRoutes;
