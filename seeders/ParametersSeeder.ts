import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Workbook } from 'exceljs';
import { ParametersSchemaClass } from '../src/modules/parameters/entities/parameters.entity';

export class ParametersSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const workBook = new Workbook();
    const excelFilePath = './assets/Products.xlsx';
    await workBook.xlsx.readFile(excelFilePath);
    const parametersSheet = workBook.getWorksheet(4);

    const parametersData: any[] = [];
    const headers = parametersSheet?.getRow(1).values;
    parametersSheet?.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber === 1) return;

      const rowObject = {};
      row.eachCell((cell, number) => {
        const columnHeader = headers![number];
        rowObject[columnHeader] = cell.value;
      });

      parametersData.push(rowObject);
    });

    const parametersDataToImport = parametersData.map((item) => ({
      id: item['ID'],
      name: item['NAME'],
      instructions: item['INSTRUCTIONS'],
      type: item['TYPE'],
      unit: item['UNIT'],
      sub_step_id: item['SUB_STEP_ID'],
    }));

    await em.upsertMany(ParametersSchemaClass, parametersDataToImport, {
      onConflictMergeFields: ['*'],
    });

    await em.flush();
  }
}
