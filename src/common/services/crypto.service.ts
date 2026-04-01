import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  private readonly encryptionKey = process.env.ENCRYPTION_KEY || '';

  constructor() {
    if (!this.encryptionKey) {
      throw new Error(
        'ENCRYPTION_KEY no está definida en las variables de entorno',
      );
    }
  }

  private deriveKeyAndIv(): { key: Buffer; iv: Buffer } {
    const password = this.encryptionKey;
    const salt = Buffer.from(this.encryptionKey, 'ascii');

    /**
     * Compatibilidad legacy con .NET Rfc2898DeriveBytes clásico:
     * - algoritmo: SHA1
     * - iteraciones por defecto: 1000
     *
     * 32 bytes para key + 16 bytes para iv = 48 bytes
     */
    const derived = crypto.pbkdf2Sync(password, salt, 1000, 48, 'sha1');

    const key = derived.subarray(0, 32);
    const iv = derived.subarray(32, 48);

    return { key, iv };
  }

  encrypt(inputText: string): string {
    const { key, iv } = this.deriveKeyAndIv();

    /**
     * C# Encoding.Unicode = UTF-16LE
     */
    const plainText = Buffer.from(inputText, 'utf16le');

    /**
     * RijndaelManaged en este caso normalmente equivale a AES/CBC/PKCS7
     * con IV de 16 bytes y key de 32 bytes => aes-256-cbc
     */
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    const encrypted = Buffer.concat([cipher.update(plainText), cipher.final()]);

    return encrypted.toString('base64');
  }

  decrypt(inputText: string): string {
    const { key, iv } = this.deriveKeyAndIv();

    const encryptedData = Buffer.from(inputText, 'base64');

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

    const decrypted = Buffer.concat([
      decipher.update(encryptedData),
      decipher.final(),
    ]);

    /**
     * C# Encoding.Unicode = UTF-16LE
     */
    return decrypted.toString('utf16le');
  }
}
