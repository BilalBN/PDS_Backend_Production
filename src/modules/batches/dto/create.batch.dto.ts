import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBatchDto {
  @ApiProperty({ default: 'test', type: 'string' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ default: new Date(), type: 'string' })
  @IsNotEmpty()
  @IsString()
  start_date!: string;

  @ApiProperty({ default: new Date(), type: 'string' })
  @IsNotEmpty()
  @IsString()
  end_date!: string;

  @ApiProperty({ default: new Date(), type: 'string' })
  @IsNotEmpty()
  @IsString()
  expiry_date!: string;

  @ApiProperty({ default: 1, type: 'number' })
  @IsNotEmpty()
  @IsNumber()
  supervisor_id!: number;

  @ApiProperty({ default: 1, type: 'number' })
  @IsNotEmpty()
  @IsNumber()
  product_id!: number;

  @ApiProperty({ default: 10, type: 'number' })
  @IsNotEmpty()
  @IsNumber()
  size!: number;
}
