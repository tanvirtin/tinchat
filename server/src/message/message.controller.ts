import {
    Controller,
    Post,
    Body,
    UsePipes,
    ValidationPipe,
    UseGuards,
} from '@nestjs/common';
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
}
