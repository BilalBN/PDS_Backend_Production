import * as fs from 'fs/promises';
import * as path from 'path';
import { FileUploadService } from './file.upload.service';

export class DiskFileUploadService implements FileUploadService {
  private readonly uploadDirectory = process.env.STORAGE_PATH!;

  async uploadFile(file: Express.Multer.File): Promise<string> {
    // 1. Ensure the destination directory exists
    await fs.mkdir(this.uploadDirectory, { recursive: true });

    // 2. Generate a unique filename to prevent overwriting
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileExtension = path.extname(file.originalname);
    const fileName = `${file.fieldname}-${uniqueSuffix}${fileExtension}`;

    // 3. Construct the absolute path
    const destinationPath = path.join(this.uploadDirectory, fileName);

    // 4. Write the file buffer directly to the disk path
    await fs.writeFile(destinationPath, file.buffer);

    // 5. Return the path (or relative path depending on your database needs)
    return destinationPath;
  }
}
