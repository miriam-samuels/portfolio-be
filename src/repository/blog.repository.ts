import { Blog } from "@prisma/client";
import prisma from "../config/prisma.config";

class BlogRepository {
    constructor(
    ) { }

    async findAll(): Promise<Blog[]> {
        return prisma.blog.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    async findById(id: string): Promise<Blog | null> {
        return prisma.blog.findUnique({
            where: { id },
        });
    }

    async findOne(where: any): Promise<Blog | null> {
        return prisma.blog.findUnique({
            where,
        });
    }

    async create(data: Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>): Promise<Blog> {
        return prisma.blog.create({
            data,
        });
    }

    async update(id: string, data: Partial<Blog>): Promise<Blog | null> {
        return prisma.blog.update({
            where: { id },
            data,
        });
    }

    async delete(id: string): Promise<boolean> {
        const result = await prisma.blog.delete({
            where: { id },
        });
        return !!result;
    }
}


export default BlogRepository