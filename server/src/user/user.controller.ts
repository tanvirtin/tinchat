import { Controller, Post, Get, Body, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRequestDTO, UserResponseDTO } from './dto';
import { AuthGuard } from '../shared/auth.guard';

/**
 * @class
 * Configures routing endpoint and delegates request to services.
 */
@Controller()
export class UserController {
    constructor(private userService: UserService) {}

    @Get('api/users')
    @UseGuards(new AuthGuard())
    async showAlUsers(): Promise<UserResponseDTO[]> {
        return this.userService.showAll();
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Body() data: UserRequestDTO): Promise<UserResponseDTO> {
        return this.userService.login(data);
    }

    @Post('register')
    @UsePipes(new ValidationPipe())
    async register(@Body() data: UserRequestDTO): Promise<UserResponseDTO> {
        return this.userService.register(data);
    }
}
