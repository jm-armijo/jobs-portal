import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.getUser(username);
        if (user && user.password === pass) {
            // Return the user object with the password removed
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any): Promise<any> {
        const payload = { username: user.username, sub: user.id };
        const token = await this.jwtService.sign(payload);
        return {
            access_token: token,
        };
    }
}
