import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

/** NestJS Boilerplate Code */
/** Register your modules here */
@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), CacheModule.register()],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule { }
