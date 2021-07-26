import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: UserDto) {
    return await this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: UserDto) {
    return '';
  }

  @Get('profile')
  getProfile() {
    return 'profile';
  }
}
