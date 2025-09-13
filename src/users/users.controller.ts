import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Tạo người dùng mới',
    description: 'Tạo một tài khoản người dùng mới trong hệ thống',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'Thông tin người dùng cần tạo',
    examples: {
      example1: {
        summary: 'Ví dụ người dùng cơ bản',
        description: 'Tạo người dùng với thông tin cơ bản',
        value: {
          name: 'Nguyễn Văn A',
          email: 'nguyenvana@example.com',
        },
      },
      example2: {
        summary: 'Ví dụ người dùng với tên dài',
        description: 'Tạo người dùng với tên đầy đủ',
        value: {
          name: 'Trần Thị Bích Ngọc',
          email: 'tranthibichngoc@example.com',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Tạo người dùng thành công',
    schema: {
      example: {
        id: 1,
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
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
        message: ['name should not be empty', 'email must be an email'],
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Lấy danh sách người dùng',
    description: 'Lấy tất cả người dùng trong hệ thống',
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách người dùng thành công',
    schema: {
      example: [
        {
          id: 1,
          name: 'Nguyễn Văn A',
          email: 'nguyenvana@example.com',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
        {
          id: 2,
          name: 'Trần Thị B',
          email: 'tranthib@example.com',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
      ],
    },
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lấy người dùng theo ID',
    description: 'Lấy thông tin chi tiết của một người dùng',
  })
  @ApiParam({
    name: 'id',
    description: 'ID của người dùng',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy người dùng thành công',
    schema: {
      example: {
        id: 1,
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy người dùng',
    schema: {
      example: {
        message: 'User not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Cập nhật người dùng',
    description: 'Cập nhật thông tin của một người dùng',
  })
  @ApiParam({
    name: 'id',
    description: 'ID của người dùng cần cập nhật',
    example: 1,
  })
  @ApiBody({
    type: UpdateUserDto,
    description: 'Thông tin cập nhật người dùng',
    examples: {
      example1: {
        summary: 'Cập nhật tên',
        description: 'Chỉ cập nhật tên người dùng',
        value: {
          name: 'Nguyễn Văn B',
        },
      },
      example2: {
        summary: 'Cập nhật toàn bộ',
        description: 'Cập nhật cả tên và email',
        value: {
          name: 'Nguyễn Văn C',
          email: 'nguyenvanc@example.com',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật người dùng thành công',
    schema: {
      example: {
        id: 1,
        name: 'Nguyễn Văn B',
        email: 'nguyenvana@example.com',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T12:00:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy người dùng',
    schema: {
      example: {
        message: 'User not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Xóa người dùng',
    description: 'Xóa một người dùng khỏi hệ thống',
  })
  @ApiParam({
    name: 'id',
    description: 'ID của người dùng cần xóa',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa người dùng thành công',
    schema: {
      example: {
        message: 'User deleted successfully',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy người dùng',
    schema: {
      example: {
        message: 'User not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
