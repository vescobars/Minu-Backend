import { Injectable } from '@nestjs/common';
import { Role } from '../enums/role.enum';
import { User } from './user';

@Injectable()
export class UserService {
  private users: User[] = [
    new User(1, 'admin', '123', [Role.Admin]),
    new User(2, 'client', '123', [Role.Client]),
    new User(3, 'waiter', '123', [Role.Waiter]),
    new User(4, 'receptionist', '123', [Role.Receptionist]),
    new User(5, 'owner', '123', [Role.Owner]),
    new User(6, 'adminNicolas', 'Nicolas', [Role.Admin]),
    new User(7, 'readerNicolas', 'Nicolas', [Role.Reader]),
    new User(8, 'writerNicolas', 'Nicolas', [Role.Writer]),
    new User(9, 'deleterNicolas', 'Nicolas', [Role.Deleter]),
    new User(10, 'adminJavier', 'Javier', [Role.Admin]),
    new User(11, 'readerJavier', 'Javier', [Role.Reader]),
    new User(12, 'writerJavier', 'Javier', [Role.Writer]),
    new User(13, 'deleterJavier', 'Javier', [Role.Deleter]),
    new User(14, 'adminGabriela', 'Gabriela', [Role.Admin]),
    new User(15, 'readerGabriela', 'Gabriela', [Role.Reader]),
    new User(16, 'writerGabriela', 'Gabriela', [Role.Writer]),
    new User(17, 'deleterGabriela', 'Gabriela', [Role.Deleter]),
    new User(18, 'adminCamilo', 'Camilo', [Role.Admin]),
    new User(19, 'readerCamilo', 'Camilo', [Role.Reader]),
    new User(20, 'writerCamilo', 'Camilo', [Role.Writer]),
    new User(21, 'deleterCamilo', 'Camilo', [Role.Deleter]),
    new User(22, 'adminVeronica', 'Veronica', [Role.Admin]),
    new User(23, 'readerVeronica', 'Veronica', [Role.Reader]),
    new User(24, 'writerVeronica', 'Veronica', [Role.Writer]),
    new User(25, 'deleterVeronica', 'Veronica', [Role.Deleter]),
    new User(26, 'master', '123', [
      Role.Admin,
      Role.Writer,
      Role.Deleter,
      Role.Reader,
    ]),
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
