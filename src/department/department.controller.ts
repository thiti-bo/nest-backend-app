import { DepartmentService } from './department.service';
import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  //   @Get()
  //   findAll() {
  //     let department = [
  //       {
  //         id: 1,
  //         title: 'ไอที',
  //       },
  //       {
  //         id: 2,
  //         title: 'บุคคล',
  //       },
  //     ];
  //     return department;
  //   }

  @Get()
  findAll(@Res() response: Response): Response {
    let department = this.departmentService.findAll();
    return response.status(200).json(department);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(id);
  }
}
