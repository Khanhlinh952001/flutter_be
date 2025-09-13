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
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({
    summary: 'Tạo bình luận mới',
    description: 'Tạo một bình luận mới cho bài viết',
  })
  @ApiBody({
    type: CreateCommentDto,
    description: 'Thông tin bình luận cần tạo',
    examples: {
      example1: {
        summary: 'Ví dụ bình luận cơ bản',
        description: 'Tạo bình luận với nội dung cơ bản',
        value: {
          content: 'Bình luận hay quá!',
          postId: 1,
          authorId: 2,
        },
      },
      example2: {
        summary: 'Ví dụ bình luận dài',
        description: 'Tạo bình luận với nội dung chi tiết',
        value: {
          content:
            'Cảm ơn bạn đã chia sẻ bài viết rất hữu ích. Tôi đã học được nhiều điều từ đây.',
          postId: 1,
          authorId: 3,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Tạo bình luận thành công',
    schema: {
      example: {
        id: 1,
        content: 'Bình luận hay quá!',
        postId: 1,
        authorId: 2,
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
        message: ['content should not be empty', 'postId must be a number'],
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Lấy danh sách bình luận',
    description: 'Lấy tất cả bình luận hoặc lọc theo bài viết',
  })
  @ApiQuery({
    name: 'postId',
    required: false,
    description: 'ID của bài viết để lọc bình luận',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách bình luận thành công',
    schema: {
      example: [
        {
          id: 1,
          content: 'Bình luận hay quá!',
          postId: 1,
          authorId: 2,
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
        {
          id: 2,
          content: 'Cảm ơn bạn đã chia sẻ!',
          postId: 1,
          authorId: 3,
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
      ],
    },
  })
  findAll(@Query('postId') postId?: string) {
    return this.commentsService.findAll(postId ? Number(postId) : undefined);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lấy bình luận theo ID',
    description: 'Lấy thông tin chi tiết của một bình luận',
  })
  @ApiParam({
    name: 'id',
    description: 'ID của bình luận',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy bình luận thành công',
    schema: {
      example: {
        id: 1,
        content: 'Bình luận hay quá!',
        postId: 1,
        authorId: 2,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bình luận',
    schema: {
      example: {
        message: 'Comment not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Cập nhật bình luận',
    description: 'Cập nhật nội dung của một bình luận',
  })
  @ApiParam({
    name: 'id',
    description: 'ID của bình luận cần cập nhật',
    example: 1,
  })
  @ApiBody({
    type: UpdateCommentDto,
    description: 'Thông tin cập nhật bình luận',
    examples: {
      example1: {
        summary: 'Cập nhật nội dung',
        description: 'Chỉ cập nhật nội dung bình luận',
        value: {
          content: 'Nội dung bình luận đã được chỉnh sửa',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật bình luận thành công',
    schema: {
      example: {
        id: 1,
        content: 'Nội dung bình luận đã được chỉnh sửa',
        postId: 1,
        authorId: 2,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T12:00:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bình luận',
    schema: {
      example: {
        message: 'Comment not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Xóa bình luận',
    description: 'Xóa một bình luận khỏi hệ thống',
  })
  @ApiParam({
    name: 'id',
    description: 'ID của bình luận cần xóa',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa bình luận thành công',
    schema: {
      example: {
        message: 'Comment deleted successfully',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bình luận',
    schema: {
      example: {
        message: 'Comment not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.remove(id);
  }
}
