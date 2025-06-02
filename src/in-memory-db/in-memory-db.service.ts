import { Injectable } from '@nestjs/common';
import { UserDB } from './user.db';

@Injectable()
export class InMemoryDbService {
  user = new UserDB();
}
