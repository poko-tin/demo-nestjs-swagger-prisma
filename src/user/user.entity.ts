import { PartialType } from '@nestjs/swagger';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import { Exclude } from 'class-transformer';

export class UserEntity extends PartialType(RegisterUserDto) {
  id: number;
  email: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }
}
