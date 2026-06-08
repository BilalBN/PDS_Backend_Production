import { EntityManager } from '@mikro-orm/mariadb';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSchemaClass } from '../../user/entities/user.entity';
import { BatchChart } from '../entities/chart.value.entity';

@Injectable()
export class DeleteChartValueService {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectModel('batch_chart')
    private batchChartModel: Model<BatchChart>,
  ) {}

  async delete(
    userId: number,
    batchId: number,
    subStepId: number,
    chartValueIndex: number,
  ) {
    const em = this.entityManager.fork();
    const user = await em.findOne(UserSchemaClass, { id: userId });
    if (!user) {
      throw new NotFoundException({
        message: 'User not found!',
        success: false,
      });
    }

    const session = await this.batchChartModel.db.startSession();

    try {
      await session.withTransaction(async () => {
        await this.batchChartModel
          .updateOne(
            { batchId, subStepId },
            { $unset: { [`chart.${chartValueIndex}`]: 1 } },
          )
          .exec();
        await this.batchChartModel
          .findOneAndUpdate(
            { batchId: batchId, subStepId: subStepId },
            { $pull: { chart: null } },
            { returnDocument: 'after' },
          )
          .exec();
      });

      return {
        data: {
          index: chartValueIndex,
        },
        message: 'Chart removed successfully',
        success: true,
      };
    } catch (_) {
      throw new InternalServerErrorException({
        message: 'Failed to delete chart value',
        success: false,
      });
    } finally {
      await session.endSession();
    }
  }
}
