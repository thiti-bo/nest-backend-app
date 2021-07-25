import { StaffService } from './staff.service';
import { Controller, Get } from '@nestjs/common';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Get()
  async findAll() {
    return await this.staffService.findAll();
  }

  @Get('sql')
  async findAll2() {
    return await this.staffService.findAll2();
  }
}
