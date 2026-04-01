import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from 'src/common/services/crypto.service';

import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/modules/sql/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService,
  ) {}

  async resetPassword(usuario: string, new_password: string) {
    const encryptedPassword = this.cryptoService.encrypt(new_password);
    return await this.usersService.updatePassword(usuario, encryptedPassword);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.validateUser(
      dto.username,
      dto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    const usuarioPlano = user.usuario;
    const nombrePlano = user.nombreUsuario;
    const perfilPlano = user.perfilUsuario;
    const empresaPlano = user.empresa;

    const payload = {
      sub: usuarioPlano,
      usuario: usuarioPlano,
      nombreUsuario: nombrePlano,
      perfilUsuario: perfilPlano,
      empresa: empresaPlano,
      superUsuario: user.superUsuario ?? 0,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        usuario: usuarioPlano,
        nombreUsuario: nombrePlano,
        perfilUsuario: perfilPlano,
        empresa: empresaPlano,
        superUsuario: user.superUsuario ?? 0,
        departamento: user.departamento,
        usuarioNav: user.usuarioNav,
      },
    };
  }

  async validateJwtUser(payload: any) {
    return {
      usuario: payload.usuario,
      nombreUsuario: payload.nombreUsuario,
      perfilUsuario: payload.perfilUsuario,
      empresa: payload.empresa,
      superUsuario: payload.superUsuario,
    };
  }
}
