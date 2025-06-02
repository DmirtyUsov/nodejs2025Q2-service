import { Injectable } from '@nestjs/common';
import { UserDB } from './user.db';
import { ArtistDB } from './artist.db';
import { TrackDB } from './track.db';
import { AlbumDB } from './album.db';

@Injectable()
export class InMemoryDbService {
  user = new UserDB();
  artist = new ArtistDB();
  track = new TrackDB();
  album = new AlbumDB();
}
