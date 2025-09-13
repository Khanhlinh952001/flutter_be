import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({
    summary: 'Tạo bài viết mới',
    description: 'Tạo một bài viết mới với tiêu đề, nội dung và tác giả',
  })
  @ApiBody({
    type: CreatePostDto,
    description: 'Thông tin bài viết cần tạo',
    examples: {
      example1: {
        summary: 'Ví dụ bài viết cơ bản',
        description: 'Tạo bài viết với thông tin cơ bản',
        value: {
          title: 'Tiêu đề bài viết',
          content: 'Nội dung bài viết chi tiết...',
          authorId: 1,
        },
      },
      example2: {
        summary: 'Ví dụ bài viết dài',
        description: 'Tạo bài viết với nội dung dài',
        value: {
          title: 'Hướng dẫn lập trình Flutter từ A đến Z',
          content: 'Flutter là một framework phát triển ứng dụng di động...',
          authorId: 2,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Tạo bài viết thành công',
    schema: {
      example: {
        id: 1,
        title: 'Tiêu đề bài viết',
        content: 'Nội dung bài viết chi tiết...',
        authorId: 1,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu không hợp lệ',
    schema: {
      example: {
        message: ['title should not be empty', 'content should not be empty'],
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Lấy danh sách bài viết',
    description: 'Lấy tất cả bài viết hoặc lọc theo tác giả',
  })
  @ApiQuery({
    name: 'authorId',
    required: false,
    description: 'ID của tác giả để lọc bài viết',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách bài viết thành công',
    schema: {
      example: [
        {
          id: 1,
          title: 'Tiêu đề bài viết 1',
          content: 'Nội dung bài viết 1...',
          authorId: 1,
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
        {
          id: 2,
          title: 'Tiêu đề bài viết 2',
          content: 'Nội dung bài viết 2...',
          authorId: 2,
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
      ],
    },
  })
  findAll(@Query('authorId') authorId?: string) {
    return this.postsService.findAll(authorId ? Number(authorId) : undefined);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lấy bài viết theo ID',
    description: 'Lấy thông tin chi tiết của một bài viết',
  })
  @ApiParam({
    name: 'id',
    description: 'ID của bài viết',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy bài viết thành công',
    schema: {
      example: {
        id: 1,
        title: 'Tiêu đề bài viết',
        content: 'Nội dung bài viết chi tiết...',
        authorId: 1,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bài viết',
    schema: {
      example: {
        message: 'Post not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Cập nhật bài viết',
    description: 'Cập nhật thông tin của một bài viết',
  })
  @ApiParam({
    name: 'id',
    description: 'ID của bài viết cần cập nhật',
    example: 1,
  })
  @ApiBody({
    type: UpdatePostDto,
    description: 'Thông tin cập nhật bài viết',
    examples: {
      example1: {
        summary: 'Cập nhật tiêu đề',
        description: 'Chỉ cập nhật tiêu đề bài viết',
        value: {
          title: 'Tiêu đề mới',
        },
      },
      example2: {
        summary: 'Cập nhật toàn bộ',
        description: 'Cập nhật cả tiêu đề và nội dung',
        value: {
          title: 'Tiêu đề mới',
          content: 'Nội dung mới...',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật bài viết thành công',
    schema: {
      example: {
        id: 1,
        title: 'Tiêu đề mới',
        content: 'Nội dung mới...',
        authorId: 1,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T12:00:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bài viết',
    schema: {
      example: {
        message: 'Post not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Xóa bài viết',
    description: 'Xóa một bài viết khỏi hệ thống',
  })
  @ApiParam({
    name: 'id',
    description: 'ID của bài viết cần xóa',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa bài viết thành công',
    schema: {
      example: {
        message: 'Post deleted successfully',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bài viết',
    schema: {
      example: {
        message: 'Post not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(id);
  }
}
