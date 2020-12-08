import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { JobsModule } from './jobs/jobs.module';

@Module({
    imports: [
        JobsModule,
        MongooseModule.forRoot(
            'mongodb://api:password@localhost:27017/core'
        ),
    ],
})
export class AppModule {}
