import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(Comment)
    private readonly commnetRepository: Repository<Comment>,
  ) {
  }

  async create({userId, description, orderId}): Promise<Comment> {
    return await this.commnetRepository.save({ userId, description, orderId});
  }

  async getAll(): Promise<Comment[]> {
    return await this.commnetRepository.find();
  }

  async getByUserId(userId: number): Promise<Comment[]> {
    return await this.commnetRepository.find({userId});
  }

  async getByQuery(query: any): Promise<Comment[]> {
    return await this.commnetRepository.find(query);
  }
}
