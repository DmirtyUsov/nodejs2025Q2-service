import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InMemoryDbService } from 'src/in-memory-db/in-memory-db.service';
import { User } from './user';
import { CreateUserDto } from './create-user.dto';
import { createHash, randomUUID } from 'node:crypto';
import { UpdatePasswordDto } from './update-password.dto';

const ALGORITHM = 'sha256';
const ENCODING = 'hex';

@Injectable()
export class UsersService {
  constructor(private readonly inMemoryDBService: InMemoryDbService) {}

  private makePasswordHash(password: string): string {
    return createHash(ALGORITHM).update(password).digest(ENCODING);
  }

  findAll(): User[] {
    return this.inMemoryDBService.user.list().map((user) => new User(user));
  }

  findOne(id: string): User {
    const userDto = this.inMemoryDBService.user.get(id);
    if (!userDto) {
      throw new NotFoundException();
    }
    return new User(userDto);
  }

  create(createUserDto: CreateUserDto): User {
    const { password, login } = createUserDto;
    const hash = this.makePasswordHash(password);

    const id = randomUUID();
    const moment = Date.now();

    const newUser: User = new User({
      id,
      password: hash,
      login,
      createdAt: moment,
      updatedAt: moment,
      version: 1,
    });
    const result = this.inMemoryDBService.user.update(id, newUser);
    if (!result) {
      throw new ForbiddenException();
    }
    return newUser;
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto): User {
    const { oldPassword, newPassword } = updatePasswordDto;
    const userDto: User = this.inMemoryDBService.user.get(id);

    if (!userDto) {
      throw new NotFoundException();
    }

    const oldPasswordHash = this.makePasswordHash(oldPassword);

    if (oldPasswordHash !== userDto.password) {
      throw new ForbiddenException();
    }
    const moment = Date.now();

    userDto.updatedAt = moment;
    userDto.version += 1;
    userDto.password = this.makePasswordHash(newPassword);

    const result = this.inMemoryDBService.user.update(id, userDto);
    return new User(result);
  }

  delete(id: string): User {
    const userDto = this.inMemoryDBService.user.delete(id);
    if (!userDto) {
      throw new NotFoundException();
    }
    return new User(userDto);
  }
}
