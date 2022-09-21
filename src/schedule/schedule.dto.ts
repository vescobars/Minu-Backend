import { IsNotEmpty, IsString } from 'class-validator';
export class ScheduleDto {
  @IsString()
  @IsNotEmpty()
  readonly day: string;

  @IsString()
  @IsNotEmpty()
  readonly opening_hour: string;

  @IsString()
  @IsNotEmpty()
  readonly closing_hour: string;
}
