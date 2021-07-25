import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Staff } from '@prisma/client';

@Injectable()
export class StaffService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Staff[]> {
    const staff = await this.prismaService.staff.findMany({
      include: {
        Position: true,
      },
      orderBy: { id: 'desc' },
    });
    return staff;
  }

  async findAll2(): Promise<Staff[]> {
    const staff = await this.prismaService.$queryRaw(
      'select * from "Staff" order by id desc',
    );
    return staff;
  }
}
