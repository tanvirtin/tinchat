import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './message.entity';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { AppGateway } from '../app.gateway';
import { UserEntity } from '../user/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([MessageEntity, UserEntity]), CacheModule.register()],
    controllers: [MessageController],
    providers: [MessageService, AppGateway],
})
export class MessageModule {}
