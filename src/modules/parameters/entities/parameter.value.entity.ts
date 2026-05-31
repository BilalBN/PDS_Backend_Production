import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

interface ParameterEnteredUser {
  id: number;
  name: string;
  image_url: string | undefined;
}

@Schema()
export class ParameterValues {
  @Prop({ type: Number })
  batchId!: number;

  @Prop({ type: Object })
  enteredBy!: ParameterEnteredUser;

  @Prop({ type: Number })
  parameterId!: number;

  @Prop({ type: MongooseSchema.Types.Mixed })
  value!: any;
}

export const ParameterValuesSchema =
  SchemaFactory.createForClass(ParameterValues);
