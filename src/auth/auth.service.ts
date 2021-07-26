import { Prisma } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(body: UserDto) {
    const { email, password } = body;
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltOrRounds);

    try {
      const user = await this.prismaService.user.create({
        data: {
          email: email,
          password: hashPassword,
        },
        select: {
          id: true,
          email: true,
        },
      });
      return user;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('อีเมล์นี้มีผู้ใช้งานแล้ว');
      }
      throw new Error(error);
    }
  }

  async login(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) throw new NotFoundException('ไม่พบผู้ใช้นี้ในระบบ');

    //เปรียบเทียบรหัสผ่านว่าตรงกันหรือไม่
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException('รหัสผ่านไม่ถูกต้อง');

    //generate token
    const token = await this.jwtService.signAsync({
      userId : user.id
    })

    return {
      tokenType : 'Bearer',
      accessToken : token
    }
  }
}
