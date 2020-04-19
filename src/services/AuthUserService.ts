import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import { authConfig } from '../config/auth.config';
import { AppError } from '../errors/appError';
import { User } from '../models/User.model';

interface RequestDTO {
   email: string;
   password: string;
}

interface ResponseDTO {
   user: User;
   token: string;
}

export class AuthUserService {
   public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
      const usersRepo = getRepository(User);

      const user = await usersRepo.findOne({ where: { email } });

      if (!user) {
         throw new AppError('Incorret email/password combination.', 401);
      }
      const passwordMached = await compare(password, user.password_hash);

      if (!passwordMached) {
         throw new AppError('Incorret email/password combination.', 401);
      }

      const token = sign({}, authConfig.secret, {
         subject: user.id,
         expiresIn: authConfig.tokenExpired,
      });

      return {
         user,
         token,
      };
   }
}
