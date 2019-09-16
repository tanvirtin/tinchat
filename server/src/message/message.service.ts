import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from './message.entity';
import { Repository } from 'typeorm';
import { MessageResponseDTO } from './dto';
import { CreateMessageDTO } from './dto';

/**
 * @class
 * Service handles logic that gets delegated from MessageController.
 */

@Injectable()
export class MessageService {
    constructor(@InjectRepository(MessageEntity) private messageRepository: Repository<MessageEntity>) {}

    async createMessage(data: CreateMessageDTO): Promise<MessageResponseDTO> {
        const message = this.messageRepository.create(data);
        await this.messageRepository.save(message);
        return message.toResponseObject();
    }
}
