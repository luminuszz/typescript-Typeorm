/* eslint-disable @typescript-eslint/camelcase */
import { hash } from 'bcrypt';
import { getRepository } from 'typeorm';

import { AppError } from '../errors/appError';
import { User } from '../models/User.model';

interface RequestDTO {
   name: string;
   email: string;
   password: string;
}

export class CreateUserService {
   public async execute({ email, name, password }: RequestDTO): Promise<User> {
      const usersRepo = getRepository(User);

      const findUser = await usersRepo.findOne({
         where: { email },
      });

      if (findUser) {
         throw new AppError('Email address Already used');
      }

      const password_hash = await hash(password, 8);

      const user = usersRepo.create({
         name,
         email,
         password_hash,
      });

      await usersRepo.save(user);

      return user;
   }
}
