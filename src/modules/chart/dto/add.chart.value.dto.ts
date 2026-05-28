import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { ChartParameter } from '../interfaces/chart.parameter.interface';

export class AddChartValueDto {
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
  sub_step_id!: number;

  @ApiProperty({ default: [{ parameter_id: 1, value: 'test' }], type: 'array' })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @IsObject({ each: true })
  values!: ChartParameter[];

  @IsOptional()
  @IsString()
  image_url?: string;
}
