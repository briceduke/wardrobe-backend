import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';

import { GetUserArgs } from '../dto/args/get-user.dto';
import { CreateUserInput } from '../dto/input/create-user.input';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';

@Resolver()
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	@Mutation(() => User)
	async createUser(@Args("userData") userData: CreateUserInput): Promise<User> {
		return this.usersService.createUser(userData);
	}

	@UseGuards(GqlAuthGuard)
	@Query(() => User, { name: "user" })
	async getUser(@Args() userArgs: GetUserArgs): Promise<User> {
		return this.usersService.getUser(userArgs);
	}
}
