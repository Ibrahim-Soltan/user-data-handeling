import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { CreateAdminDto } from './dto/create-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const existingAdmin = await this.findOne(createAdminDto.username);
    if (existingAdmin) {
      throw new ConflictException('Username is already taken');
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createAdminDto.password,
      saltRounds,
    );
    const createdAdmin = new this.adminModel({
      ...createAdminDto,
      password: hashedPassword,
    });
    return createdAdmin.save();
  }
  async findOne(username: string): Promise<Admin | null> {
    return this.adminModel.findOne({ username }).exec();
  }
}
