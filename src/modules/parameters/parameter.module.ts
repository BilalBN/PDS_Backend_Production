import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParameterValuesSchema } from './entities/parameter.value.entity';
import { ParameterController } from './parameter.controller';
import { AddParameterValueService } from './services/add.parameter.value.service';
import { GetParameterValuesService } from './services/get.parameter.values.service';

@Module({
  controllers: [ParameterController],
  imports: [
    MongooseModule.forFeature([
      {
        schema: ParameterValuesSchema,
        name: 'parameterValue',
      },
    ]),
  ],
  providers: [AddParameterValueService, GetParameterValuesService],
})
export class ParameterModule {}
