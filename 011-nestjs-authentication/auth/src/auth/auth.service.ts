import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<{ access_token: string }> {
    // Проверяем, существует ли пользователь
    const existingUser = await this.userService.findByEmail(signupDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Создаем нового пользователя
    const user = await this.userService.create(signupDto);

    // Генерируем JWT токен
    const payload: JwtPayload = {
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signin(signinDto: SigninDto): Promise<{ access_token: string }> {
    // Ищем пользователя по email
    const user = await this.userService.findByEmail(signinDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Проверяем пароль
    const isPasswordValid = await bcrypt.compare(
      signinDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Генерируем JWT токен
    const payload: JwtPayload = {
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
