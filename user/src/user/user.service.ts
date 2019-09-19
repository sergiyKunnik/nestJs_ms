import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async create({group, email, password}): Promise<User> {
    return await this.userRepository.save({group, email, password});
  }

  async getOneByQuery(query: any): Promise<User> {
    const data = await this.userRepository.findOne(query);
    console.log('data => ', data )
    if(data) return data;
    throw new Error('Some error')
  }
}
