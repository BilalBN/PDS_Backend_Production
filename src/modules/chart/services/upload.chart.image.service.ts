import { EntityManager } from '@mikro-orm/mariadb';
import { Injectable, NotFoundException } from '@nestjs/common';
import serviceLocator from '../../../core/service.locator';
import { FileUploadService } from '../../../shared/services/fileUpload/file.upload.service';
import { UserSchemaClass } from '../../user/entities/user.entity';

@Injectable()
export class UploadChartImageService {
  constructor(private readonly entityManager: EntityManager) {}

  async upload(userId: number, file: Express.Multer.File) {
    const em = this.entityManager.fork();
    const user = await em.findOne(UserSchemaClass, { id: userId });
    if (!user) {
      throw new NotFoundException({
        message: 'User not found!',
        success: false,
      });
    }

    const path = await serviceLocator
      .resolve<FileUploadService>('disk')
      .uploadFile(file);

    return {
      data: {
        image_path: path,
      },
      message: 'Image uploaded successfully',
      success: true,
    };
  }
}
