import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { AuthService } from './auth.service';

class RegisterDto {
  @ApiProperty({
    description: 'Tên người dùng',
    example: 'Nguyễn Văn A',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'Email người dùng',
    example: 'user@example.com',
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Mật khẩu người dùng',
    example: 'password123',
    minLength: 6,
    maxLength: 20,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}

class LoginDto {
  @ApiProperty({
    description: 'Email người dùng',
    example: 'user@example.com',
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Mật khẩu người dùng',
    example: 'password123',
    minLength: 6,
    maxLength: 20,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}

class VerifyTokenDto {
  @ApiProperty({
    description: 'JWT token cần xác thực',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString()
  token: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Đăng ký tài khoản mới',
    description: 'Tạo tài khoản người dùng mới với thông tin đăng ký',
  })
  @ApiBody({
    type: RegisterDto,
    description: 'Thông tin đăng ký tài khoản',
    examples: {
      example1: {
        summary: 'Ví dụ đăng ký cơ bản',
        description: 'Đăng ký tài khoản với thông tin cơ bản',
        value: {
          name: 'Nguyễn Văn A',
          email: 'nguyenvana@example.com',
          password: 'password123',
        },
      },
      example2: {
        summary: 'Ví dụ đăng ký với tên dài',
        description: 'Đăng ký tài khoản với tên đầy đủ',
        value: {
          name: 'Trần Thị Bích Ngọc',
          email: 'tranthibichngoc@example.com',
          password: 'mypassword456',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Đăng ký thành công',
    schema: {
      example: {
        success: true,
        message: 'Đăng ký thành công',
        data: {
          id: 1,
          name: 'Nguyễn Văn A',
          email: 'nguyenvana@example.com',
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu không hợp lệ',
    schema: {
      example: {
        success: false,
        message: 'Email đã tồn tại',
        error: 'EMAIL_EXISTS',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Lỗi server',
    schema: {
      example: {
        success: false,
        message: 'Lỗi server nội bộ',
        error: 'INTERNAL_SERVER_ERROR',
      },
    },
  })
  register(@Body() body: RegisterDto) {
    const { name, email, password } = body;
    return this.authService.register(name, email, password);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Đăng nhập tài khoản',
    description: 'Xác thực thông tin đăng nhập và trả về token',
  })
  @ApiBody({
    type: LoginDto,
    description: 'Thông tin đăng nhập',
    examples: {
      example1: {
        summary: 'Ví dụ đăng nhập cơ bản',
        description: 'Đăng nhập với email và mật khẩu',
        value: {
          email: 'user@example.com',
          password: 'password123',
        },
      },
      example2: {
        summary: 'Ví dụ đăng nhập với email khác',
        description: 'Đăng nhập với tài khoản khác',
        value: {
          email: 'admin@example.com',
          password: 'admin123',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Đăng nhập thành công',
    schema: {
      example: {
        success: true,
        message: 'Đăng nhập thành công',
        data: {
          id: 1,
          name: 'Nguyễn Văn A',
          email: 'user@example.com',
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Thông tin đăng nhập không chính xác',
    schema: {
      example: {
        success: false,
        message: 'Email hoặc mật khẩu không chính xác',
        error: 'INVALID_CREDENTIALS',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu không hợp lệ',
    schema: {
      example: {
        success: false,
        message: 'Email không hợp lệ',
        error: 'INVALID_EMAIL',
      },
    },
  })
  login(@Body() body: LoginDto) {
    const { email, password } = body;
    return this.authService.login(email, password);
  }

  @Post('verify-token')
  @ApiOperation({
    summary: 'Xác thực token',
    description: 'Kiểm tra tính hợp lệ của JWT token',
  })
  @ApiBody({
    type: VerifyTokenDto,
    description: 'JWT token cần xác thực',
    examples: {
      example1: {
        summary: 'Ví dụ token hợp lệ',
        description: 'Token JWT hợp lệ',
        value: {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        },
      },
      example2: {
        summary: 'Ví dụ token hết hạn',
        description: 'Token JWT đã hết hạn',
        value: {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.invalid_signature',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Token hợp lệ',
    schema: {
      example: {
        success: true,
        message: 'Token hợp lệ',
        data: {
          valid: true,
          user: {
            id: 1,
            name: 'Nguyễn Văn A',
            email: 'user@example.com',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Token không hợp lệ hoặc đã hết hạn',
    schema: {
      example: {
        success: false,
        message: 'Token không hợp lệ hoặc đã hết hạn',
        error: 'INVALID_TOKEN',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Token không được cung cấp',
    schema: {
      example: {
        success: false,
        message: 'Token là bắt buộc',
        error: 'TOKEN_REQUIRED',
      },
    },
  })
  verifyToken(@Body() body: VerifyTokenDto) {
    const { token } = body;
    return this.authService.verifyToken(token);
  }
}
