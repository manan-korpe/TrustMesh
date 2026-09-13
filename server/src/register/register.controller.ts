import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RegisterDto } from "./registration.dto";
import { RegisterService } from "./register.service";

@Controller('register')
export class RegisterController {
    constructor(private readonly service: RegisterService) {}
  @Get("challenge/:wallet") challenge(@Param("wallet") wallet: string) {
    return this.service.getChallenge(wallet);
  }
  @Post("verify") verify(@Body() dto: RegisterDto) {
    return this.service.register(dto);
  }
  @Get("user/:wallet") user(@Param("wallet") wallet: string) {
    return this.service.getUser(wallet);
  }
}
