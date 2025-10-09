import { Request, Response } from 'express';
import MediaService from '../service/media.service';
import { ResponseHelper } from '../helper/response.helper';

class MediaController {
    constructor(private mediaService: MediaService) {}

    public getFile = async (req: Request, res: Response) => {
        try {
            const { filename } = req.params;
            if (!filename) {
                return ResponseHelper.error(res, 'Filename is required', 400);
            }

            const url = await this.mediaService.getFile(filename);
            ResponseHelper.success(res, 'Signed URL generated successfully', { url });
        } catch (error: any) {
            ResponseHelper.error(res, error?.message || 'Failed to generate signed URL');
        }
    };


    public uploadFile = async (req: Request, res: Response) => {
        try {
            const { fileName, contentType }  = req.query;
            if (!fileName || !contentType) {
                return ResponseHelper.error(res, 'Filename and contentType are required', 400);
            }

        console.log("testinggggg",contentType);

            const url = await this.mediaService.uploadFile(fileName as string, contentType as string);
            ResponseHelper.success(res, `Signed URL generated successfully ${contentType}`, { ...url }, 201);
        } catch (error: any) {
            ResponseHelper.error(res, error?.message || 'Failed to generate upload signed URL');
        }
    };


    public deleteFile = async (req: Request, res: Response)=> {
        try {
            const { filename } = req.params;
            if (!filename) {
                return ResponseHelper.error(res, 'Filename is required', 400);
            }

            await this.mediaService.deleteFile(filename);
            ResponseHelper.success(res, `File ${filename} deleted successfully`);
        } catch (error: any) {
            ResponseHelper.error(res, error?.message || 'Failed to delete file');
        }
    };
}

export default MediaController;
