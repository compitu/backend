import {ForbiddenException, Injectable} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard('jwt-refresh') {
    public handleRequest(err, user, info, context, status): any {
        // If the refreshtoken is not valid return 403 instead of 401.
        if (
            err ||
            info?.name === 'TokenExpiredError' ||
            info?.name === 'SyntaxError' ||
            info?.name === 'JsonWebTokenError'
        ) {
            throw err || new ForbiddenException();
        }
        return super.handleRequest(err, user, info, context, status);
    }
}
