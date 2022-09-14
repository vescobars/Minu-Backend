import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from 'src/client/client.entity';
import { ScheduleEntity } from 'src/schedule/schedule.entity';
import { MenuVisualTemplateEntity } from 'src/menu-visual-template/menu-visual-template.entity';

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [ClientEntity, ScheduleEntity, MenuVisualTemplateEntity],
    synchronize: true,
    keepConnectionAlive: true,
  }),
  TypeOrmModule.forFeature([
    ClientEntity,
    ScheduleEntity,
    MenuVisualTemplateEntity,
  ]),
];
