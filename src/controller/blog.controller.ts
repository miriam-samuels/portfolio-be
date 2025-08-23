import { Request, Response } from "express";
import { ResponseHelper } from "../helper/response.helper";
import BlogService from "../service/blog.service";

class BlogController {
  constructor(private readonly service: BlogService) { }

  public getPosts = async (req: Request, res: Response) => {
    try {
      const blogs = await this.service.getAllBlogs();
      return ResponseHelper.success(res, "Fetched all blogs", blogs);
    } catch (error) {
      return ResponseHelper.error(res, "Failed to fetch blogs", error);
    }
  };

  public getPostById = async (req: Request, res: Response) => {
    try {
      const blogs = await this.service.getBlogById(req.params?.id);
      return ResponseHelper.success(res, "Fetched blog", blogs);
    } catch (error) {
      return ResponseHelper.error(res, "Failed to fetch blog", error);
    }
  };

  public createPost = async (req: Request, res: Response) => {
    try {
      const blog = await this.service.createBlog(req.body);
      return ResponseHelper.success(res, "Blog created successfully", blog, 201);
    } catch (error) {
      return ResponseHelper.error(res, "Failed to create blog", error);
    }
  };

  public updatePost = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updated = await this.service.updateBlog(id, req.body);

      if (!updated) {
        return ResponseHelper.error(res, "Blog not found", null, 404);
      }

      return ResponseHelper.success(res, "Blog updated successfully", updated);
    } catch (error) {
      return ResponseHelper.error(res, "Failed to update blog", error);
    }
  };

  public deletePost = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await this.service.deleteBlog(id);

      if (!deleted) {
        return ResponseHelper.error(res, "Blog not found", null, 404);
      }

      return ResponseHelper.success(res, "Blog deleted successfully", null, 200);
    } catch (error) {
      return ResponseHelper.error(res, "Failed to delete blog", error);
    }
  };
}

export default BlogController; 