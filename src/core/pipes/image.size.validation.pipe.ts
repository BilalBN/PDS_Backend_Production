import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ImageSizeValidationPipe implements PipeTransform {
  transform(value: any, _: ArgumentMetadata) {
    const maxSize = 10000;
    return value.size <= maxSize;
  }
}
