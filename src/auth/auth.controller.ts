import { Controller, Injectable, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Credentials } from './schema/dto/credentials.dto';

@Controller('api')
export class AuthController {

    constructor(private authService: AuthService) {
    }
    
    @Post('/login')
    async login(@Body() user: Credentials) {
        return this.authService.login(user);
    }
}
