import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'Tiêu đề bài viết',
    example: 'Tiêu đề bài viết mới',
    minLength: 1,
    maxLength: 200,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Nội dung bài viết',
    example: 'Nội dung chi tiết của bài viết...',
    minLength: 1,
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    description: 'ID của tác giả bài viết',
    example: 1,
    minimum: 1,
  })
  @IsInt()
  authorId: number;
}
