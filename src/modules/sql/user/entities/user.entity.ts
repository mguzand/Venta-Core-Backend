import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Usuarios', schema: 'dbo' })
export class Users {
  @PrimaryColumn({
    name: 'Usuario',
    type: 'nvarchar',
    length: 50,
  })
  usuario: string;

  @Column({
    name: 'Contraseña',
    type: 'nvarchar',
    length: 100,
  })
  contrasena: string;

  @Column({
    name: 'NombreUsuario',
    type: 'nvarchar',
    length: 30,
  })
  nombreUsuario: string;

  @Column({
    name: 'ObservacionUsuario',
    type: 'nvarchar',
    length: 100,
    nullable: true,
  })
  observacionUsuario?: string;

  @Column({
    name: 'PerfilUsuario',
    type: 'nvarchar',
    length: 20,
  })
  perfilUsuario: string;

  @Column({
    name: 'Empresa',
    type: 'nvarchar',
    length: 20,
  })
  empresa: string;

  @Column({
    name: 'Activo',
    type: 'smallint',
  })
  activo: number;

  @Column({
    name: 'UsuarioRegistro',
    type: 'nvarchar',
    length: 50,
    nullable: true,
  })
  usuarioRegistro?: string;

  @Column({
    name: 'FechaRegistro',
    type: 'datetime',
    nullable: true,
    default: () => 'GETDATE()',
  })
  fechaRegistro?: Date;

  @Column({
    name: 'UsuarioModificacion',
    type: 'nvarchar',
    length: 50,
    nullable: true,
  })
  usuarioModificacion?: string;

  @Column({
    name: 'FechaModificacion',
    type: 'datetime',
    nullable: true,
    default: () => 'GETDATE()',
  })
  fechaModificacion?: Date;

  @Column({
    name: 'SuperUsuario',
    type: 'smallint',
    nullable: true,
  })
  superUsuario?: number;

  @Column({
    name: 'Printer',
    type: 'nvarchar',
    length: 20,
    nullable: true,
  })
  printer?: string;

  @Column({
    name: 'UsuarioNAV',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  usuarioNav?: string;

  @Column({
    name: 'Departamento',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  departamento?: string;
}
