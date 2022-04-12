import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { GetUserArgs } from "../dto/args/get-user.dto";
import { CreateUserInput } from "../dto/input/create-user.input";
import { User } from "../models/user.model";
import { UsersService } from "../services/users.service";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async createUser(@Body() userData: CreateUserInput): Promise<User> {
		return this.usersService.createUser(userData);
	}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUser(@Body() userArgs: GetUserArgs): Promise<User> {
		return this.usersService.getUser(userArgs);
	}
}