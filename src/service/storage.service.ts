import { Storage, Bucket, File } from '@google-cloud/storage';
// import path from 'node:path';

class StorageService {
    private bucketName = process.env.BLOG_BUCKET ?? '';
    private projectId = process.env.GCP_PROJECT_ID ?? '';
    private storage: Storage;
    private bucket: Bucket;
    // private serviceKey = path.join(__dirname, './service-key.json');
    private serviceKey = '/etc/secrets/service-key.json';

    constructor() {
        this.storage = new Storage({
            projectId: this.projectId,
            keyFilename: this.serviceKey,
        });
        this.bucket = this.storage.bucket(this.bucketName);
    }

    public async uploadFile(filePath: string, destination: string): Promise<string> {
        await this.bucket.upload(filePath, {
            destination,
            public: true,
        });
        return this.bucket.file(destination).publicUrl();
    }

    public getFile(filename: string): File {
        return this.bucket.file(filename);
    }

    async deleteFile(filename: string): Promise<void> {
        await this.bucket.file(filename).delete();
    }

    public async generateReadSignedUrl(fileName: string, expiresInMinutes: number = 60): Promise<string> {
        const options = {
            version: 'v4' as const,
            action: 'read' as const,
            expires: Date.now() + expiresInMinutes * 60 * 1000,
        };

        const [url] = await this.bucket.file(fileName).getSignedUrl(options);
        return url;
    }

    public async generateUploadSignedUrl(
        fileName: string,
        contentType: string,
        expiresInMinutes: number = 60
    ): Promise<string> {
        const options = {
            version: 'v4' as const,
            action: 'write' as const,
            expires: Date.now() + expiresInMinutes * 60 * 1000,
            contentType,
        };

        const [url] = await this.bucket.file(fileName).getSignedUrl(options);
        return url;
    }

}

export default StorageService;
