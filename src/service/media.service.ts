import StorageService from './storage.service';

class MediaService {
    constructor(private storageService: StorageService) { }
    async getFile(filename: string) {
        const file = this.storageService.generateReadSignedUrl(filename);

        if (!file) {
            throw new Error(`File ${filename} not found`);
        }

        return {
            url: file,
        };
    }

    async uploadFile(filePath: string, originalName: string) {
        const destination = `uploads/${Date.now()}-${originalName}`;
        const publicUrl = await this.storageService.generateUploadSignedUrl(filePath, destination);
        return { url: publicUrl };
    }

    async deleteFile(filename: string) {
        await this.storageService.deleteFile(filename);
        return { deleted: true, filename };
    }
}

export default MediaService;
