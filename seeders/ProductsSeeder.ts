import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Workbook } from 'exceljs';
import { ProductsSchemaClass } from '../src/modules/products/entities/products.entity';

export class ProductsSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const workBook = new Workbook();
    const excelFilePath = './assets/Products.xlsx';
    await workBook.xlsx.readFile(excelFilePath);
    const productsSheet = workBook.getWorksheet(1);

    const productsData: any[] = [];
    const headers = productsSheet?.getRow(1).values;
    productsSheet?.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber === 1) return;

      const rowObject = {};
      row.eachCell((cell, number) => {
        const columnHeader = headers![number];
        rowObject[columnHeader] = cell.value;
      });

      productsData.push(rowObject);
    });

    const productsDataToImport = productsData.map((item) => ({
      id: item['ID'],
      name: item['NAME'],
      created_at: new Date(),
    }));

    await em.upsertMany(ProductsSchemaClass, productsDataToImport);

    await em.flush();
  }
}
