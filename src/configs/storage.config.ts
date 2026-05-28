import multer from 'multer';

export const multerDiskStorageConfig = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, process.env.STORAGE_PATH!);
  },
  filename(req, file, callback) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    callback(null, file.fieldname + '-' + uniqueSuffix);
  },
});
