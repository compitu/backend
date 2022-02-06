import {Controller, Get, Param, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from 'src/auth/jwt-auth.guard';
import {UserResponse} from './user.response';
import {UsersService} from './users.service';

@Controller('users')
export class UsersController {
    public constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    public async findOne(@Param('id') id: string): Promise<UserResponse> {
        const user = await this.usersService.findOne(id);
        return new UserResponse(user);
    }
}
