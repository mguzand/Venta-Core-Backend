import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoService } from 'src/common/services/crypto.service';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users, 'sqlserver')
    private readonly userRepository: Repository<Users>,
    private readonly cryptoService: CryptoService,
  ) {}

  async updatePassword(usuario: string, new_password: string) {
    console.log(usuario, new_password);
    try {
      const result = await this.userRepository.update(
        { usuario },
        { contrasena: new_password },
      );

      return { success: true, message: 'Contraseña actualizada correctamente' };
    } catch (error) {
      throw new NotFoundException('No se pudo actualizar la contraseña');
    }
  }

  //!Obtener un solo registro pasando el usuario
  async findByUsuario(usuario: string): Promise<Users | null> {
    //const encryptedUsuario = this.cryptoService.encrypt(usuario);

    const dataUser = await this.userRepository.findOne({
      where: {
        usuario,
        activo: 1,
      },
    });

    return dataUser;
  }

  async validateUser(
    usuario: string,
    contrasena: string,
  ): Promise<Users | null> {
    const user = await this.findByUsuario(usuario);

    if (!user) {
      return null;
    }

    const decryptedPassword = this.cryptoService.decrypt(user.contrasena);

    //console.log(decryptedPassword);

    if (!decryptedPassword) {
      return null;
    }

    if (decryptedPassword !== contrasena) {
      return null;
    }

    return user;
  }
}
