import { Album } from 'src/albums/album';
import { MapDB } from './map-db';

export class AlbumDB extends MapDB<string, Album> {}
