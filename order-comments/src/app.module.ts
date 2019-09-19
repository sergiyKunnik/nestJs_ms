import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './comment/comment.controller';
import { CommentService } from './comment/comment.service';
import { Comment } from './comment/comment.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'test_v1_comment',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature(
      [
        Comment,
      ],
    ),
  ],
  controllers: [ CommentController],
  providers: [ CommentService],
})
export class AppModule {}
