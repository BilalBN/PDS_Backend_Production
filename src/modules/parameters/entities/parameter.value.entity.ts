import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
export class ParameterValues {
  @Prop({ type: Number })
  batchId!: number;

  @Prop({ type: Number })
  enteredBy!: number;

  @Prop({ type: Number })
  parameterId!: number;

  @Prop({ type: MongooseSchema.Types.Mixed })
  value!: any;
}

export const ParameterValuesSchema =
  SchemaFactory.createForClass(ParameterValues);
