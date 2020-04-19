import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload.config';
import { ensureAuth } from '../middlewares/ensureAuth';
import { CreateUserService } from '../services/CreateUserService';
import { UpdateUserAvatarService } from '../services/UpdateUserAvatarService';

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
   async (request, response) => {
      try {
         const updateUserAvatar = new UpdateUserAvatarService();

         const user = await updateUserAvatar.execute({
            avatarFilename: request.file.filename,
            user_id: request.user.id,
         });
         delete user.password_hash;
         return response.json(user);
      } catch (error) {
         return response.status(401).json({ message: error.message });
      }
   },
);

export default usersRoutes;
