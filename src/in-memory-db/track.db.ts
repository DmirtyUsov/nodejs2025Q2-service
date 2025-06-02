import { Track } from 'src/tracks/track';
import { MapDB } from './map-db';

export class TrackDB extends MapDB<string, Track> {}
