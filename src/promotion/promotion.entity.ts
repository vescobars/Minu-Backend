import { PlateEntity } from 'src/plate/plate.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class PromotionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    startDate: string;

    @Column()
    endDate: string;

    @Column()
    discount: number;

    @Column()
    description: string;

    @OneToOne(() => PlateEntity, plate => plate.promotion)
    plate: PlateEntity;
}