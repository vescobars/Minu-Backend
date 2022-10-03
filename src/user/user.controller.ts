import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {

   constructor(private readonly authService: AuthService){}
   
   @UseGuards(LocalAuthGuard)
   @Post('login')
   async login(@Req() req) {
       return this.authService.login(req);
   }
}