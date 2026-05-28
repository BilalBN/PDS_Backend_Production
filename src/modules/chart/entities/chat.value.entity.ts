import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ChartParameter } from '../interfaces/chart.parameter.interface';

@Schema()
export class ChartValues {
  @Prop({ type: Number })
  batchId!: number;

  @Prop({ type: Number })
  enteredBy!: number;

  @Prop({ type: Number })
  subStepId!: number;

  @Prop({ type: Array<ChartParameter> })
  values!: ChartParameter[];

  @Prop({ type: String, allowNull: true, default: null })
  imageUrl?: string;
}

export const ChartValuesSchema = SchemaFactory.createForClass(ChartValues);
