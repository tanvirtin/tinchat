import { Injectable, Inject, CACHE_MANAGER, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from './message.entity';
import { Repository } from 'typeorm';
import { MessageResponseDTO } from './dto';
import { CreateMessageDTO } from './dto';
import { AppGateway } from '../app.gateway';
import { UserEntity } from '../user/user.entity';
import {paginate, Pagination, IPaginationOptions} from 'nestjs-typeorm-paginate';

/**
 * @class
 * Service handles logic that gets delegated from MessageController.
 */

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(MessageEntity) private messageRepository: Repository<MessageEntity>,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        @Inject(CACHE_MANAGER) private cacheManager,
        private gateway: AppGateway,
    ) {}

    private async checkIfUsersExist(from: string, to: string): Promise<void> {
        if (!await this.userRepository.findOne({ where: { email: to }})) {
            throw new HttpException('Receiver of the message doesn\'t exist in the system', HttpStatus.BAD_REQUEST);
        }
        if (! await this.userRepository.findOne({ where: { email: from }})) {
            throw new HttpException('Sender of the message doesn\'t exist in the system', HttpStatus.BAD_REQUEST);
        }
    }

    private async getRecipientToken(to: string): Promise<boolean> {
        return this.cacheManager.get(to);
    }

    async createMessage(data: CreateMessageDTO): Promise<MessageResponseDTO> {
        const { to, from } = data;
        await this.checkIfUsersExist(from, to);
        const message = this.messageRepository.create(data);
        const token = await this.getRecipientToken(to);
        const messageResponseObject = message.toResponseObject();
        if (token) {
            await this.gateway.wss.emit(token, messageResponseObject);
            message.delivered = true;
            message.seen = false;
        }
        await this.messageRepository.save(message);
        return messageResponseObject;
    }

    async getConversation(convoWith, user, options: IPaginationOptions): Promise<Pagination<MessageEntity>> {
        const queryBuilder = this.messageRepository.createQueryBuilder('message');
        // All combination of from and to in of a message and when ordered by created date
        // gives you the entire conversation that belongs to two users.
        if (convoWith !== user) {
            queryBuilder
                .where('message.from = :from and message.to = :to or message.from = :to and message.to = :from', { from: user, to: convoWith })
                .orderBy('message.createdDate', 'DESC');
        } else {
            queryBuilder
                .where('message.from = :from and message.to = :to', { from: user, to: convoWith })
                .orderBy('message.createdDate', 'DESC');
        }
        return paginate<MessageEntity>(queryBuilder, options);
    }
}
