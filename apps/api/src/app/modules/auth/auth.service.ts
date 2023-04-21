import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserWithoutPassword } from '../user/dto/user.dto';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signUp(user: UserWithoutPassword, password: string) {
    console.log(user, password, 'ivanco');
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    return this.usersService.createUser(user, hashedPassword);
  }
}
