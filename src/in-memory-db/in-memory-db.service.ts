import { Injectable } from '@nestjs/common';
import { UserDB } from './user.db';
import { ArtistDB } from './artist.db';

@Injectable()
export class InMemoryDbService {
  user = new UserDB();
  artist = new ArtistDB();
}
