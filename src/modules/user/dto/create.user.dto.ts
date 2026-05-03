import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from '../../../shared/enums/user.enums';

export class CreateUserDto {
  @ApiProperty({ default: 'user@example.com', nullable: true, type: 'string' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ default: 'password', minLength: 8, type: 'string' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password!: string;

  @ApiProperty({ default: '1234567890', nullable: true, type: 'string' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ default: 'user_name', type: 'string' })
  @IsNotEmpty()
  @IsString()
  username!: string;

  @ApiProperty({ enum: UserRole })
  @IsNotEmpty()
  @IsEnum(UserRole)
  role!: UserRole;
}
