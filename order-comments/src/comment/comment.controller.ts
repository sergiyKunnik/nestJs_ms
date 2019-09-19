import { Controller } from '@nestjs/common';
import { CommentService } from './comment.service';
import { MessagePattern } from '@nestjs/microservices';
import { Comment } from './comment.entity';

@Controller('comment')
export class CommentController {

  constructor(
    private readonly commentService: CommentService,
  ) {}

  @MessagePattern('comment-create')
  public async getCategories({orderId, description, userId}): Promise<Comment> {
    return await this.commentService.create({orderId, description, userId});
  }

  @MessagePattern('comment-get-all')
  public async orderGerAll(): Promise<Comment[]> {
    return await this.commentService.getAll();
  }

  @MessagePattern('comment-get-by-userId')
  public async orderGerByUserId({userId}): Promise<Comment[]> {
    return await this.commentService.getByUserId(userId);
  }
  @MessagePattern('comment-get-by-query')
  public async orderGerByQuery(query: any): Promise<Comment[]> {
    return await this.commentService.getByQuery(query);
  }
}
