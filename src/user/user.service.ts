import { Injectable } from '@nestjs/common';
import { Role } from '../enums/role.enum';
import { User } from './user';

@Injectable()
export class UserService {
   private users: User[] = [
       new User(1, "admin", "123", [Role.Admin]),
       new User(2, "client", "123", [Role.Client]),
       new User(3, "waiter", "123", [Role.Waiter]),
       new User(4, "receptionist", "123", [Role.Receptionist]),
       new User(5, "owner", "123", [Role.Owner]),
   ];

   async findOne(username: string): Promise<User | undefined> {
       return this.users.find(user => user.username === username);
   }
}