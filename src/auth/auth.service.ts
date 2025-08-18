import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { UserRepository } from 'src/user/repositories/user.reposity';
import { AccessTokenDto } from './dtos/access-token';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
        throw new UnauthorizedException('E-mail ou senha incorreta.');
    }

    if (!user.password) {
        throw new UnauthorizedException('E-mail ou senha incorreta.');
    }

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) {
        throw new UnauthorizedException('E-mail ou senha incorreta.');
    }

    const token = this.token(user.id, user.email);
    return new AccessTokenDto(token);
  }

  private token(userId: string, email: string): string {
    const payload = { sub: userId, email };
    return this.jwtService.sign(payload);
  }
}
