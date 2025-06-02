import { Artist } from 'src/artists/artist';
import { MapDB } from './map-db';

export class ArtistDB extends MapDB<string, Artist> {}
