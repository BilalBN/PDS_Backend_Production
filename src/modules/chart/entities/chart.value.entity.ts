import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ChartParameter } from '../interfaces/chart.parameter.interface';

interface ChartEnteredUser {
  id: number;
  name: string;
  image_url?: string | null;
}

@Schema()
export class ChartValue {
  @Prop({ type: Object })
  enteredBy!: ChartEnteredUser;

  @Prop({ type: Number })
  subStepId!: number;

  @Prop({ type: Array<ChartParameter> })
  values!: ChartParameter[];

  @Prop({ type: String, allowNull: true, default: null })
  imageUrl?: string;
}

export const ChartValuesSchema = SchemaFactory.createForClass(ChartValue);

@Schema()
export class BatchChart {
  @Prop({ index: 'asc', type: Number, unique: true })
  batchId!: number;

  @Prop({ type: Array<ChartValue> })
  chart!: ChartValue[];
}

export const BatchChartSchema = SchemaFactory.createForClass(BatchChart);
