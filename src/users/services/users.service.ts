import { BadRequestException, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';

import { GetUserArgs } from '../dto/args/get-user.dto';
import { CreateUserInput } from '../dto/input/create-user.input';
import { User } from '../models/user.model';
import { UserDocument } from '../models/user.schema';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
	constructor(private readonly usersRepo: UsersRepository) {}

	private toModel(userDoc: UserDocument): User {
		return {
			_id: userDoc._id.toHexString(),
			username: userDoc.username,
			referralCode: userDoc.referralCode,
			referralUses: userDoc.referralUses
		};
	}

	async createUser(data: CreateUserInput): Promise<User> {
		const user = await this.usersRepo.findOne({ username: data.username });

		if (user)
			throw new BadRequestException(
				"you already have an account silly"
			);

		const referredBy = await this.usersRepo.findOne({ referralCode: data.referralCode });

		if (!referredBy || referredBy.referralUses === 0) throw new BadRequestException('invalid referral code!');
		
		referredBy.referralUses--;

		await this.usersRepo.findOneAndUpdate({ _id: referredBy._id }, referredBy);

		const userDoc = await this.usersRepo.create({
			...data,
			referralCode: v4().substring(0, 8),
			referralUses: 4,
			password: await bcrypt.hash(data.password, 12),
		});

		return this.toModel(userDoc);
	}

	async getUser(args: GetUserArgs): Promise<User> {
		const userDoc = await this.usersRepo.findOne(args);

		return this.toModel(userDoc);
	}

	async validateUser(username: string, password: string): Promise<User> {
		const userDoc = await this.usersRepo.findOne({ username });

		const validPassword = await bcrypt.compare(password, userDoc.password);

		if (!validPassword)
			throw new UnauthorizedException(
				"nice try but you got the wrong password idiot"
			);

		return this.toModel(userDoc);
	}
}
