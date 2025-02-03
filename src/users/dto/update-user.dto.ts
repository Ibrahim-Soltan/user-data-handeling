import { ApiProperty } from '@nestjs/swagger';

import {
  IsString,
  IsEmail,
  IsOptional,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'The name of a user',
    type: String,
    example: 'John Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The email of a user',
    type: String,
    example: 'someone@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The age of a user',
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(120)
  age?: number;
}
