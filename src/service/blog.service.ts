import { IBlog } from "../interfaces/blog.interface";
import BlogRepository from "../repository/blog.repository";
import { ObjectId } from "mongodb";


class BlogService {
    constructor(private blogRepo: BlogRepository) {

    }

    async getAllBlogs(): Promise<IBlog[]> {
        return this.blogRepo.findAll()
    }

    async getBlogById(id: string) {
        let blog = null;

        // Check if `id` is a valid ObjectId
        const isObjectId = ObjectId.isValid(id);

        if (isObjectId) {
            try {
                blog = await this.blogRepo.findById(id);
            } catch {
                // ignore if invalid
            }
        }

        // fallback to slug
        if (!blog) {
            blog = await this.blogRepo.findOne({ slug: id });
        }

        if (!blog) {
            throw new Error(`Blog with id or slug "${id}" not found`);
        }

        return blog;
    }

    async createBlog(blog: Omit<IBlog, 'id' | 'createdAt' | 'updatedAt'>): Promise<IBlog> {
        blog.slug = blog.title.replaceAll(" ", "-").toLowerCase()
        return this.blogRepo.create(blog)
    }

    async updateBlog(id: string, blog: Partial<IBlog>): Promise<IBlog> {
        blog.slug = (blog.title || '').replaceAll(" ", "-").toLowerCase()
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