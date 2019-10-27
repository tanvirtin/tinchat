import { Injectable, Inject, CACHE_MANAGER, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from './message.entity';
import { Repository } from 'typeorm';
import { MessageResponseDTO, MessagesResponseDTO } from './dto';
import { CreateMessageDTO } from './dto';
import { AppGateway } from '../app.gateway';
import { UserEntity } from '../user/user.entity';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

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

    /**
     * Checks if both sender and receiver exists in the system, to prevent invalid records from being created in the database.
     * @param from email of the user who is sending the message.
     * @param to email of the user who will be receiving the message.
     */
    private async checkIfUsersExist(from: string, to: string): Promise<void> {
        if (!await this.userRepository.findOne({ where: { email: to }})) {
            throw new HttpException('Receiver of the message doesn\'t exist in the system', HttpStatus.BAD_REQUEST);
        }
        if (! await this.userRepository.findOne({ where: { email: from }})) {
            throw new HttpException('Sender of the message doesn\'t exist in the system', HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * If a user is logged in the token will exist in the cache. This method retrieves that cached token.
     * @param email of a user.
     */
    private async getRecipientToken(email: string): Promise<boolean> {
        return this.cacheManager.get(email);
    }

    /**
     * Stores message sent by the client into the databse.
     * @param data Message Request Data Transfer Object from the client.
     */
    async createMessage(data: CreateMessageDTO): Promise<MessageResponseDTO> {
        const { to, from } = data;
        await this.checkIfUsersExist(from, to);
        const message = this.messageRepository.create(data);
        const token = await this.getRecipientToken(to);
        const messageResponseObject = message.toResponseObject();
        if (token) {
            await this.gateway.wss.emit(token, messageResponseObject);
        }
        message.delivered = true;
        message.seen = false;
        await this.messageRepository.save(message);
        return messageResponseObject;
    }

    /**
     * Retrieve messages via pagination, the messages that get retrieved also has their seen flag set to true and stored back into the database.
     * @param convoWith The person with whom the user is having conversation with.
     * @param user The current user who is making the request.
     * @param options Object containing page (current page of conversation) and limit (conversation per page) attributes.
     */
    async getConversation(convoWith, user, options: IPaginationOptions): Promise<MessagesResponseDTO> {
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
        const messages = await paginate<MessageEntity>(queryBuilder, options);
        const unseenCount = await this.messageRepository.count({
            from: convoWith,
            to: user,
            seen: false,
        });
        // Whenever conversations are retrieved we need to update the seen flag in the database indicating that
        // the messages have been seen by the user receiving it, since a request is being made to retrieve them.
        let seenCount = 0;
        if (messages.items) {
            for (const message of messages.items) {
                if (!message.seen) {
                    ++seenCount;
                    message.seen = true;
                    this.messageRepository.save(message);
                }
            }
        }
        const { items, itemCount, pageCount } = messages;
        const messagesResponseObject: MessagesResponseDTO = {
            items,
            itemCount,
            pageCount,
            unseenItems: unseenCount - seenCount,
        };
        return messagesResponseObject;
    }
}
