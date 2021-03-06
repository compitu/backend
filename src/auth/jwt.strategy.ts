import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    public constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_ACCESS_SECRET_KEY'),
        });
    }

    public async validate(payload: {sub: string}): Promise<unknown> {
        return {id: payload.sub};
    }
}
