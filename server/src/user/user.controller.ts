import { Controller, Post, Get, Body, UsePipes, ValidationPipe, UseGuards, Res } from '@nestjs/common';
import { Response } from 'express';
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
    async login(@Body() data: UserRequestDTO, @Res() res: Response) {
        const userResponseData = await this.userService.login(data);
        res.set('Authorization', 'Bearer ' + userResponseData.token);
        delete userResponseData.token;
        res.send(userResponseData);
    }

    @Post('register')
    @UsePipes(new ValidationPipe())
    async register(@Body() data: UserRequestDTO, @Res() res: Response) {
        const userResponseData = await this.userService.register(data);
        res.set('Authorization', 'Bearer ' + userResponseData.token);
        delete userResponseData.token;
        res.send(userResponseData);
    }
}
