import { Controller, Post, Get, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRequestDTO } from './dto';

/**
 * @class
 * Configures routing endpoint and delegates request to services.
 */
@Controller()
export class UserController {
    constructor(private userService: UserService) {}

    @Get('api/users')
    showAlUsers() {
        return this.userService.showAll();
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    login(@Body() data: UserRequestDTO) {
        return this.userService.login(data);
    }

    @Post('register')
    @UsePipes(new ValidationPipe())
    register(@Body() data: UserRequestDTO) {
        return this.userService.register(data);
    }
}
