import {getModelToken} from '@nestjs/mongoose';
import {Test, TestingModule} from '@nestjs/testing';
import {User} from '../users/user.schema';
import {UsersService} from '../users/users.service';
import {AuthService} from './auth.service';
import {TokenService} from './token.service';

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: getModelToken(User.name),
                    useValue: {},
                },
                {provide: UsersService, useValue: {}},
                {provide: TokenService, useValue: {}},
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
