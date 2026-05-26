import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class AddParameterValueDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  batch_id!: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  entered_by!: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  parameter_id!: number;

  @IsNotEmpty()
  value!: any;
}
