import { DepartmentController } from './department.controller';
import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';

@Module({
    controllers:[DepartmentController],
    providers: [DepartmentService]
})
export class DepartmentModule {}
