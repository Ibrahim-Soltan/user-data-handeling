import {
  Controller,
  Delete,
  Get,
  Put,
  Post,
  Query,
  Param,
  Body,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParseObjectIdPipe } from 'src/common/pipes/parse-object-id.pipe';
import { AuthGuard } from 'src/auth/auth.gaurd';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiQuery({ name: 'page', required: false, type: Number, default: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, default: 10 })
  @ApiQuery({ name: 'minAge', required: false, type: Number })
  @ApiQuery({ name: 'maxAge', required: false, type: Number })
  @UseGuards(AuthGuard)
  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('minAge') minAge: number,
    @Query('maxAge') maxAge: number,
  ): Promise<User[]> {
    return this.usersService.findAll(page, limit, minAge, maxAge);
  }

  @ApiResponse({ status: 200, description: 'User found', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  @UseGuards(AuthGuard)
  @Get(':id')
  @UsePipes(ParseObjectIdPipe)
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @ApiResponse({ status: 200, description: 'User created', type: User })
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @ApiResponse({ status: 200, description: 'User updated', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  @UseGuards(AuthGuard)
  @Put(':id')
  @UsePipes(ParseObjectIdPipe)
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiResponse({ status: 200, description: 'User removed', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  @UsePipes(ParseObjectIdPipe)
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }
}
