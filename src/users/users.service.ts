import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'

import { Model } from 'mongoose';
import { User } from './user.model'

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async getUser(username: string): Promise<User | undefined> {
        let user = null;

        if (username == '') {
            return user
        }

        try {
            user = await this.userModel.findOne({username: username}).exec();
        } catch(e) {
            // TODO : We should log the full error (including backtrace) to a log file.
            // Logging to console for now as that requirement is out of scope at the moment.
            console.log(e.message);
        }
        return user;
    }
}
