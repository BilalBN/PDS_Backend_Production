import { asClass, createContainer } from 'awilix';
import { DiskFileUploadService } from '../shared/services/fileUpload/disk.file.upload.service';
import { FileUploadService } from '../shared/services/fileUpload/file.upload.service';

const serviceLocator = createContainer();

serviceLocator.register({
  disk: asClass<FileUploadService>(DiskFileUploadService),
});

export default serviceLocator;
