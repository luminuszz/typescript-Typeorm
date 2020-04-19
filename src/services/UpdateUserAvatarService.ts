import fs from 'fs';
import path from 'path';
import { getRepository } from 'typeorm';

import uploadConfig from '../config/upload.config';
import { AppError } from '../errors/appError';
import { User } from '../models/User.model';

interface RequestDTO {
   user_id: string;
   avatarFilename: string;
}

export class UpdateUserAvatarService {
   public async execute({
      user_id,
      avatarFilename,
   }: RequestDTO): Promise<User> {
      const userRepo = getRepository(User);

      const user = await userRepo.findOne(user_id);

      if (!user) {
         throw new AppError('Only authenticated users can change avatar.', 401);
      }

      if (user.avatar) {
         const userAvatarProfilePath = path.join(
            uploadConfig.directory,
            user.avatar,
         );
         const userAvatarFileExists = await fs.promises.stat(
            userAvatarProfilePath,
         );
         if (userAvatarFileExists) {
            await fs.promises.unlink(userAvatarProfilePath);
         }
      }

      user.avatar = avatarFilename;

      await userRepo.save(user);

      return user;
   }
}
