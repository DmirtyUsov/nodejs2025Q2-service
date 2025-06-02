import { User } from 'src/users/user';
import { MapDB } from './map-db';

export class UserDB extends MapDB<string, User> {}
