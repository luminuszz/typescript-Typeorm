import { Router } from 'express';

import { AuthUserService } from '../services/AuthUserService';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (req, res) => {
   const { email, password } = req.body;
   const authUser = new AuthUserService();

   const { user, token } = await authUser.execute({ password, email });

   delete user.password_hash;

   return res.json({ user, token });
});

export default sessionsRoutes;
