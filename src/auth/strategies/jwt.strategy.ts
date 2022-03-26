import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/services/users.service';

import { TokenPayload } from '../dto/token-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		configService: ConfigService,
		private readonly usersService: UsersService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: Request) => req.cookies.Authentication,
			]),
			secretOrKey: configService.get<string>("JWT_SECRET"),
		});
	}

	async validate({ userId }: TokenPayload) {
		return this.usersService.getUser({ _id: userId });
	}
}
