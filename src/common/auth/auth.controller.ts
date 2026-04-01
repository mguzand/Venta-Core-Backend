import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto, @Request() req) {
    return await this.authService.resetPassword(
      req.user.usuario,
      dto.new_password,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  profile(@Request() req: any) {
    return req.user;
  }
}
