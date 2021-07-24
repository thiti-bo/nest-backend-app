import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('department')
export class DepartmentController {
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
    let department = [
      {
        id: 1,
        title: 'ไอที',
      },
      {
        id: 2,
        title: 'บุคคล',
      },
    ];
    return response.status(200).json(department);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return 'id : ' + id;
  }
}
