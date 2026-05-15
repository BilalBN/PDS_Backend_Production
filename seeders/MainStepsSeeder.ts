/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Workbook } from 'exceljs';
import { MainStepsSchemaClass } from '../src/modules/steps/entities/main.steps.entity';

export class MainStepsSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const workBook = new Workbook();
    const excelFilePath = './assets/Products.xlsx';
    await workBook.xlsx.readFile(excelFilePath);
    const mainStepsSheet = workBook.getWorksheet(2);

    const mainStepsData: any[] = [];
    const headers = mainStepsSheet?.getRow(1).values;
    mainStepsSheet?.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber === 1) return;

      const rowObject = {};
      row.eachCell((cell, number) => {
        const columnHeader = headers![number];
        rowObject[columnHeader] = cell.value;
      });

      mainStepsData.push(rowObject);
    });

    const mainStepsDataToImport = mainStepsData.map((item) => ({
      id: item['ID'],
      name: item['STEP'],
      created_at: new Date(),
      product_id: item['PRODUCT_ID'],
    }));

    await em.upsertMany(MainStepsSchemaClass, mainStepsDataToImport, {
      onConflictMergeFields: ['id', 'name'],
    });

    await em.flush();
  }
}
