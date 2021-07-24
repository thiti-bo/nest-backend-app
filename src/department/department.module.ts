import { DepartmentController } from './department.controller';
import { Module } from '@nestjs/common';

@Module({
    controllers:[DepartmentController]
})
export class DepartmentModule {}
