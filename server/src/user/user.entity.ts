import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    BeforeInsert,
} from 'typeorm';

import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserResponseDTO } from './dto';

/**
 * @class
 * Database entity class which is a wrapper and a parser for
 * the data that exists in the database.
 */
@Entity('user')
export class UserEntity {
    // Automatically NestJS generated id.
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // Automatically NestJS generated date.
    @CreateDateColumn()
    created: Date;

    @Column({
        type: 'text',
        unique: true,
    })
    username: string;

    @Column('text')
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    toResponseObject(showToken: boolean = true): UserResponseDTO {
        const { id, created, username, token } = this;
        const responseObject: UserResponseDTO = { id, created, username };
        if (showToken) {
            responseObject.token = token;
        }
        return responseObject;
    }

    async comparePassword(attemp: string) {
        return await bcrypt.compare(attemp, this.password);
    }

    private get token() {
        const { id, username } = this;
        return jwt.sign({ id, username }, process.env.SECRET, { expiresIn: '7d' });
    }
}
