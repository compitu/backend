import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {PassportStrategy} from '@nestjs/passport';
import {Request} from 'express';
import {ExtractJwt, Strategy} from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    public constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_ACCESS_SECRET_KEY'),
        });
    }

    public async validate(payload: {sub: string}): Promise<unknown> {
        return {id: payload.sub};
    }
}

export function cookieExtractor(req: Request): string | null {
    let jwt = null;

    if (req && req.cookies) {
        jwt = req.cookies['access'];
    }

    return jwt;
}
