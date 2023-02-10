import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  private async _hashedPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  private async _comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { email } });

    const hashedPassword = user.password;
    const isPasswordMatching = await this._comparePassword(
      password,
      hashedPassword,
    );

    if (isPasswordMatching) {
      return user;
    }

    return null;
  }

  async registerUser(data: Prisma.UserCreateInput): Promise<User> {
    const hashedPassword = await this._hashedPassword(data.password);
    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }
}
