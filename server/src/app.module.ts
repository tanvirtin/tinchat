import { Module, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageModule } from './message/message.module';
import { AppGateway } from './app.gateway';
import { SearchModule } from './search/search.module';

@Module({
    // If you want to build app without :dev use add  "./src/**/*.entity.ts" to ormconfig.json's entities attribute.
    imports: [TypeOrmModule.forRoot(), UserModule, MessageModule, CacheModule.register(), SearchModule],
    controllers: [AppController],
    providers: [AppService, AppGateway],
})
export class AppModule { }
