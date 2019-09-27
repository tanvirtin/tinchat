import {
    Controller,
    Post,
    Get,
    Body,
    UsePipes,
    ValidationPipe,
    UseGuards,
    Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { UserRegisterDTO, UserLoginDTO, UserResponseDTO } from './dto';
import { AuthGuard } from '../shared/guards/auth.guard';
import { UserLogoutDTO } from './dto/user-logout.dto';

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

    @Post('register')
    @UsePipes(new ValidationPipe())
    async register(@Body() data: UserRegisterDTO, @Res() res: Response): Promise<void> {
        const userResponseData = await this.userService.register(data);
        res.set('Authorization', 'Bearer ' + userResponseData.token);
        res.send(userResponseData);
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Body() data: UserLoginDTO, @Res() res: Response): Promise<void> {
        const userResponseData = await this.userService.login(data);
        res.set('Authorization', 'Bearer ' + userResponseData.token);
        res.send(userResponseData);
    }

    @Post('logout')
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    logoutt(@Body() data: UserLogoutDTO): void {
        this.userService.logout(data);
    }
}
