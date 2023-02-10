import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './../prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService, AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    const data: RegisterUserDto = {
      email: 'hopthucuatin' + (Math.random() % 2000) + '@gmail.com',
      password: '123456',
    };

    expect(controller.register(data)).toBeDefined();
  });
});
