import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh'
) {
    public constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_REFRESH_SECRET_KEY'),
        });
    }

    public async validate(payload: {
        sub: string;
        iat: number;
        exp: number;
    }): Promise<{id: string}> {
        return {id: payload.sub};
    }
}
