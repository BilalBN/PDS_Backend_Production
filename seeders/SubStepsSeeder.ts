/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Workbook } from 'exceljs';
import { SubStepsSchemaClass } from '../src/modules/steps/entities/sub.steps.entity';

export class SubStepsSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const workBook = new Workbook();
    const excelFilePath = './assets/Products.xlsx';
    await workBook.xlsx.readFile(excelFilePath);
    const subStepsSheet = workBook.getWorksheet(3);

    const subStepsData: any[] = [];
    const headers = subStepsSheet?.getRow(1).values;
    subStepsSheet?.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber === 1) return;

      const rowObject = {};
      row.eachCell((cell, number) => {
        const columnHeader = headers![number];
        rowObject[columnHeader] = cell.value;
      });

      subStepsData.push(rowObject);
    });

    const subStepsDataToImport = subStepsData.map((item) => ({
      id: item['ID'],
      name: item['STEP'],
      dynamic: item['DYNAMIC'] == 1 ? true : false,
      created_at: new Date(),
      main_step_id: item['MAIN_STEP_ID'],
    }));

    await em.upsertMany(SubStepsSchemaClass, subStepsDataToImport, {
      onConflictMergeFields: ['id', 'dynamic', 'main_step', 'name'],
    });

    await em.flush();
  }
}
