import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    description: 'The username of the admin',
    example: 'adminUser123',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'The password of the admin',
    example: 'securePassword!123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
