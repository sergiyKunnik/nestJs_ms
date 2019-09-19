import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { User } from './user.entity';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) {}

  @MessagePattern('user-create')
  public async userCreate({group, email, password}): Promise<User> {
    return await this.userService.create({group, email, password});
  }

  @MessagePattern('user-get-by-query')
  public async userGetOneByQuery(query: any): Promise<User> {
    return await this.userService.getOneByQuery(query);
  }

}
