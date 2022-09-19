import { PlateEntity } from '../plate/plate.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class DescriptionTagEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
 
    @ManyToOne(() => PlateEntity, plate => plate.descriptionTags)
    plate: PlateEntity;
}