import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { JobsModule } from './jobs/jobs.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        JobsModule,
        AuthModule,
        MongooseModule.forRoot(
            'mongodb://api:password@localhost:27017/core'
        ),
    ],
})
export class AppModule {}
