import { PrismaService } from './../prisma/prisma.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
// import { CreatePositionDto } from './dto/create-position.dto';
// import { UpdatePositionDto } from './dto/update-position.dto';
import { Position, Prisma } from '@prisma/client';

@Injectable()
export class PositionService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.PositionCreateInput): Promise<Position> {
    const position = await this.prismaService.position.create({
      data: {
        title: data.title,
      },
    });
    return position;
  }

  async findAll(): Promise<Position[]> {
    const position = await this.prismaService.position.findMany({
      orderBy: {
        id: 'desc',
      },
    });
    return position;
  }

  async findOne(id: number): Promise<Position> {
    // if (!id) throw new BadRequestException('ข้อมูลไม่ถูกต้อง');
    const position = await this.prismaService.position.findUnique({
      where: {
        id: id,
      },
    });
    if (!position) throw new NotFoundException('ไม่พบข้อมูลในระบบ');
    return position;
  }

  async update(
    id: number,
    data: Prisma.PositionUpdateInput,
  ): Promise<Position> {
    const position = await this.prismaService.position.update({
      where: {
        id: id,
      },
      data: data,
    });
    return position;
  }

  async remove(id: number) {
    const position = await this.prismaService.position.delete({
      where: {
        id: id,
      },
    });
    return position;
  }
}
