import {
    Controller,
    Post,
    Body,
    UsePipes,
    ValidationPipe,
    UseGuards,
    Get,
    Query,
    Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateMessageDTO } from './dto';
import { AuthGuard } from '../shared/auth.guard';
import { MessageService } from './message.service';
import { MessageResponseDTO } from './dto';

/**
 * @class
 * Configures routing endpoint and delegates request to services.
 */
@Controller()
export class MessageController {
    constructor(private messageService: MessageService) {}

    @Post('api/message')
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    async createMessage(@Body() data: CreateMessageDTO): Promise<MessageResponseDTO> {
        return this.messageService.createMessage(data);
    }

    @Get('api/messages')
    @UseGuards(new AuthGuard())
    async index(@Query('with') convoWith: string, @Query('page') page: number = 0,
                @Query('limit') limit: number = 10,
                @Req() req: Request) {
        limit = limit > 100 ? 100 : limit;
        return await this.messageService.getMessages(convoWith, req.body.from, { page, limit });
    }
}
