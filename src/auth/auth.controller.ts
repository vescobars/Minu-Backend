import { Controller, Get, Post, UseGuards,Request } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Role } from "src/enums/role.enum";
import { HasRoles } from "src/shared/security/roles.decorators";
import { AuthService } from "./auth.service";
import { RolesGuard } from "./guards/role.guard";

@Controller()
export class AuthController {

   constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request()req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request()req) {
    return req.user;
  }

  @HasRoles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('admin')
  onlyAdmin(@Request() req) {
    return req.user;
  }

  @HasRoles(Role.Client)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('client')
  onlyUser(@Request() req) {
    return req.user;
  }
}