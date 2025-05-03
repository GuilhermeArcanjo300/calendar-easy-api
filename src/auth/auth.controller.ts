import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { AccessTokenDto } from './dtos/access-token';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto): Promise<AccessTokenDto> {
    return await this.authService.signup(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto): Promise<AccessTokenDto> {
    return await this.authService.login(dto);
  }
}
