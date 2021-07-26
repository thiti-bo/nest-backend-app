import { StaffService } from './staff.service';
import { Controller, Get, Query } from '@nestjs/common';

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

  @Get('paginate')
  async findAllWithPagination(@Query() query: any) {
    const staff = await this.staffService.findAllWithPagination(query);
    const total = await this.staffService.getTotal();
    return {
      total: total,
      data: staff,
    };
  }
}
