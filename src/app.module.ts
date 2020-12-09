import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { JobsModule } from './jobs/jobs.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        JobsModule,
        UsersModule,
        MongooseModule.forRoot(
            'mongodb://api:password@localhost:27017/core'
        ),
    ],
})
export class AppModule {}
