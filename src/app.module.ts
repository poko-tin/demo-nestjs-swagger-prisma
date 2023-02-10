import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { PostModule } from './post/post.module';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { ZodValidationPipe } from 'nestjs-zod';

@Module({
  imports: [AuthModule, UserModule, PostModule],
  controllers: [AppController, AuthController],
  providers: [
    AuthService,
    PrismaService,
    {
      provide: ZodValidationPipe,
      useValue: new ZodValidationPipe(),
    },
  ],
})
export class AppModule {}
