import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class BatchProgressSchema {
  @Prop({ type: Number })
  batchId!: number;

  @Prop({ type: Number })
  mainStepsCount!: number;

  @Prop({ type: Number })
  progress!: number;
}
