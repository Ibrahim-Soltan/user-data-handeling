import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminsService } from './admins.service';
import { Admin, AdminSchema } from './schemas/admin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  ],
  controllers: [AdminsController],
  providers: [AdminsService],
  exports: [AdminsService],
})
export class AdminsModule {}
