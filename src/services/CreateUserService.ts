/* eslint-disable @typescript-eslint/camelcase */
import { getRepository } from 'typeorm';

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
         throw new Error('Email address Already used');
      }

      const user = usersRepo.create({
         name,
         email,
         password_hash: password,
      });

      await usersRepo.save(user);

      return user;
   }
}
