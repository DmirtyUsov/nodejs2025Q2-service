import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { InMemoryDbModule } from './in-memory-db/in-memory-db.module';

@Module({
  imports: [UsersModule, InMemoryDbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
