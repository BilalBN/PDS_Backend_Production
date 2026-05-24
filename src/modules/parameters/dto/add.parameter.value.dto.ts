import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class AddParameterValueDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  batchId!: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  enteredBy!: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  parameterId!: number;

  @IsNotEmpty()
  value!: any;
}
