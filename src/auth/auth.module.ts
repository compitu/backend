import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {UsersModule} from '../users/users.module';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {JwtRefreshStrategy} from './jwt-refresh.strategy';
import {JwtStrategy} from './jwt.strategy';
import {LocalStrategy} from './local.strategy';
import {TokenService} from './token.service';

@Module({
    imports: [UsersModule, PassportModule, JwtModule.register({})],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        JwtRefreshStrategy,
        TokenService,
    ],
    controllers: [AuthController],
})
export class AuthModule {}
