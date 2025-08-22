import { injectable } from "tsyringe";
import { IBlog } from "../interfaces/blog.interface";
import BlogRepository from "../repository/blog.repository";


@injectable()
class BlogService {
    constructor(private blogRepo: BlogRepository) {

    }

    async getAllBlogs(): Promise<IBlog[]> {
        return this.blogRepo.findAll()
    }

    async getBlogById(id: string) {
        const blog = await this.blogRepo.findById(id);
        if (!blog) {
            throw new Error(`Blog with id ${id} not found`);
        }
        return blog;
    }

    async createBlog(blog: Partial<IBlog>): Promise<IBlog> {
        return this.createBlog(blog)
    }

    async updateBlog(id: string, blog: Partial<IBlog>): Promise<IBlog> {
        const updated = await this.blogRepo.update(id, blog);
        if (!updated) {
            throw new Error(`Blog with id ${id} not found`);
        }
        return updated;
    }


    async deleteBlog(id: string): Promise<boolean> {
        const deleted = await this.blogRepo.delete(id);
        if (!deleted) {
            throw new Error(`Blog with id ${id} not found`);
        }
        return deleted;
    }
}

export default BlogService