import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';
import { MessageResponseDTO } from './dto';

/**
 * @class
 * Database entity class which ecapsulates data for a message in the system.
 */
@Entity('message')
export class MessageEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdDate: Date;

    @Column('text')
    message: string;

    @Column('text')
    from: string;

    @Column('text')
    to: string;

    @Column({
        type: 'boolean',
        nullable: true,
    })
    delivered: boolean;

    @Column({
        type: 'boolean',
        nullable: true,
    })
    seen: boolean;

    toResponseObject(): MessageResponseDTO {
        const { id, createdDate, from, to, delivered, seen, message } = this;
        const responseObject: MessageResponseDTO = { id, createdDate, message, from, to, delivered, seen };
        return responseObject;
    }
}
