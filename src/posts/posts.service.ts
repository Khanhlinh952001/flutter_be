import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPostDto: CreatePostDto) {
    const { authorId, ...rest } = createPostDto;
    return this.prisma.post.create({ data: { ...rest, authorId } });
  }

  findAll(authorId?: number) {
    return this.prisma.post.findMany({
      where: authorId ? { authorId } : undefined,
      include: { author: true, comments: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({
      where: { id },
      include: { author: true, comments: true },
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.prisma.post.update({ where: { id }, data: updatePostDto });
  }

  remove(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}

