import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class AddParameterValueDto {
  @ApiProperty({ default: 1, type: 'integer' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  batch_id!: number;

  @ApiProperty({ default: 1, type: 'integer' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  entered_by!: number;

  @ApiProperty({ default: 1, type: 'integer' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  parameter_id!: number;

  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  value!: any;
}
