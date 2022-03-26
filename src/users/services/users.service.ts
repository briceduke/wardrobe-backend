import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { GetUserArgs } from '../dto/args/get-user.dto';
import { CreateUserInput } from '../dto/input/create-user.input';
import { User } from '../models/user.model';
import { UserDocument } from '../models/user.schema';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
	constructor(private readonly usersRepo: UsersRepository) {}

	private async validateData(data: CreateUserInput) {
		try {
			await this.usersRepo.findOne({ email: data.email });
			throw new UnprocessableEntityException(
				"you already have an account silly"
			);
		} catch (err) {}
	}

	private toModel(userDoc: UserDocument): User {
		return {
			_id: userDoc._id.toHexString(),
			email: userDoc.email,
		};
	}

	async createUser(data: CreateUserInput) {
		await this.validateData(data);

		const userDoc = await this.usersRepo.create({
			...data,
			password: await bcrypt.hash(data.password, 12),
		});

		return this.toModel(userDoc);
	}

	async getUser(args: GetUserArgs) {
		const userDoc = await this.usersRepo.findOne(args);

		return this.toModel(userDoc);
	}

	async validateUser(email: string, password: string) {
		const userDoc = await this.usersRepo.findOne({ email });

		const validPassword = await bcrypt.compare(password, userDoc.password);

		if (!validPassword)
			throw new UnauthorizedException(
				"nice try but you got the wrong password idiot"
			);

		return this.toModel(userDoc);
	}
}
