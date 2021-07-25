import { Prisma } from '@prisma/client';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { PositionService } from './position.service';
import { Response } from 'express';

@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post()
  async create(
    @Body() data: Prisma.PositionCreateInput,
    @Res() response: Response,
  ): Promise<Response> {
    const position = await this.positionService.create(data);
    return response.status(200).json(position);
  }

  @Get()
  async findAll() {
    return this.positionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.positionService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Prisma.PositionUpdateInput,
  ) {
    return await this.positionService.update(+id, data);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      await this.positionService.remove(+id);
      return response.status(200).json({ message: 'ลบข้อมูลเรียบร้อย' });
    } catch (error) {
      // console.log(error);
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code == 'P2025'
      ) {
        return response.status(400).json({
          message: 'ไม่พบ ID นี้ในฐานข้อมูล',
          message_en: error.message,
        });
      } else {
        return response
          .status(400)
          .json({ message: 'เกิดข้อผิดพลาดจาก Server' });
      }
    }
  }
}
