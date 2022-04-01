import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export class GqlAuthGuard extends AuthGuard("jwt") {
	getRequest(ctx: ExecutionContext) {
		const context = GqlExecutionContext.create(ctx);

		return context.getContext().req;
	}
}
