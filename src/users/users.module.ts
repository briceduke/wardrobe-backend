import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './controllers/users.controller';

import { User } from './models/user.model';
import { UserSchema } from './models/user.schema';
import { UsersRepository } from './repositories/users.repository';
import { UsersResolver } from './resolvers/users.resolver';
import { UsersService } from './services/users.service';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	],
	controllers: [UsersController],
	providers: [UsersResolver, UsersService, UsersRepository],
	exports: [UsersService],
})
export class UsersModule {}
