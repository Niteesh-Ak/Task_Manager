import { Body, Controller, Get, HttpException, Param, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./Users.service";
import { CreateUserDtoo } from "./dto/createUser.dto";
import { JwtAuthGuard } from "src/Auth/jwt-auth.guard";
import { Types } from "mongoose";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('signup')
    createUser(@Body() CreateUserDtoo: CreateUserDtoo) {
        return this.usersService.createUser(CreateUserDtoo);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    getUsers(){
        return this.usersService.getUsers();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getUserById(@Param('id')id: string){
        const isValid = Types.ObjectId.isValid(id);
        if(!isValid)throw new HttpException('Invalid ID', 400);
        return this.usersService.getUserById(id);
    }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        return this.usersService.login(body);
    }   
    
}
