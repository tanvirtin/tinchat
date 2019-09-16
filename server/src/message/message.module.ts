import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './message.entity';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
    imports: [TypeOrmModule.forFeature([MessageEntity]), CacheModule.register()],
    controllers: [MessageController],
    providers: [MessageService],
})
export class MessageModule {}
