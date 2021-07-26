import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
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
  }

  login() {
    return 'login Service';
  }
}
