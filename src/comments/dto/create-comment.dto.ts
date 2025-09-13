import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Nội dung bình luận',
    example: 'Bình luận hay quá!',
    minLength: 1,
    maxLength: 1000,
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    description: 'ID của bài viết',
    example: 1,
    minimum: 1,
  })
  @IsInt()
  postId: number;

  @ApiProperty({
    description: 'ID của tác giả bình luận',
    example: 1,
    minimum: 1,
  })
  @IsInt()
  authorId: number;
}
