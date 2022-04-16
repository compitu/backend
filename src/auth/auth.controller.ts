import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {CreateUserDto} from '../users/create-user.dto';
import {UserResponse} from '../users/user.response';
import {UsersService} from '../users/users.service';
import {AuthService} from './auth.service';
import {JwtRefreshAuthGuard} from './jwt-refresh-auth.guard';
import {LocalAuthGuard} from './local-auth.guard';

@Controller('auth')
export class AuthController {
    private accessExpiresIn = this.configService.get(
        'JWT_ACCESS_EXPIRE_IN_SECONDS'
    );
    private refreshExpiresIn = this.configService.get(
        'JWT_REFRESH_EXPIRE_IN_SECONDS'
    );

    public constructor(
        public authService: AuthService,
        public usersService: UsersService,
        public configService: ConfigService
    ) {}

    @Post('signup')
    public async signup(
        @Body() createUserDto: CreateUserDto
    ): Promise<UserResponse> {
        const user = await this.authService.signup(createUserDto);
        return new UserResponse(user);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    public async login(@Body('email') email: string): Promise<{
        access: string;
        refresh: string;
        user: {id: string; email: string};
    }> {
        const user = await this.usersService.findOneByEmail(email);
        const tokens = await this.authService.generateTokens(
            user._id.toString()
        );
        return {
            ...tokens,
            user: {
                id: user._id.toString(),
                email: user.email,
            },
        };
    }

    @UseGuards(JwtRefreshAuthGuard)
    @Post('refresh')
    public async refresh(
        @Request() req: {user: {id: string}}
    ): Promise<{access: string; refresh: string}> {
        return this.authService.generateTokens(req.user.id);
    }
}
