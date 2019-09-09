import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserRequestDTO, UserResponseDTO } from './dto';

/**
 * @class
 * Service handles logic that gets delagated to it by the controller.
 */
@Injectable()
export class UserService {
    // Dependency Injection of userEntity collection inside this service class.
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

    async showAll(): Promise<UserResponseDTO[]> {
        const users = await this.userRepository.find();
        return users.map(user => user.toResponseObject(false));
    }

    async login(data: UserRequestDTO): Promise<UserResponseDTO> {
        const { username, password } = data;
        const user = await this.userRepository.findOne({ where: { username }});
        if (!user || !await user.comparePassword(password)) {
            throw new HttpException('Invalid username/password', HttpStatus.BAD_REQUEST);
        }
        return user.toResponseObject();
    }

    async register(data: UserRequestDTO): Promise<UserResponseDTO> {
        const { username } = data;
        let user = await this.userRepository.findOne({ where: { username } });
        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        user = await this.userRepository.create(data);
        await this.userRepository.save(user);
        return user.toResponseObject();
    }
}
