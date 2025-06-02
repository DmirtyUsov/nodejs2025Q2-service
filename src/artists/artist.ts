import { IsUUID } from 'class-validator';

export class Artist {
  @IsUUID('4')
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}
