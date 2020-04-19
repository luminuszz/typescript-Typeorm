import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload.config';
import { ensureAuth } from '../middlewares/ensureAuth';
import { CreateUserService } from '../services/CreateUserService';

const usersRoutes = Router();
const upload = multer(uploadConfig);

usersRoutes.post('/', async (req, res) => {
   try {
      const { name, email, password } = req.body;

      const createUser = new CreateUserService();

      const user = await createUser.execute({ name, email, password });

      delete user.password_hash;

      return res.json(user);
   } catch (error) {
      return res.status(400).json({ message: error.message });
   }
});

usersRoutes.patch(
   '/avatar',
   ensureAuth,
   upload.single('avatar'),
   (request, response) => {
      console.log(request.file);
      return response.json({ ok: true });
   },
);

export default usersRoutes;
