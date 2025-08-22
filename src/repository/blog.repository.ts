import { PrismaClient } from '@prisma/client';
import { Blog } from '../generated/prisma';
import {  injectable } from 'tsyringe';

@injectable()
class BlogRepository {
    constructor(
        private readonly prisma: PrismaClient
    ) { }

    async findAll(): Promise<Blog[]> {
        return this.prisma.blog.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    async findById(id: string): Promise<Blog | null> {
        return this.prisma.blog.findUnique({
            where: { id },
        });
    }

    async create(data: Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>): Promise<Blog> {
        return this.prisma.blog.create({
            data,
        });
    }

    async update(id: string, data: Partial<Blog>): Promise<Blog | null> {
        return this.prisma.blog.update({
            where: { id },
            data,
        });
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.prisma.blog.delete({
            where: { id },
        });
        return !!result;
    }
}


export default BlogRepository